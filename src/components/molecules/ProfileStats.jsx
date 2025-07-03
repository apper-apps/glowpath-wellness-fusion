import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ProfileStats = ({ streak, totalExercises, favoriteProducts }) => {
  const stats = [
    {
      icon: 'Flame',
      label: 'Current Streak',
      value: streak,
      unit: 'days',
      color: 'from-accent to-primary',
      bgColor: 'bg-accent/10',
      textColor: 'text-accent'
    },
    {
      icon: 'Dumbbell',
      label: 'Total Exercises',
      value: totalExercises,
      unit: 'completed',
      color: 'from-success to-info',
      bgColor: 'bg-success/10',
      textColor: 'text-success'
    },
    {
      icon: 'Heart',
      label: 'Favorite Products',
      value: favoriteProducts,
      unit: 'saved',
      color: 'from-primary to-secondary',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary'
    }
  ];

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-xl font-display font-bold text-gray-800 mb-6">
        Your Stats
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-xl p-4 text-center`}
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <ApperIcon name={stat.icon} size={24} className="text-white" />
            </div>
            
            <div className={`text-3xl font-bold ${stat.textColor} mb-1`}>
              {stat.value}
            </div>
            
            <div className="text-sm text-gray-600 mb-1">
              {stat.unit}
            </div>
            
            <div className="text-xs text-gray-500">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;