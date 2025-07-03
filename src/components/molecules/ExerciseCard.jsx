import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ExerciseCard = ({ exercise }) => {
  const navigate = useNavigate();

  const handleStartExercise = () => {
    navigate(`/exercises/${exercise.Id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="glass-card rounded-2xl p-6 group cursor-pointer"
      onClick={handleStartExercise}
    >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={exercise.imageUrl}
          alt={exercise.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm rounded-full px-3 py-1">
          <div className="flex items-center space-x-1">
            <ApperIcon name="Clock" size={14} className="text-accent" />
            <span className="text-sm font-medium text-gray-700">
              {exercise.duration}min
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-display font-bold text-gray-800 group-hover:text-accent transition-colors">
          {exercise.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {exercise.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ApperIcon name="List" size={14} />
              <span>{exercise.steps?.length || 0} steps</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Star" size={14} />
              <span>4.8</span>
            </div>
          </div>
          
          <Button
            size="sm"
            className="btn-glow"
            onClick={(e) => {
              e.stopPropagation();
              handleStartExercise();
            }}
          >
            <ApperIcon name="Play" size={16} />
            Start
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseCard;