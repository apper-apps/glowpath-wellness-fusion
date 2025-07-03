import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ExerciseCard from '@/components/molecules/ExerciseCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { exerciseService } from '@/services/api/exerciseService';

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadExercises = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await exerciseService.getAll();
      setExercises(data || []);
    } catch (err) {
      console.error('Error loading exercises:', err);
      setError('Failed to load exercises. Please try again.');
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExercises();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadExercises} />;
  if (!exercises || exercises.length === 0) return <Empty message="No exercises available" />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
          Your Daily Glow Routine
        </h2>
        <p className="text-gray-600 text-lg">
          Start your day with facial exercises for healthier, more radiant skin
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise, index) => (
          <motion.div
            key={exercise.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ExerciseCard exercise={exercise} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExercisesPage;