import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';

const WaterTracker = ({ currentGlasses, onUpdate }) => {
  const totalGlasses = 8;
  const percentage = (currentGlasses / totalGlasses) * 100;

  const handleGlassClick = (glassIndex) => {
    const newCount = glassIndex + 1;
    onUpdate(newCount);
    
    if (newCount > currentGlasses) {
      toast.success('💧 Great job staying hydrated!');
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display font-bold text-gray-800">
          Water Intake
        </h3>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Droplets" size={20} className="text-secondary" />
          <span className="text-lg font-bold text-accent">
            {currentGlasses}/{totalGlasses}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Daily Goal Progress</span>
          <span className="text-sm font-medium text-accent">
            {Math.round(percentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-secondary to-success h-3 rounded-full"
          />
        </div>
      </div>

      {/* Water Glasses */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: totalGlasses }, (_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleGlassClick(index)}
            className="relative h-16 w-16 mx-auto"
          >
            <div className="w-full h-full border-2 border-secondary rounded-lg relative overflow-hidden bg-surface">
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: index < currentGlasses ? '100%' : '0%'
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary to-info"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ApperIcon 
                  name="Cup" 
                  size={20} 
                  className={index < currentGlasses ? 'text-white' : 'text-secondary'} 
                />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-surface/50 rounded-xl">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Lightbulb" size={20} className="text-warning mt-1" />
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Hydration Tip</h4>
            <p className="text-sm text-gray-600">
              Drink water consistently throughout the day for better skin hydration and overall health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;