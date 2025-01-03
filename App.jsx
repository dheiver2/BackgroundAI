import React, { useState, useRef } from 'react';
import { 
  ImageIcon, 
  Upload, 
  Wand2, 
  Download, 
  Shield, 
  Zap, 
  Globe, 
  Star, 
  CheckCircle 
} from 'lucide-react';

// Logo Component
const LogoComponent = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 200 200" 
    className="w-16 h-16"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <g transform="translate(100, 100) scale(0.7)">
      {/* Image outline */}
      <path 
        d="M-70,-70 Q0,-100 70,-70 Q100,0 70,70 Q0,100 -70,70 Q-100,0 -70,-70" 
        fill="url(#logoGradient)"
      />
      {/* Wand/magic removal effect */}
      <path 
        d="M-30,-30 L30,30 M-30,30 L30,-30" 
        stroke="white" 
        strokeWidth="10" 
        strokeLinecap="round"
      />
    </g>
  </svg>
);

// Marketing Plans
const PRICING_PLANS = [
  {
    title: 'Free',
    price: '$0',
    features: [
      '5 free background removals',
      'Basic AI quality',
      'Limited resolution',
      'Watermarked results'
    ],
    buttonClass: 'bg-gray-200 text-gray-800'
  },
  {
    title: 'Pro',
    price: '$9.99/month',
    features: [
      'Unlimited background removals',
      'Advanced AI technology',
      'Full resolution',
      'No watermarks',
      'Priority processing'
    ],
    buttonClass: 'bg-blue-500 text-white',
    recommended: true
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited team usage',
      'Custom AI model',
      'API access',
      'Dedicated support',
      'Advanced security'
    ],
    buttonClass: 'bg-purple-500 text-white'
  }
];

const BackgroundRemovalApp = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateBackgroundRemoval = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    try {
      // Simulate background removal processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a canvas to simulate processing
      const canvas = document.createElement('canvas');
      const img = new Image();
      img.src = originalImage;
      
      await new Promise(resolve => {
        img.onload = resolve;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // Simple simulation of background removal
      ctx.drawImage(img, 0, 0);
      ctx.globalCompositeOperation = 'destination-in';
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fill();

      setProcessedImage(canvas.toDataURL());
    } catch (error) {
      console.error('Background removal error:', error);
      alert('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProcessedImage = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed-image.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <LogoComponent />
          <h1 className="text-2xl font-bold text-gray-800 ml-2">BackgroundAI</h1>
        </div>
        <nav className="hidden md:flex space-x-4 items-center">
          <a href="#features" className="text-blue-600 hover:text-blue-800">Features</a>
          <a href="#pricing" className="text-blue-600 hover:text-blue-800">Pricing</a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Start Free
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="text-center mb-16 max-w-4xl">
          <h2 className="text-5xl font-bold mb-6 text-gray-800">
            Remove Backgrounds Instantly with AI
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Transform your images with one-click background removal powered by advanced AI
          </p>
        </section>

        {/* Image Processing Area */}
        <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-2xl mb-16">
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="bg-blue-500 text-white px-6 py-3 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
            >
              <Upload className="mr-2" /> Upload Image
            </button>
          </div>

          {originalImage && (
            <div className="flex flex-col items-center">
              <div className="flex space-x-4 mb-4">
                <div className="flex flex-col items-center">
                  <span className="mb-2 text-gray-600">Original</span>
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="max-w-xs max-h-64 rounded border"
                  />
                </div>
                {processedImage && (
                  <div className="flex flex-col items-center">
                    <span className="mb-2 text-gray-600">Background Removed</span>
                    <img 
                      src={processedImage} 
                      alt="Processed" 
                      className="max-w-xs max-h-64 rounded border"
                    />
                  </div>
                )}
              </div>
              <button 
                onClick={simulateBackgroundRemoval}
                disabled={isProcessing}
                className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition"
              >
                {isProcessing ? 'Processing...' : 'Remove Background'}
              </button>
              {processedImage && (
                <button 
                  onClick={downloadProcessedImage}
                  className="mt-4 bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition"
                >
                  <Download className="mr-2 inline" /> Download Image
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pricing Plans */}
        <section className="w-full max-w-6xl mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Flexible Pricing</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-xl shadow-lg text-center relative ${
                  plan.recommended ? 'border-4 border-blue-500' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-6">{plan.price}</p>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <CheckCircle className="mr-2 text-green-500" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full hover:opacity-90 transition ${plan.buttonClass}`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="w-full max-w-6xl bg-blue-600 text-white p-16 rounded-xl text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Images?</h3>
          <p className="text-xl mb-8">Start removing backgrounds in seconds with our AI-powered tool</p>
          <button className="bg-white text-blue-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition">
            Start Free Trial
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <LogoComponent />
              <span className="text-xl font-bold ml-2">BackgroundAI</span>
            </div>
            <p>AI-powered image background removal</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300">Features</a></li>
              <li><a href="#" className="hover:text-blue-300">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-300">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-300">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p>support@backgroundai.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="text-center mt-8">
          © 2024 BackgroundAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BackgroundRemovalApp;
