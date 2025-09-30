import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Eye, Navigation, Phone, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

export default function App() {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Voice feedback function
  const speak = (text: string) => {
    if (isVoiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Welcome message on app load
  useEffect(() => {
    const timer = setTimeout(() => {
      speak("Welcome to NetraMarg. Your smart navigation companion is ready.");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAIVision = async () => {
    setIsProcessing(true);
    speak("Processing AI Vision. Please wait while I analyze your surroundings.");
    
    // Simulate API call to AI vision service
    setTimeout(() => {
      const mockDescription = "I can see a wide sidewalk ahead with trees on the left side. There's a bench about 3 meters away on your right. The path is clear with no obstacles detected.";
      speak(mockDescription);
      toast.success("AI Vision completed");
      setIsProcessing(false);
    }, 3000);
  };

  const handleNavigation = () => {
    speak("Navigation assistance activated. Please tell me your destination.");
    toast.success("Navigation ready");
    
    // Simulate navigation feedback
    setTimeout(() => {
      speak("GPS location acquired. Ready to provide turn-by-turn directions.");
    }, 2000);
  };

  const handleSOS = () => {
    speak("SOS Alert activated. Sending emergency message to your contacts.");
    toast.error("SOS Alert Sent");
    
    // Simulate SOS functionality
    setTimeout(() => {
      speak("Emergency alert sent successfully to 3 contacts with your current location.");
    }, 1500);
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled) {
      speak("Voice feedback enabled");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8 mt-4">
        <div className="flex items-center justify-between mb-4">
          <div></div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleVoice}
            className="p-2"
            aria-label={isVoiceEnabled ? "Disable voice feedback" : "Enable voice feedback"}
          >
            {isVoiceEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
        </div>
        
        <h1 className="text-4xl mb-2 text-gray-800">AIoTrix</h1>
        <h2 className="text-2xl mb-3 text-blue-600">NetraMarg</h2>
        <p className="text-lg text-gray-600 italic mb-2">"Empowering Independence Through Innovation"</p>
        <Badge variant="secondary" className="text-sm px-4 py-1">
          Your Smart Navigation Companion
        </Badge>
      </div>

      {/* Main Features */}
      <div className="flex-1 space-y-6 max-w-md mx-auto w-full">
        
        {/* AI Vision Feature */}
        <Card className="p-6 border-2 border-blue-200 shadow-lg">
          <Button
            onClick={handleAIVision}
            disabled={isProcessing}
            className="w-full h-20 bg-blue-600 hover:bg-blue-700 text-white text-xl flex flex-col items-center justify-center space-y-2"
            onFocus={() => speak("AI Vision button. Press to describe your surroundings.")}
          >
            <Eye className="h-8 w-8" />
            <span>{isProcessing ? "Processing..." : "AI Vision"}</span>
          </Button>
          <p className="text-center text-gray-600 mt-3">
            Smart camera analysis of your surroundings
          </p>
        </Card>

        {/* Navigation Feature */}
        <Card className="p-6 border-2 border-green-200 shadow-lg">
          <Button
            onClick={handleNavigation}
            className="w-full h-20 bg-green-600 hover:bg-green-700 text-white text-xl flex flex-col items-center justify-center space-y-2"
            onFocus={() => speak("Navigation assistance button. Press for GPS directions.")}
          >
            <Navigation className="h-8 w-8" />
            <span>Navigation</span>
          </Button>
          <p className="text-center text-gray-600 mt-3">
            GPS-powered step-by-step directions
          </p>
        </Card>

        {/* SOS Alert Feature */}
        <Card className="p-6 border-2 border-red-200 shadow-lg">
          <Button
            onClick={handleSOS}
            className="w-full h-20 bg-red-600 hover:bg-red-700 text-white text-xl flex flex-col items-center justify-center space-y-2"
            onFocus={() => speak("SOS Emergency button. Press to send alert to your contacts.")}
          >
            <Phone className="h-8 w-8" />
            <span>SOS Alert</span>
          </Button>
          <p className="text-center text-gray-600 mt-3">
            Emergency alert to your trusted contacts
          </p>
        </Card>
      </div>

      {/* Status Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Stick connected • Voice {isVoiceEnabled ? 'ON' : 'OFF'}
        </p>
      </div>
    </div>
  );
}