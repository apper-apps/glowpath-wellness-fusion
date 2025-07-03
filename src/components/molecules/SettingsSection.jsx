import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Toggle from '@/components/atoms/Toggle';

const SettingsSection = ({ notifications, darkMode, onSettingChange }) => {
  const settings = [
    {
      id: 'notifications',
      label: 'Push Notifications',
      description: 'Receive reminders for water, exercises, and skincare',
      icon: 'Bell',
      value: notifications,
      color: 'text-info'
    },
    {
      id: 'darkMode',
      label: 'Dark Mode',
      description: 'Switch to dark theme for better evening use',
      icon: 'Moon',
      value: darkMode,
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-xl font-display font-bold text-gray-800 mb-6">
        Settings
      </h3>
      
      <div className="space-y-4">
        {settings.map((setting, index) => (
          <motion.div
            key={setting.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-surface/50 rounded-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <ApperIcon name={setting.icon} size={20} className={setting.color} />
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800">
                  {setting.label}
                </h4>
                <p className="text-sm text-gray-600">
                  {setting.description}
                </p>
              </div>
            </div>
            
            <Toggle
              checked={setting.value}
              onChange={(value) => onSettingChange(setting.id, value)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SettingsSection;