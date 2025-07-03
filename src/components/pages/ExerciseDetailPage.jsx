import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { exerciseService } from '@/services/api/exerciseService';
import { healthService } from '@/services/api/healthService';

const ExerciseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const loadExercise = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await exerciseService.getById(parseInt(id));
      setExercise(data);
      setTimeRemaining(data.duration * 60);
    } catch (err) {
      setError('Failed to load exercise details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExercise();
  }, [id]);

  useEffect(() => {
    let timer;
    if (isStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsCompleted(true);
            setIsStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, timeRemaining]);

  const handleStart = () => {
    setIsStarted(true);
    setCurrentStep(0);
    toast.success('Exercise started! Follow the steps below.');
  };

  const handleNextStep = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await healthService.completeExercise(exercise.Id);
      toast.success('🎉 Exercise completed! Great job!');
      navigate('/exercises');
    } catch (err) {
      toast.error('Failed to save exercise completion.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadExercise} />;
  if (!exercise) return <Error message="Exercise not found" onRetry={() => navigate('/exercises')} />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <Button
          variant="secondary"
          onClick={() => navigate('/exercises')}
          className="absolute top-0 left-0 z-10"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          Back
        </Button>
        
        <div className="glass-card rounded-2xl p-6 text-center">
          <img
            src={exercise.imageUrl}
            alt={exercise.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">
            {exercise.title}
          </h1>
          
          <p className="text-gray-600 text-lg mb-6">
            {exercise.description}
          </p>

          <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Clock" size={20} className="text-accent" />
              <span className="text-gray-700">{exercise.duration} mins</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="List" size={20} className="text-accent" />
              <span className="text-gray-700">{exercise.steps.length} steps</span>
            </div>
          </div>

          {!isStarted && !isCompleted && (
            <Button onClick={handleStart} className="btn-glow">
              <ApperIcon name="Play" size={20} />
              Start Exercise
            </Button>
          )}

          {isStarted && (
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-accent mb-2">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-gray-600">Time Remaining</div>
            </div>
          )}

          {isCompleted && (
            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-display font-bold text-accent mb-4">
                Exercise Completed!
              </h3>
              <Button onClick={handleComplete} className="btn-glow">
                <ApperIcon name="Check" size={20} />
                Mark as Complete
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Exercise Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">
          Exercise Steps
        </h2>

        <div className="space-y-4">
          {exercise.steps.map((step, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                isStarted && index === currentStep
                  ? 'border-accent bg-accent/10 shadow-lg'
                  : isStarted && index < currentStep
                  ? 'border-success bg-success/10'
                  : 'border-gray-200 bg-surface'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  isStarted && index === currentStep
                    ? 'bg-accent'
                    : isStarted && index < currentStep
                    ? 'bg-success'
                    : 'bg-gray-400'
                }`}>
                  {isStarted && index < currentStep ? (
                    <ApperIcon name="Check" size={16} />
                  ) : (
                    index + 1
                  )}
                </div>
                <p className="text-gray-700 flex-1">{step}</p>
              </div>
            </div>
          ))}
        </div>

        {isStarted && (
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              variant="secondary"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            >
              <ApperIcon name="ChevronLeft" size={16} />
              Previous
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={currentStep === exercise.steps.length - 1}
            >
              Next
              <ApperIcon name="ChevronRight" size={16} />
            </Button>
          </div>
        )}
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">
          Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercise.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <ApperIcon name="Sparkles" size={20} className="text-accent mt-1" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExerciseDetailPage;