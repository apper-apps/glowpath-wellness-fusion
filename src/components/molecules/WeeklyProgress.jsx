import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ApperIcon from '@/components/ApperIcon';
import { healthService } from '@/services/api/healthService';

const WeeklyProgress = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeeklyData = async () => {
      try {
        const data = await healthService.getWeeklyProgress();
        setWeeklyData(data);
      } catch (err) {
        console.error('Failed to load weekly progress:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWeeklyData();
  }, []);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-xl font-display font-bold text-gray-800 mb-6">
        Weekly Progress
      </h3>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {daysOfWeek.map((day, index) => {
          const dayData = weeklyData[index] || { waterGoal: false, exerciseComplete: false, mealsBalanced: false };
          const isToday = index === today;
          const completedTasks = [
            dayData.waterGoal,
            dayData.exerciseComplete,
            dayData.mealsBalanced
          ].filter(Boolean).length;

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-3 rounded-xl text-center ${
                isToday
                  ? 'bg-gradient-to-br from-accent to-primary text-white'
                  : completedTasks === 3
                  ? 'bg-gradient-to-br from-success to-info text-white'
                  : completedTasks > 0
                  ? 'bg-gradient-to-br from-warning to-success text-white'
                  : 'bg-surface border border-gray-200 text-gray-600'
              }`}
            >
              <div className="text-xs font-medium mb-1">{day}</div>
              <div className="text-lg font-bold mb-1">{index + 1}</div>
              <div className="flex justify-center space-x-1">
                {[dayData.waterGoal, dayData.exerciseComplete, dayData.mealsBalanced].map((completed, taskIndex) => (
                  <div
                    key={taskIndex}
                    className={`w-1.5 h-1.5 rounded-full ${
                      completed
                        ? 'bg-white'
                        : isToday || completedTasks > 0
                        ? 'bg-white/40'
                        : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-2">
            <ApperIcon name="Droplets" size={16} className="text-secondary" />
            <span className="text-sm text-gray-600">Water</span>
          </div>
          <div className="text-xl font-bold text-secondary">
            {weeklyData.filter(d => d?.waterGoal).length}/7
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-2">
            <ApperIcon name="Dumbbell" size={16} className="text-accent" />
            <span className="text-sm text-gray-600">Exercise</span>
          </div>
          <div className="text-xl font-bold text-accent">
            {weeklyData.filter(d => d?.exerciseComplete).length}/7
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-2">
            <ApperIcon name="Apple" size={16} className="text-success" />
            <span className="text-sm text-gray-600">Meals</span>
          </div>
          <div className="text-xl font-bold text-success">
            {weeklyData.filter(d => d?.mealsBalanced).length}/7
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgress;