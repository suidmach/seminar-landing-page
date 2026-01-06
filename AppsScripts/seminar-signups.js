// GOOGLE APPS SCRIPT CODE
// This code goes in Google Apps Script (script.google.com)
// It receives form submissions and adds them to Google Sheets

// ==============================================================================
// SETUP INSTRUCTIONS:
// ==============================================================================
// 1. Go to script.google.com
// 2. Create a new project
// 3. Paste this code
// 4. Click "Deploy" > "New deployment"
// 5. Select type: "Web app"
// 6. Execute as: "Me"
// 7. Who has access: "Anyone"
// 8. Click "Deploy"
// 9. Copy the Web App URL and paste it in script.js (GOOGLE_SCRIPT_URL)
// ==============================================================================

// Configuration - Change this to your Google Sheet ID
// You can find this in the URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
const SHEET_ID = '1iPfu-QCVWsCwrRDa_M1JGScrmY7sCil6znCD0BbZa0E';
const SHEET_NAME = 'Seminar Registrations'; // Name of the sheet tab

// This function handles POST requests from your landing page
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Open the Google Sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Check for duplicate email
    if (sheet) {
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      
      // Check if email already exists (column D is email, index 3)
      for (let i = 1; i < values.length; i++) {
        if (values[i][3] && values[i][3].toLowerCase() === data.email.toLowerCase()) {
          Logger.log('Duplicate email detected: ' + data.email);
          
          // Still send confirmation email (they might have forgotten they registered)
          sendConfirmationEmail(data);
          
          return ContentService.createTextOutput(JSON.stringify({
            'status': 'success',
            'message': 'Already registered',
            'duplicate': true
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }
    
    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
      newSheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Seminar Date',
        'Timeline',
        'Status',
        'Seminar Assigned',
        'Attended',
        'Notes'
      ]);
      
      // Format header row
      newSheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
      
      // Add data
      newSheet.appendRow([
        data.timestamp || new Date(),
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.seminarDate,
        data.timeline,
        'Registered',
        '',
        '',
        ''
      ]);
    } else {
      // Add data to existing sheet
      sheet.appendRow([
        data.timestamp || new Date(),
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.seminarDate,
        data.timeline,
        'Registered',
        '',
        '',
        ''
      ]);
    }
    
    // Optional: Send confirmation email to registrant
    sendConfirmationEmail(data);
    
    // Optional: Send notification to yourself
    sendNotificationEmail(data);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Registration received'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Function to send confirmation email to registrant
function sendConfirmationEmail(data) {
  try {
    const subject = "You're Registered! First-Time Buyer Seminar Details";
    
    const htmlBody = `
      <p>Hi ${data.firstName},</p>
      
      <p>Thanks for registering for my First-Time Home Buyer Seminar!</p>
      
      <p><strong>Here's what you need to know:</strong></p>
      
      <p>📅 <strong>Date:</strong> Next Available Seminar (you'll receive the specific date within 24 hours)<br>
      💻 <strong>Where:</strong> Google Meet (link will be sent 24 hours before the seminar)<br>
      ⏱ <strong>Duration:</strong> 60 minutes</p>
      
      <p><strong>What to expect:</strong></p>
      <ul>
        <li>Real strategies that have saved families $50-70K</li>
        <li>No sales pitch (I promise)</li>
        <li>Q&A at the end for your specific situation</li>
        <li>A resource guide you can reference later</li>
      </ul>
      
      <p>Quick prep: Think about your timeline (when you want to buy) and your biggest questions. I'll make sure we cover them.</p>
      
      <p>I'll send you reminder emails and the Google Meet link as we get closer to your seminar date.</p>
      
      <p>Looking forward to seeing you there!</p>
      
      <p><strong>Mathew Gibeault</strong><br>
      Mortgage Development Manager<br>
      National Bank of Canada<br>
      Phone: 647-456-8120<br>
      Email: hello@mathewgibeault.ca</p>
      
      <hr>
      
      <p style="font-size: 12px; color: #666;">
      You're receiving this email because you registered for the First-Time Home Buyer Seminar at seminar.mathewgibeault.ca on ${new Date(data.timestamp).toLocaleDateString()}.<br><br>
      
      <strong>National Bank</strong><br>
      2002 Sheppard Ave E, North York, ON M2J 5B3<br><br>
      
      To unsubscribe from future seminar communications, <a href="mailto:hello@mathewgibeault.ca?subject=UNSUBSCRIBE&body=Please%20unsubscribe%20me%20from%20your%20seminar%20email%20list.">click here</a> or reply with "UNSUBSCRIBE" in the subject line.
      </p>
    `;

    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody
    });
    
    Logger.log('Confirmation email sent to: ' + data.email);
  } catch (error) {
    Logger.log('Error sending confirmation email: ' + error.toString());
  }
}

// Optional: Function to send notification to yourself when someone registers
function sendNotificationEmail(data) {
  try {
    const yourEmail = 'hello@mathewgibeault.ca'; // Change this to your email
    
    const subject = `🎯 New Seminar Registration: ${data.firstName} ${data.lastName}`;
    
    const body = `New registration received:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Timeline: ${data.timeline}
Registered: ${data.timestamp}

---
Check your Google Sheet for full details.

Action Required:
1. Assign them to next available seminar date
2. Send them the Google Meet link 24-48 hours before

National Bank
2002 Sheppard Ave E, North York, ON M2J 5B3`;

    MailApp.sendEmail({
      to: yourEmail,
      subject: subject,
      body: body
    });
    
    Logger.log('Notification email sent');
  } catch (error) {
    Logger.log('Error sending notification email: ' + error.toString());
  }
}

// Test function - run this to make sure your sheet setup works
function testSheetSetup() {
  const testData = {
    timestamp: new Date(),
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '(555) 123-4567',
    seminarDate: 'Tuesday, Jan 14 at 7:00 PM EST',
    timeline: '6-12 months'
  };
  
  doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });
  
  Logger.log('Test completed. Check your Google Sheet.');
}
