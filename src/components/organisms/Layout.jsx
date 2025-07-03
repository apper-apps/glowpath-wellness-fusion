import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import BottomNavigation from '@/components/organisms/BottomNavigation';

const Layout = ({ children }) => {
  const location = useLocation();
  const [userStreak, setUserStreak] = useState(7);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
      case '/exercises':
        return 'Morning Glow';
      case '/products':
        return 'Skincare Shop';
      case '/track':
        return 'Wellness Tracker';
      case '/reminders':
        return 'Smart Reminders';
      case '/profile':
        return 'Your Profile';
      default:
        if (location.pathname.startsWith('/exercises/')) {
          return 'Exercise Guide';
        }
        return 'GlowPath';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title={getPageTitle()} streak={userStreak} />
      
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Layout;