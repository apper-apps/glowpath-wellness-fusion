import { motion } from 'framer-motion';
import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const StreakCounter = () => {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [bestStreak, setBestStreak] = useState(14);

  const streakMilestones = [
    { days: 3, reward: 'Early Bird', icon: 'Sunrise' },
    { days: 7, reward: 'Weekly Warrior', icon: 'Award' },
    { days: 14, reward: 'Consistency Champion', icon: 'Trophy' },
    { days: 30, reward: 'Glow Master', icon: 'Crown' },
  ];

  const nextMilestone = streakMilestones.find(m => m.days > currentStreak);
  const currentMilestone = streakMilestones.filter(m => m.days <= currentStreak).pop();

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-display font-bold text-gray-800 mb-2">
          Daily Streak
        </h3>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative"
        >
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${
            currentStreak >= 7 ? 'bg-gradient-to-br from-accent to-primary streak-glow' : 'bg-gradient-to-br from-gray-400 to-gray-500'
          }`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {currentStreak}
              </div>
              <div className="text-xs text-white/90">
                {currentStreak === 1 ? 'day' : 'days'}
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-warning rounded-full flex items-center justify-center"
          >
            <ApperIcon name="Flame" size={16} className="text-white" />
          </motion.div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {currentStreak}
          </div>
          <div className="text-sm text-gray-600">Current</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">
            {bestStreak}
          </div>
          <div className="text-sm text-gray-600">Best</div>
        </div>
      </div>

      {/* Current Achievement */}
      {currentMilestone && (
        <div className="mb-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl border border-accent/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <ApperIcon name={currentMilestone.icon} size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                🎉 {currentMilestone.reward}
              </h4>
              <p className="text-sm text-gray-600">
                {currentMilestone.days} days completed!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next Milestone */}
      {nextMilestone && (
        <div className="p-4 bg-surface/50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Next Milestone</span>
            <span className="text-sm font-medium text-accent">
              {nextMilestone.days - currentStreak} days to go
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStreak / nextMilestone.days) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-accent to-primary h-2 rounded-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name={nextMilestone.icon} size={16} className="text-accent" />
            <span className="text-sm font-medium text-gray-800">
              {nextMilestone.reward}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakCounter;