import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto shimmer"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-96 mx-auto shimmer"></div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 space-y-4"
          >
            <div className="h-48 bg-gray-200 rounded-xl shimmer"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4 shimmer"></div>
              <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 shimmer"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-16 shimmer"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;