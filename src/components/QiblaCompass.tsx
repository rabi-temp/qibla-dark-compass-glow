
import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

interface QiblaCompassProps {
  qiblaDirection: number;
  currentDirection: number;
}

const QiblaCompass: React.FC<QiblaCompassProps> = ({ qiblaDirection, currentDirection }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Smooth rotation animation
    const targetRotation = qiblaDirection - currentDirection;
    setRotation(targetRotation);
  }, [qiblaDirection, currentDirection]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer compass ring */}
      <div className="relative w-80 h-80 rounded-full border-4 border-yellow-400/30 compass-glow animate-pulse-glow">
        {/* Compass markings */}
        <div className="absolute inset-0 rounded-full">
          {[...Array(36)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-6 bg-yellow-400/50"
              style={{
                top: '4px',
                left: '50%',
                transformOrigin: '50% 156px',
                transform: `translateX(-50%) rotate(${i * 10}deg)`,
              }}
            />
          ))}
          
          {/* Cardinal directions */}
          {['N', 'E', 'S', 'W'].map((direction, i) => (
            <div
              key={direction}
              className="absolute text-yellow-400 font-bold text-lg"
              style={{
                top: i === 0 ? '8px' : i === 2 ? 'calc(100% - 32px)' : '50%',
                left: i === 1 ? 'calc(100% - 24px)' : i === 3 ? '8px' : '50%',
                transform: i % 2 === 0 ? 'translateX(-50%)' : 'translateY(-50%)',
              }}
            >
              {direction}
            </div>
          ))}
        </div>

        {/* Inner compass circle */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-800/50 to-blue-900/80 backdrop-blur-sm border border-blue-400/20">
          {/* Rotating compass needle */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Qibla indicator (pointing to Kaaba) */}
            <div className="absolute top-4 w-3 h-3 bg-yellow-400 rounded-full shadow-lg animate-pulse-glow" />
            
            {/* Compass needle */}
            <div className="w-1 h-32 bg-gradient-to-t from-red-500 to-yellow-400 rounded-full shadow-lg" />
            
            {/* Center dot */}
            <div className="absolute w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-lg" />
          </div>

          {/* Kaaba icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-800 rounded border border-yellow-400/50 flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Direction text */}
      <div className="absolute bottom-4 text-center">
        <p className="text-yellow-400 font-semibold text-lg">
          Qibla Direction
        </p>
        <p className="text-white/80 text-sm">
          {Math.round(qiblaDirection)}° from North
        </p>
      </div>
    </div>
  );
};

export default QiblaCompass;
