# WordPress Integration Guide

## Method 1: Subdomain Integration (Recommended)

### Step 1: Host Questionnaire on Subdomain
1. Create subdomain: `fitness.yourdomain.com`
2. Upload the `dist` folder contents to subdomain directory
3. Configure DNS A record pointing to your server

### Step 2: Link from WordPress
Add buttons/menu items in WordPress:

```html
<!-- In WordPress posts/pages -->
<a href="https://fitness.yourdomain.com" class="fitness-cta-button">
  Take Fitness Assessment
</a>

<!-- In WordPress theme (header.php or menu) -->
<li><a href="https://fitness.yourdomain.com">Fitness Quiz</a></li>
```

### Step 3: Style Integration
Add CSS to WordPress theme to match styling:

```css
.fitness-cta-button {
  background: linear-gradient(45deg, #ec4899, #f97316);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: transform 0.3s;
}

.fitness-cta-button:hover {
  transform: scale(1.05);
}
```

## Method 2: Subdirectory Integration

### Step 1: Upload to Subdirectory
1. Create folder: `/public_html/questionnaire/`
2. Upload `dist` contents to this folder
3. Access via: `yourdomain.com/questionnaire`

### Step 2: WordPress .htaccess Configuration
Add to your WordPress .htaccess:

```apache
# Fitness Questionnaire
RewriteRule ^questionnaire/(.*)$ /questionnaire/$1 [L]
RewriteRule ^questionnaire$ /questionnaire/index.html [L]
```

## Method 3: WordPress Plugin Integration

### Create Custom WordPress Plugin

```php
<?php
/**
 * Plugin Name: Fitness Questionnaire
 * Description: Integrates fitness questionnaire with WordPress
 */

// Add shortcode for embedding
function fitness_questionnaire_shortcode() {
    return '<iframe src="https://fitness.yourdomain.com" width="100%" height="800px" frameborder="0"></iframe>';
}
add_shortcode('fitness_questionnaire', 'fitness_questionnaire_shortcode');

// Add menu item
function add_fitness_menu_item() {
    add_menu_page(
        'Fitness Quiz',
        'Fitness Quiz', 
        'read',
        'https://fitness.yourdomain.com',
        '',
        'dashicons-heart',
        30
    );
}
add_action('admin_menu', 'add_fitness_menu_item');
?>
```

## Email Automation Setup

### Step 1: Configure EmailJS
1. Sign up at [emailjs.com](https://emailjs.com)
2. Create email service (Gmail, Outlook, etc.)
3. Create email template
4. Get your service ID, template ID, and public key

### Step 2: Update Configuration
In `src/services/emailService.ts`, replace:
```javascript
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id'; 
const EMAILJS_PUBLIC_KEY = 'your_public_key';
```

### Step 3: EmailJS Template
Create template with these variables:
- `{{user_name}}`
- `{{user_email}}`
- `{{user_phone}}`
- `{{selected_plan}}`
- `{{formatted_message}}`
- `{{submission_time}}`

### Step 4: WordPress Webhook (Alternative)
If you prefer WordPress integration:

```php
// Add to WordPress functions.php
add_action('rest_api_init', function() {
    register_rest_route('custom/v1', '/questionnaire', array(
        'methods' => 'POST',
        'callback' => 'handle_questionnaire_submission',
        'permission_callback' => '__return_true'
    ));
});

function handle_questionnaire_submission($request) {
    $data = $request->get_json_params();
    
    // Send email
    wp_mail(
        'admin@yourdomain.com',
        'New Fitness Questionnaire',
        format_questionnaire_email($data)
    );
    
    // Trigger your existing Telegram automation
    do_action('questionnaire_submitted', $data);
    
    return new WP_REST_Response('Success', 200);
}
```

## Deployment Steps

### For Shared Hosting:
1. Build: `npm run build`
2. Upload `dist` contents via cPanel/FTP
3. Configure .htaccess (already included)
4. Test the integration

### For VPS:
1. Install Node.js and Nginx
2. Build and upload files
3. Configure Nginx virtual host
4. Set up SSL certificate

## Testing Integration

1. **Test questionnaire flow** end-to-end
2. **Verify email delivery** to admin
3. **Check WhatsApp integration** works
4. **Test responsive design** on mobile
5. **Validate WordPress links** work correctly

## Maintenance

- **Regular backups** of questionnaire data
- **Monitor email delivery** rates
- **Update pricing** as needed
- **Track conversion** metrics
- **Test payment flow** regularly

The questionnaire will now seamlessly integrate with your WordPress site while maintaining its own professional appearance and triggering your existing email → Telegram automation workflow.