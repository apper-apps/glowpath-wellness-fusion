import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ProductCard = ({ product }) => {
  const handleShopNow = () => {
    window.open(product.shopUrl, '_blank');
    toast.success('Redirecting to product page...');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <ApperIcon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <ApperIcon key="half" name="Star" size={14} className="text-warning fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <ApperIcon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="glass-card rounded-2xl p-6 group"
    >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-medium text-gray-700 capitalize">
            {product.category}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-display font-bold text-gray-800 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            {product.brand}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600 ml-1">
              ({product.rating})
            </span>
          </div>
          <div className="text-lg font-bold text-accent">
            ${product.price}
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => toast.info('Added to wishlist!')}
          >
            <ApperIcon name="Heart" size={16} />
            Save
          </Button>
          <Button
            size="sm"
            className="flex-1 btn-glow"
            onClick={handleShopNow}
          >
            <ApperIcon name="ShoppingCart" size={16} />
            Shop
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;