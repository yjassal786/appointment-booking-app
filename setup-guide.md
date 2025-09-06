# Complete Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Choose Hosting Method

#### Option A: Free Hosting (Recommended)
**Netlify (Easiest):**
1. Go to [netlify.com](https://netlify.com)
2. Drag the `dist` folder to deploy
3. Get instant live URL: `https://amazing-site-name.netlify.app`

**Firebase Hosting (Google):**
1. Install: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Init: `firebase init hosting`
4. Deploy: `firebase deploy`

#### Option B: Your Shared Hosting
1. Upload `dist` folder contents to `public_html/questionnaire/`
2. Access via: `yourdomain.com/questionnaire`

#### Option C: Subdomain
1. Create subdomain: `fitness.yourdomain.com`
2. Upload `dist` contents to subdomain directory
3. Configure DNS

## 📧 Email Automation Setup

### Step 1: EmailJS Setup (Free)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Add email service (Gmail recommended)
3. Create email template using `emailjs-template.html`
4. Get credentials: Service ID, Template ID, Public Key

### Step 2: Configure Email Settings
Update `src/config/email.ts`:
```javascript
export const EMAIL_CONFIG = {
  SERVICE_ID: 'service_abc123',     // From EmailJS dashboard
  TEMPLATE_ID: 'template_xyz789',   // From EmailJS dashboard  
  PUBLIC_KEY: 'user_def456',        // From EmailJS dashboard
  ADMIN_EMAIL: 'your@email.com',    // Your admin email
  WHATSAPP_NUMBER: '919876543210',  // Your WhatsApp number
  UPI_ID: 'yourname@paytm',         // Your UPI ID
};
```

### Step 3: Test Email Flow
1. Complete questionnaire
2. Check admin email receives notification
3. Verify Telegram automation triggers

## 🔗 WordPress Integration

### Method 1: Menu Integration
Add to WordPress menu:
```html
<a href="https://fitness.yourdomain.com">Fitness Assessment</a>
```

### Method 2: Button in Posts/Pages
```html
<div style="text-align: center; margin: 30px 0;">
  <a href="https://fitness.yourdomain.com" 
     style="background: linear-gradient(45deg, #ec4899, #f97316); 
            color: white; padding: 15px 30px; border-radius: 25px; 
            text-decoration: none; font-weight: bold; display: inline-block;">
    🏋️ Take Free Fitness Assessment
  </a>
</div>
```

### Method 3: Widget Integration
Create WordPress widget:
```php
// Add to functions.php
function fitness_questionnaire_widget() {
    echo '<div class="fitness-widget">
            <h3>Get Your Personal Fitness Plan</h3>
            <a href="https://fitness.yourdomain.com" class="btn-fitness">
              Start Assessment
            </a>
          </div>';
}
add_action('wp_dashboard_setup', 'fitness_questionnaire_widget');
```

## 📱 WhatsApp Integration

The questionnaire automatically generates WhatsApp links with:
- User details
- Selected plan
- Appointment time
- Payment confirmation

Format: `https://wa.me/919876543210?text=...`

## 💳 Payment Setup

### UPI Configuration
Update in `src/config/email.ts`:
```javascript
UPI_ID: 'yourname@paytm'  // Your actual UPI ID
```

The QR code automatically generates with your UPI details.

### Payment Flow
1. User selects plan
2. Books appointment
3. Sees UPI QR code
4. Makes payment
5. Uploads screenshot
6. Sends confirmation via WhatsApp
7. Admin receives email notification

## 🔧 Customization

### Update Contact Details
In `src/config/email.ts`:
- Phone number
- WhatsApp number  
- UPI ID
- Admin email

### Modify Plans/Pricing
Edit `src/components/PricingPlans.tsx`:
- Plan names
- Prices
- Features
- Durations

### Change Branding
- Update colors in Tailwind classes
- Modify logo/branding text
- Adjust messaging

## 📊 Analytics Integration

Add Google Analytics:
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Important Notes

1. **Test thoroughly** before going live
2. **Backup regularly** if using shared hosting
3. **Monitor email delivery** rates
4. **Keep UPI details updated**
5. **Test mobile experience**

## Support

If you need help with:
- WordPress integration
- Email automation
- Payment setup
- Custom modifications

The system is designed to work with your existing WordPress → Telegram automation. Once emails are sent to your admin address, your current WordPress automation should trigger the Telegram notifications automatically.