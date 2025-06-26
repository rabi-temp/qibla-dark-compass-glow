
export const calculateQiblaDirection = (latitude: number, longitude: number): number => {
  // Kaaba coordinates
  const kaabaLat = 21.4225; // Mecca latitude
  const kaabaLng = 39.8262; // Mecca longitude

  const lat1 = latitude * (Math.PI / 180);
  const lat2 = kaabaLat * (Math.PI / 180);
  const deltaLng = (kaabaLng - longitude) * (Math.PI / 180);

  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

  let bearing = Math.atan2(y, x) * (180 / Math.PI);
  return (bearing + 360) % 360;
};

export const getCurrentTime = (): string => {
  return new Date().toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getMockPrayerTimes = () => {
  const now = new Date();
  const formatTime = (hours: number, minutes: number) => {
    const time = new Date();
    time.setHours(hours, minutes, 0, 0);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return [
    { name: 'Fajr', time: formatTime(5, 30), arabic: 'الفجر' },
    { name: 'Sunrise', time: formatTime(6, 45), arabic: 'الشروق' },
    { name: 'Dhuhr', time: formatTime(12, 15), arabic: 'الظهر' },
    { name: 'Asr', time: formatTime(15, 30), arabic: 'العصر' },
    { name: 'Maghrib', time: formatTime(18, 45), arabic: 'المغرب' },
    { name: 'Isha', time: formatTime(20, 15), arabic: 'العشاء' },
  ];
};

export const getNextPrayer = (prayerTimes: Array<{ name: string; time: string; arabic: string }>): string => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  for (const prayer of prayerTimes) {
    const [time, period] = prayer.time.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const prayerMinutes = (period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours) * 60 + minutes;
    
    if (prayerMinutes > currentTime) {
      return prayer.name;
    }
  }
  
  return prayerTimes[0].name; // Next day's first prayer
};
