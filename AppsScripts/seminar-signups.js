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
        'Notes'
      ]);
      
      // Format header row
      newSheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
      
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
    
    const body = `Hi ${data.firstName},

Thanks for registering for my First-Time Home Buyer Seminar!

Here's what you need to know:

📅 Date: Next Available Seminar (you'll receive the specific date within 24 hours)
💻 Where: Google Meet (link will be sent 24 hours before the seminar)
⏱ Duration: 60 minutes

What to expect:
- Real strategies that have saved families $50-70K
- No sales pitch (I promise)
- Q&A at the end for your specific situation
- A resource guide you can reference later

I'll send you the specific date and Google Meet link within 24 hours. If that date doesn't work for you, just reply to this email and we'll get you into the next available session.

Looking forward to seeing you there!

Mathew Gibeault
Mortgage Development Manager
National Bank of Canada
Phone: 647-456-8120
Email: hello@mathewgibeault.ca

---

You're receiving this email because you registered for the First-Time Home Buyer Seminar at seminar.mathewgibeault.ca on ${new Date(data.timestamp).toLocaleDateString()}.

National Bank
2002 Sheppard Ave E, North York, ON M2J 5B3

To unsubscribe from future seminar communications, reply to this email with "UNSUBSCRIBE" in the subject line, or email hello@mathewgibeault.ca`;

    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body
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
2. Send them the Zoom link 24-48 hours before

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
