## PHASE 7: LAUNCH FACEBOOK ADS! 🚀

### Step 15: Create Your First Facebook Ad

1. Go to **facebook.com/adsmanager**
2. Click **"Create"** (green button)
3. Choose objective: **"Traffic"**
4. Campaign name: "First-Time Buyer Seminar - Jan 2026"
5. Daily budget: **$50** to start
6. Click **"Next"**

**Ad Set Level:**
- **Location:** Toronto (or your city) + 50km radius
- **Age:** 25-40
- **Detailed targeting:** 
  - "First-time home buyer"
  - "Real estate"
  - "Mortgage rates"
  - "Recently engaged"
  - "Apartment dwellers"
- **Placements:** Automatic
- Click **"Next"**

**Ad Creative:**
- **Format:** Single image
- **Image:** Professional photo of you OR stock image of happy couple with keys
- **Primary text:**

```
I'm Mat Gibeault, Mortgage Development Manager with National Bank.

Over 20 years, I've helped 1,500 families buy their first home—and I've seen too many leave $50-70K on the table.

Most first-time buyers don't know about:
✓ The 2025 HST rebate changes (save $40K+)
✓ First-time buyer grants they qualify for
✓ Down payment programs that get you in faster

Join my FREE 60-minute seminar. No sales pitch. Just the strategies that work.

Register now - limited spots available.
```

- **Headline:** "How First-Time Buyers Are Saving $70K+ in 2025"
- **Description:** "Free seminar. No sales pitch. Just strategies."
- **Website URL:** `https://seminar.mathewgibeault.ca`
- **Call to action button:** "Sign Up"

7. Click **"Publish"**
8. Wait for approval (usually 1-24 hours)

---

## WHAT HAPPENS WHEN SOMEONE CLICKS YOUR AD:

1. They see your Facebook ad
2. They click "Sign Up"
3. They land on `seminar.mathewgibeault.ca`
4. They scroll and see the form
5. They fill out: Name, Email, Phone, Timeline
6. They see: **"Note: You'll be registered for the next available seminar date."**
7. They submit
8. **Automatically:**
   - Their info goes to Google Sheet
   - They get confirmation email
   - You get notification email
9. **You manually:** Assign them to next seminar and send Zoom link

---

## UPDATING FILES IN THE FUTURE

If you need to change something on the landing page:

1. Go to your GitHub repository
2. Click the file you want to edit
3. Click the pencil icon (✏️)
4. Make your changes
5. Click "Commit changes"
6. **Vercel automatically redeploys!** (Takes 30 seconds)
7. Refresh your live site - changes are live!

---

## TROUBLESHOOTING

**Form doesn't submit:**
- Double-check the Google Apps Script URL in script.js
- Make sure it ends with `/exec`
- Verify Apps Script is deployed as "Anyone can access"

**No data in Google Sheet:**
- Check Sheet ID in Apps Script is correct
- Run `testSheetSetup()` function in Apps Script
- Check browser console for errors (F12 → Console)

**Emails not sending:**
- In Apps Script, manually run `sendConfirmationEmail()` to authorize
- Check spam folders
- Verify email in line 108 of Apps Script

**Domain not working:**
- Wait longer (can take up to 1 hour)
- Check Namecheap DNS settings
- Make sure CNAME record is: `seminar` → `cname.vercel-dns.com`
- Try incognito/private browser window

---

## YOU'RE DONE! 🎉

**Your landing page:** `https://seminar.mathewgibeault.ca`

**What's automated:**
- Form submissions → Google Sheet ✅
- Confirmation emails to registrants ✅
- Notification emails to you ✅

**What you do manually:**
- Assign registrants to specific seminar dates
- Send them Zoom link before seminar
- Run the seminar
- Follow up with 1-on-1 consultations

**Next step:** Launch those Facebook ads and start getting registrations!

---

## QUICK REFERENCE CARD

**Your URLs:**
- Landing Page: `https://seminar.mathewgibeault.ca`
- Google Sheet: [your sheet URL]
- Vercel Dashboard: vercel.com/dashboard
- GitHub Repo: github.com/[username]/seminar-landing-page

**Your Info:**
- Phone: 647-456-8120
- Email: hello@mathewgibeault.ca
- Title: Mortgage Development Manager, National Bank of Canada

**Support:**
- Vercel Help: vercel.com/docs
- Namecheap DNS: namecheap.com/support/knowledgebase
- Google Apps Script: developers.google.com/apps-script

---

**You're ready to launch! 🚀**
