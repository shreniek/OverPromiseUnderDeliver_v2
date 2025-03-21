# Setting Up SMTP.js for the Contact Form

SMTP.js is a simple library that allows you to send emails directly from JavaScript. It's much simpler than other solutions since it only requires one script tag and minimal setup.

## Step 1: Add SMTP.js to Your HTML

Add the SMTP.js script tag to your HTML file, before your own scripts:

```html
<script src="https://smtpjs.com/v3/smtp.js"></script>
<script src="scripts-with-smtpjs.js"></script>
```

## Step 2: Get Your SMTP Credentials

You have two options for configuring SMTP.js:

### Option 1: Use a Secure Token (Recommended)

1. Visit [SMTPjs.com](https://smtpjs.com/), scroll down to "Get a free account now!"
2. Enter your email and create a password to sign up
3. Click on "SMTP Server" in the dashboard
4. Add a new SMTP server with your email provider's details:
   - Server: (e.g., smtp.gmail.com)
   - Username: (your email)
   - Password: (your email password or app password)
   - Port: (typically 587 or 465)
5. After adding the server, you'll get a "Secure Token"
6. Copy this token and replace `"YOUR_SECURE_TOKEN"` in the JavaScript file

### Option 2: Specify SMTP Details Directly

If you prefer not to use a secure token, you can specify your SMTP details directly:

```javascript
Email.send({
    Host: "smtp.gmail.com",
    Username: "your-email@gmail.com",
    Password: "your-password-or-app-password",
    Port: 587,
    To: 'recipient@example.com',
    From: "your-email@gmail.com",
    Subject: "Email Subject",
    Body: "Email Body"
});
```

**Note**: If using Gmail, you'll need to:
1. Enable "Less secure app access" (not recommended), OR
2. Generate an "App Password" (recommended) by:
   - Enabling 2-Step Verification on your Google account
   - Going to Security > App passwords
   - Generating a password specifically for your website

## Step 3: Update the Email Addresses

In the `scripts-with-smtpjs.js` file, update:

1. The `To` parameter with your actual email address (where you want to receive form submissions)
2. The `From` parameter with a valid sender address (this should be an email you control)

## Step 4: Test the Form

1. Fill out the contact form on your website
2. Submit the form
3. Check your email to see if you received the test message
4. Check the browser console for any errors if emails aren't being sent

## Troubleshooting

If emails are not being sent:

1. Check the browser console for errors
2. Verify your SMTP credentials
3. Make sure your email provider allows sending from third-party applications
4. If using Gmail, ensure you've set up an App Password correctly

## Additional Notes

1. SMTP.js is free for up to 50 emails per day on their basic plan
2. For higher volume, you may need to upgrade or consider other solutions
3. This method is simpler than EmailJS or PHP, but your SMTP credentials are potentially visible in the code
4. The Secure Token option helps protect your actual credentials

For more information, visit [SMTPjs.com](https://smtpjs.com/).
