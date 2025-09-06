import React from 'react';
import { testEmailConfig } from '../tests/emailtest';
import { EMAIL_CONFIG } from '../config/email';

export const TestEmail: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<string>('');
  const [debugInfo, setDebugInfo] = React.useState<string>('');

  const handleTest = async () => {
    setIsLoading(true);
    setResult('');
    setDebugInfo('');
    
    try {
      // Validate environment and configuration
      if (!import.meta.env.VITE_RESEND_API_KEY) {
        throw new Error('Resend API key not found in environment variables');
      }

      if (!EMAIL_CONFIG.ADMIN_EMAIL || !EMAIL_CONFIG.FROM_EMAIL) {
        throw new Error('Email configuration is incomplete');
      }

      // Add debug information
      setDebugInfo(`Testing email service:
        To: ${EMAIL_CONFIG.ADMIN_EMAIL}
        From: ${EMAIL_CONFIG.FROM_EMAIL}
        API Key: ${import.meta.env.VITE_RESEND_API_KEY ? 'Present' : 'Missing'}
      `);

      const response = await testEmailConfig();
      console.log('Test response:', response);
      
      if (!response) {
        throw new Error('No response received from email service');
      }

      setResult(response.success ? 
        '✅ Email sent successfully!' : 
        `❌ Failed: ${response.error || 'Unknown error occurred'}`
      );
    } catch (error) {
      console.error('Test error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setResult(`❌ Error: ${errorMessage}`);
      setDebugInfo(prev => `${prev}\nError details: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
      <button 
        onClick={handleTest}
        disabled={isLoading}
        className={`px-4 py-2 rounded text-white ${
          isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        } transition-colors duration-200`}
      >
        {isLoading ? 'Sending...' : 'Test Email'}
      </button>
      {result && (
        <p className={`mt-2 text-sm ${result.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
          {result}
        </p>
      )}
      {debugInfo && (
        <pre className="mt-2 text-xs text-gray-400 whitespace-pre-wrap max-w-xs">
          {debugInfo}
        </pre>
      )}
    </div>
  );
};