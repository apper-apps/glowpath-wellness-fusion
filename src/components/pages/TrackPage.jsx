import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import WaterTracker from '@/components/molecules/WaterTracker';
import MealTracker from '@/components/molecules/MealTracker';
import StreakCounter from '@/components/molecules/StreakCounter';
import WeeklyProgress from '@/components/molecules/WeeklyProgress';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { healthService } from '@/services/api/healthService';

const TrackPage = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTodaysData = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await healthService.getTodaysData();
      setHealthData(data);
    } catch (err) {
      setError('Failed to load tracking data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodaysData();
  }, []);

  const handleWaterUpdate = async (glassCount) => {
    try {
      await healthService.updateWaterIntake(glassCount);
      setHealthData(prev => ({
        ...prev,
        waterGlasses: glassCount
      }));
      
      if (glassCount === 8) {
        toast.success('🎉 Daily water goal achieved!');
      }
    } catch (err) {
      toast.error('Failed to update water intake.');
    }
  };

  const handleMealUpdate = async (type, count) => {
    try {
      await healthService.updateMealCount(type, count);
      setHealthData(prev => ({
        ...prev,
        [type]: count
      }));
      
      if (type === 'healthyMeals' && count >= 5) {
        toast.success('🥗 Excellent healthy eating today!');
      }
    } catch (err) {
      toast.error('Failed to update meal tracking.');
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTodaysData} />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
          Your Wellness Journey
        </h2>
        <p className="text-gray-600 text-lg">
          Track your daily habits for healthier, glowing skin
        </p>
      </motion.div>

      {/* Daily Streak */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <StreakCounter />
      </motion.div>

      {/* Tracking Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <WaterTracker
            currentGlasses={healthData?.waterGlasses || 0}
            onUpdate={handleWaterUpdate}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MealTracker
            healthyMeals={healthData?.healthyMeals || 0}
            unhealthyMeals={healthData?.unhealthyMeals || 0}
            onUpdate={handleMealUpdate}
          />
        </motion.div>
      </div>

      {/* Weekly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <WeeklyProgress />
      </motion.div>
    </div>
  );
};

export default TrackPage;