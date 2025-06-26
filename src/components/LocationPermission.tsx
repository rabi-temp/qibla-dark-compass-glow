
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationPermissionProps {
  onRequestLocation: () => void;
  error?: string;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({ onRequestLocation, error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="prayer-card rounded-2xl p-8">
          <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-yellow-400" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4 gold-gradient">
            Find Qibla Direction
          </h1>
          
          <p className="text-blue-200 mb-6 leading-relaxed">
            To show you the accurate Qibla direction and prayer times, we need access to your location.
          </p>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}
          
          <Button 
            onClick={onRequestLocation}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Enable Location
          </Button>
          
          <p className="text-xs text-blue-300/70 mt-4">
            Your location data stays private and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationPermission;
