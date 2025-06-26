
import React from 'react';

interface PrayerTime {
  name: string;
  time: string;
  arabic: string;
}

interface PrayerTimesProps {
  prayerTimes: PrayerTime[];
  nextPrayer: string;
}

const PrayerTimes: React.FC<PrayerTimesProps> = ({ prayerTimes, nextPrayer }) => {
  return (
    <div className="w-full max-w-md">
      <div className="prayer-card rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-center mb-2 gold-gradient">
          Prayer Times
        </h2>
        <p className="text-center text-blue-200 mb-4">
          Next: <span className="text-yellow-400 font-semibold">{nextPrayer}</span>
        </p>
        
        <div className="space-y-3">
          {prayerTimes.map((prayer, index) => (
            <div
              key={prayer.name}
              className={`flex justify-between items-center p-3 rounded-lg transition-all duration-300 ${
                prayer.name === nextPrayer
                  ? 'bg-yellow-400/20 border border-yellow-400/50 shadow-lg'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-white font-semibold">{prayer.name}</span>
                <span className="text-blue-200 text-sm">{prayer.arabic}</span>
              </div>
              <span className={`font-bold text-lg ${
                prayer.name === nextPrayer ? 'text-yellow-400' : 'text-blue-200'
              }`}>
                {prayer.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Islamic pattern decoration */}
      <div className="flex justify-center">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full" />
      </div>
    </div>
  );
};

export default PrayerTimes;
