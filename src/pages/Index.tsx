
import React, { useState, useEffect } from 'react';
import QiblaCompass from '@/components/QiblaCompass';
import PrayerTimes from '@/components/PrayerTimes';
import LocationPermission from '@/components/LocationPermission';
import { useGeolocation } from '@/hooks/useGeolocation';
import { calculateQiblaDirection, getMockPrayerTimes, getNextPrayer, getCurrentTime } from '@/utils/qiblaCalculator';

const Index = () => {
  const { latitude, longitude, error, loading } = useGeolocation();
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [currentDirection, setCurrentDirection] = useState(0);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [requestLocation, setRequestLocation] = useState(false);

  const prayerTimes = getMockPrayerTimes();
  const nextPrayer = getNextPrayer(prayerTimes);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const direction = calculateQiblaDirection(latitude, longitude);
      setQiblaDirection(direction);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    // Simulate device orientation changes
    const handleOrientationChange = () => {
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
          if (event.alpha) {
            setCurrentDirection(event.alpha);
          }
        });
      }
    };

    handleOrientationChange();
  }, []);

  const handleRequestLocation = () => {
    setRequestLocation(true);
    // Trigger location request
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setRequestLocation(false),
        () => setRequestLocation(false)
      );
    }
  };

  if (loading && !requestLocation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-yellow-400 font-semibold">Finding your location...</p>
        </div>
      </div>
    );
  }

  if (error || (!latitude && !longitude && !loading)) {
    return (
      <LocationPermission 
        onRequestLocation={handleRequestLocation}
        error={error || undefined}
      />
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 gold-gradient">
            Qibla Compass
          </h1>
          <p className="text-blue-200">
            Current Time: <span className="text-yellow-400 font-semibold">{currentTime}</span>
          </p>
          {latitude && longitude && (
            <p className="text-blue-300 text-sm mt-1">
              Location: {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Qibla Compass */}
          <div className="flex-1 flex justify-center">
            <QiblaCompass 
              qiblaDirection={qiblaDirection} 
              currentDirection={currentDirection}
            />
          </div>

          {/* Prayer Times */}
          <div className="flex-1 flex justify-center">
            <PrayerTimes 
              prayerTimes={prayerTimes}
              nextPrayer={nextPrayer}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full mb-4">
            <div className="w-8 h-8 bg-gray-800 rounded border border-yellow-400/50 flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm" />
            </div>
          </div>
          <p className="text-blue-300 text-sm">
            "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth."
          </p>
          <p className="text-blue-400 text-xs mt-2">- Quran 6:73</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
