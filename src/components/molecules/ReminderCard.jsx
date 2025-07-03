import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Toggle from '@/components/atoms/Toggle';

const ReminderCard = ({ reminder, onToggle, onTimeUpdate }) => {
  const getReminderIcon = (type) => {
    switch (type) {
      case 'water':
        return 'Droplets';
      case 'exercise':
        return 'Dumbbell';
      case 'skincare':
        return 'Sparkles';
      default:
        return 'Bell';
    }
  };

  const getReminderColor = (type) => {
    switch (type) {
      case 'water':
        return 'text-secondary';
      case 'exercise':
        return 'text-accent';
      case 'skincare':
        return 'text-primary';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
            reminder.type === 'water' ? 'from-secondary to-info' :
            reminder.type === 'exercise' ? 'from-accent to-primary' :
            'from-primary to-accent'
          } flex items-center justify-center`}>
            <ApperIcon 
              name={getReminderIcon(reminder.type)} 
              size={20} 
              className="text-white" 
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 capitalize">
              {reminder.type} Reminder
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {reminder.message}
            </p>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Clock" size={14} className="text-gray-500" />
              <input
                type="time"
                value={reminder.time}
                onChange={(e) => onTimeUpdate(reminder.Id, e.target.value)}
                className="text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                disabled={!reminder.enabled}
              />
            </div>
          </div>
        </div>
        
        <Toggle
          checked={reminder.enabled}
          onChange={(enabled) => onToggle(reminder.Id, enabled)}
        />
      </div>
    </motion.div>
  );
};

export default ReminderCard;