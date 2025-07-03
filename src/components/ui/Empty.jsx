import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Empty = ({ 
  message = 'No items found', 
  description = 'Try adjusting your filters or check back later',
  actionLabel = 'Refresh',
  onAction,
  icon = 'Search'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[400px] text-center"
    >
      <div className="glass-card rounded-2xl p-8 max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} size={32} className="text-white" />
        </div>
        
        <h3 className="text-xl font-display font-bold text-gray-800 mb-4">
          {message}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        {onAction && (
          <Button onClick={onAction} className="btn-glow">
            <ApperIcon name="RefreshCw" size={16} />
            {actionLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;