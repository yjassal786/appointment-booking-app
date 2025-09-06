import React, { useState } from 'react';
import { Calendar, Clock, Phone, Upload, MessageCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { AppointmentData } from '../types';

interface AppointmentBookingProps {
  selectedPlan: string;
  onComplete: (data: AppointmentData) => void;
  onBack: () => void;
}

const planDetails = {
  basic: { name: '3 Month Transformation', price: '₹9,999' },
  premium: { name: '6 Month Complete', price: '₹17,999' },
  elite: { name: '9 Month Elite', price: '₹24,999' }
};

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM'
];

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ selectedPlan, onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const plan = planDetails[selectedPlan as keyof typeof planDetails];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentScreenshot(file);
    }
  };

  const handleSubmit = () => {
    const appointmentData: AppointmentData = {
      ...formData,
      paymentScreenshot: paymentScreenshot || undefined
    };
    onComplete(appointmentData);
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.date && formData.time;

  const whatsappNumber = "919876543210";
  const whatsappMessage = `Hi! I've booked the ${plan.name} plan and made the payment of ${plan.price}. My appointment is on ${formData.date} at ${formData.time}. Name: ${formData.name}`;

  return (
    <div className="min-h-screen p-4 py-12">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Plans
        </button>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Book Your Consultation</h1>
            <p className="text-gray-300">Selected Plan: <span className="text-pink-400 font-semibold">{plan.name}</span></p>
            <p className="text-2xl font-bold text-green-400 mt-2">{plan.price}</p>
          </div>

          {!showPayment ? (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors duration-200"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Date Selection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-400 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    <Clock className="w-5 h-5 inline mr-2" />
                    Preferred Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-400 transition-colors duration-200"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time} className="bg-gray-800">{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowPayment(true)}
                  disabled={!isFormValid}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:from-gray-500 disabled:to-gray-600 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Payment
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Complete Your Payment</h2>
                <p className="text-gray-300">Amount: <span className="text-green-400 font-bold text-xl">{plan.price}</span></p>
              </div>

              {/* UPI Payment */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Pay via UPI</h3>
                <div className="text-center">
                  <div className="bg-white p-4 rounded-xl inline-block mb-4">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=fitness@paytm&pn=FitnessCoach&am=9999&cu=INR" 
                      alt="UPI QR Code" 
                      className="w-48 h-48"
                    />
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Scan this QR code with any UPI app (PhonePe, Google Pay, Paytm)
                  </p>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-white font-mono">UPI ID: fitness@paytm</p>
                  </div>
                </div>
              </div>

              {/* Upload Payment Screenshot */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Upload Payment Screenshot</h3>
                <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="payment-screenshot"
                  />
                  <label
                    htmlFor="payment-screenshot"
                    className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-block"
                  >
                    Choose Screenshot
                  </label>
                  {paymentScreenshot && (
                    <p className="text-green-400 mt-2">✓ {paymentScreenshot.name}</p>
                  )}
                </div>
              </div>

              {/* WhatsApp Option */}
              <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/30">
                <h3 className="text-lg font-semibold text-white mb-4">Send Payment Confirmation</h3>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send via WhatsApp
                </a>
                <p className="text-gray-400 text-sm mt-2 text-center">
                  Send your payment screenshot directly to our WhatsApp
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-semibold transition-all duration-300 border border-white/30"
                >
                  Back to Details
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;