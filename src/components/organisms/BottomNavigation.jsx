import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const BottomNavigation = () => {
  const navItems = [
    { path: '/exercises', icon: 'Dumbbell', label: 'Exercises' },
    { path: '/products', icon: 'ShoppingBag', label: 'Products' },
    { path: '/track', icon: 'Activity', label: 'Track' },
    { path: '/reminders', icon: 'Bell', label: 'Reminders' },
    { path: '/profile', icon: 'User', label: 'Profile' },
  ];

  return (
    <nav className="glass-nav fixed bottom-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-accent'
                    : 'text-gray-500 hover:text-accent'
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <ApperIcon name={item.icon} size={20} />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;