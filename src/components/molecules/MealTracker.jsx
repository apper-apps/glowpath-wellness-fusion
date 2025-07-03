import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const MealTracker = ({ healthyMeals, unhealthyMeals, onUpdate }) => {
  const totalMeals = healthyMeals + unhealthyMeals;
  const healthyPercentage = totalMeals > 0 ? (healthyMeals / totalMeals) * 100 : 0;

  const handleMealUpdate = (type, increment) => {
    const currentCount = type === 'healthyMeals' ? healthyMeals : unhealthyMeals;
    const newCount = Math.max(0, currentCount + increment);
    onUpdate(type, newCount);
    
    if (increment > 0) {
      const message = type === 'healthyMeals' 
        ? '🥗 Great healthy choice!' 
        : '🍔 Tracked - balance it out with healthy options!';
      toast.success(message);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display font-bold text-gray-800">
          Meal Tracking
        </h3>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Utensils" size={20} className="text-success" />
          <span className="text-lg font-bold text-accent">
            {totalMeals} meals
          </span>
        </div>
      </div>

      {/* Healthy vs Unhealthy Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Healthy Choices</span>
          <span className="text-sm font-medium text-success">
            {Math.round(healthyPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${healthyPercentage}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-success to-info h-3 rounded-full"
          />
        </div>
      </div>

      {/* Meal Counters */}
      <div className="space-y-4">
        {/* Healthy Meals */}
        <div className="neumorphic-button rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-success to-info rounded-full flex items-center justify-center">
                <ApperIcon name="Apple" size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Healthy Meals</h4>
                <p className="text-sm text-gray-600">Nutritious choices</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleMealUpdate('healthyMeals', -1)}
                disabled={healthyMeals === 0}
              >
                <ApperIcon name="Minus" size={16} />
              </Button>
              <span className="text-2xl font-bold text-success w-8 text-center">
                {healthyMeals}
              </span>
              <Button
                size="sm"
                onClick={() => handleMealUpdate('healthyMeals', 1)}
                className="btn-glow"
              >
                <ApperIcon name="Plus" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Unhealthy Meals */}
        <div className="neumorphic-button rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-warning to-error rounded-full flex items-center justify-center">
                <ApperIcon name="Cookie" size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Treat Meals</h4>
                <p className="text-sm text-gray-600">Indulgent choices</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleMealUpdate('unhealthyMeals', -1)}
                disabled={unhealthyMeals === 0}
              >
                <ApperIcon name="Minus" size={16} />
              </Button>
              <span className="text-2xl font-bold text-warning w-8 text-center">
                {unhealthyMeals}
              </span>
              <Button
                size="sm"
                onClick={() => handleMealUpdate('unhealthyMeals', 1)}
                className="btn-glow"
              >
                <ApperIcon name="Plus" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Goal */}
      <div className="mt-6 p-4 bg-surface/50 rounded-xl">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Target" size={20} className="text-accent mt-1" />
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Daily Goal</h4>
            <p className="text-sm text-gray-600">
              Aim for at least 70% healthy meals to support your skin wellness journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealTracker;