import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ title, streak }) => {
  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-display font-bold text-gray-800">
              {title}
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              streak >= 7 ? 'bg-gradient-to-r from-accent to-primary streak-glow' : 'bg-surface'
            } border border-primary/20`}>
              <ApperIcon name="Flame" size={16} className="text-accent" />
              <span className="text-sm font-medium text-gray-700">
                {streak} days
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;