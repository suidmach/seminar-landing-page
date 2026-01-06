# First-Time Home Buyer Seminar Landing Page

A professional, conversion-optimized landing page for Mat's first-time home buyer seminars.

## Features

✅ Mobile-responsive design
✅ Professional styling with modern UI
✅ Form submission to Google Sheets
✅ Automatic confirmation emails
✅ Fast loading (no external dependencies except Google Fonts)
✅ Ready for Vercel deployment

---

## Quick Start Guide

### Step 1: Set Up Google Sheets Integration

1. **Create a Google Sheet:**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet
   - Name it "Seminar Registrations"
   - Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`

2. **Set Up Google Apps Script:**
   - Go to [script.google.com](https://script.google.com)
   - Click "New project"
   - Delete the default code
   - Copy all code from `google-apps-script.js` and paste it
   - Update line 19: Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID
   - Update line 108: Replace email with your actual email

3. **Deploy the Script:**
   - Click "Deploy" → "New deployment"
   - Click the gear icon ⚙️ → Select "Web app"
   - Configure:
     - Description: "Seminar Registration Handler"
     - Execute as: "Me"
     - Who has access: "Anyone"
   - Click "Deploy"
   - **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/...`)

4. **Update Your Landing Page:**
   - Open `script.js`
   - Line 2: Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL
   - Save the file

5. **Test the Integration:**
   - In Google Apps Script, click "Run" → Select "testSheetSetup"
   - Authorize the script when prompted
   - Check your Google Sheet - you should see a test entry

---

### Step 2: Customize Your Landing Page

1. **Update Contact Information:**
   - Open `index.html`
   - Search for `hello@mathewgibeault.ca` and replace with your email
   - Search for `[Your Phone Number]` and add your phone number
   - Search for `[Your Number]` and add your NMLS number

2. **Update Seminar Dates:**
   - Open `index.html`
   - Find the `<select id="seminarDate">` section (around line 137)
   - Update the date options with your actual seminar dates

3. **Add Your Photo (Optional):**
   - Add your professional photo to the project folder as `mat-photo.jpg`
   - Open `index.html`
   - Find the "About Mat" section (around line 192)
   - Uncomment the image line:
     ```html
     <img src="mat-photo.jpg" alt="Mat Gibeault" class="about-photo">
     ```

4. **Customize Colors (Optional):**
   - Open `styles.css`
   - Update the CSS variables at the top (lines 9-17) to match your brand

---

### Step 3: Deploy to Vercel

1. **Create a GitHub Repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Seminar landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Your site will be live in ~60 seconds!

3. **Add Custom Domain (Optional):**
   - In Vercel dashboard, go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain (e.g., `seminar.mathewgibeault.ca`)
   - Follow Vercel's DNS instructions

---

## Project Structure

```
seminar-landing/
├── index.html              # Main landing page
├── styles.css              # All styling
├── script.js               # Form handling
├── google-apps-script.js   # Backend (goes in Google Apps Script)
└── README.md               # This file
```

---

## Customization Guide

### Changing Seminar Dates

Edit `index.html`, find this section:
```html
<select id="seminarDate" name="seminarDate" required>
    <option value="">Select a date...</option>
    <option value="Tuesday, Jan 14 at 7:00 PM EST">Tuesday, Jan 14 at 7:00 PM EST</option>
    <!-- Add more dates here -->
</select>
```

### Adding Facebook Pixel (for Tracking)

Add before the closing `</head>` tag in `index.html`:
```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### Adding Google Analytics

Add before the closing `</head>` tag in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Email Automation

The Google Apps Script automatically sends two emails:

1. **Confirmation Email to Registrant**
   - Sent immediately upon registration
   - Contains seminar details and what to expect
   - Customize in `google-apps-script.js` (line 82)

2. **Notification Email to You**
   - Alerts you when someone registers
   - Contains all registration details
   - Customize in `google-apps-script.js` (line 107)

To disable emails, comment out these lines in `google-apps-script.js`:
```javascript
// sendConfirmationEmail(data);
// sendNotificationEmail(data);
```

---

## Google Sheet Structure

Your Google Sheet will automatically be created with these columns:

| Timestamp | First Name | Last Name | Email | Phone | Seminar Date | Timeline | Status | Notes |
|-----------|------------|-----------|-------|-------|--------------|----------|--------|-------|

- **Status**: Defaults to "Registered" - you can manually update to "Attended", "No Show", "Consultation Booked", etc.
- **Notes**: Add any custom notes about the registrant

---

## Troubleshooting

### Forms aren't submitting

1. Check the browser console for errors (F12)
2. Verify the Google Apps Script URL in `script.js` is correct
3. Make sure the Google Apps Script is deployed as "Anyone" can access
4. Test the Google Apps Script directly using the `testSheetSetup()` function

### Emails aren't sending

1. In Google Apps Script, click "Run" → "sendConfirmationEmail" 
2. Authorize the script to send emails when prompted
3. Check your Gmail "Sent" folder to verify emails are sending
4. Check spam folder for received emails

### Styling looks broken

1. Make sure `styles.css` is in the same directory as `index.html`
2. Check browser console for 404 errors
3. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Can't access Google Sheet

1. Verify the Sheet ID in `google-apps-script.js` is correct
2. Make sure you own the Google Sheet
3. Check that the script has permission to access Google Sheets

---

## Testing Checklist

Before launching your ads, test:

- [ ] Form submits successfully
- [ ] Data appears in Google Sheet
- [ ] Confirmation email is received
- [ ] Notification email is received
- [ ] Page looks good on mobile
- [ ] Page looks good on desktop
- [ ] All links work (including smooth scroll to registration)
- [ ] Contact information is correct
- [ ] Seminar dates are correct

---

## Connecting to Facebook Ads

### Option 1: Direct Link
Use your Vercel URL directly in Facebook ads:
```
https://your-project.vercel.app
```

### Option 2: Custom Domain
Set up a custom domain for better branding:
```
https://seminar.mathewgibeault.ca
```

### Facebook Ad Setup
1. Go to Facebook Ads Manager
2. Create new campaign
3. Choose "Traffic" or "Conversions" objective
4. In ad creative, set destination to your landing page URL
5. Use headline and body copy from the ad variations document

---

## Next Steps

1. ✅ Complete Google Sheets setup
2. ✅ Customize landing page content
3. ✅ Deploy to Vercel
4. ✅ Test form submission
5. ✅ Add Facebook Pixel (optional)
6. ✅ Launch Facebook ads
7. ✅ Monitor registrations in Google Sheet

---

## Support

If you need help:
- Check the troubleshooting section above
- Review Google Apps Script logs (View → Logs)
- Check browser console for JavaScript errors

---

## Future Enhancements

Ideas for later:
- [ ] Add Calendly integration for post-seminar consultations
- [ ] Implement automated reminder emails (3 days, 1 day, 2 hours before)
- [ ] Add A/B testing for different headlines
- [ ] Create thank you page with social sharing
- [ ] Add testimonials section with real client stories
- [ ] Integrate with your CRM

---

Built for Mat Gibeault - First-Time Home Buyer Seminars
Last Updated: January 2026
