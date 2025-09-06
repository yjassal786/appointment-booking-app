# Appointment Booking App

A modern, responsive appointment booking application built with React, TypeScript, and Tailwind CSS. This app features a questionnaire system, pricing plans, and email integration for appointment confirmations.

## 🚀 Features

- **Interactive Questionnaire**: Multi-step form to collect user information
- **Pricing Plans**: Different service tiers with detailed pricing
- **Email Integration**: Automatic email confirmations using EmailJS and Resend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean and professional design with smooth animations

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Email Services**: EmailJS, Resend API
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yjassal786/appointment-booking-app.git
   cd appointment-booking-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_RESEND_API_KEY=your_resend_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

**🌐 Live Demo**: [View App](https://yjassal786.github.io/appointment-booking-app/)

### Manual Deployment
```bash
npm run build
npm run deploy
```

### Automatic Deployment
Push to the main/master branch, and GitHub Actions will automatically build and deploy your app.

## 📁 Project Structure

```
src/
├── components/
│   ├── AppointmentBooking.tsx
│   ├── LandingPage.tsx
│   ├── PricingPlans.tsx
│   ├── ProgressBar.tsx
│   ├── QuestionCard.tsx
│   ├── Questionnaire.tsx
│   └── TestEmail.tsx
├── config/
│   └── email.ts
├── services/
│   └── emailService.ts
├── tests/
│   └── emailtest.ts
├── App.tsx
├── main.tsx
└── types.ts
```

## ⚙️ Configuration

### Email Setup
1. **EmailJS**: Create an account at [EmailJS](https://www.emailjs.com/) and get your service ID, template ID, and public key
2. **Resend**: Create an account at [Resend](https://resend.com/) and get your API key

### Environment Variables
Make sure to set up the following environment variables:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_RESEND_API_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact [your-email@example.com].

---

⭐ If you found this project helpful, please give it a star!
