import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/molecules/ProductCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { productService } from '@/services/api/productService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cleanser', name: 'Cleansers' },
    { id: 'moisturizer', name: 'Moisturizers' },
    { id: 'serum', name: 'Serums' },
    { id: 'sunscreen', name: 'Sunscreens' },
    { id: 'treatment', name: 'Treatments' },
  ];

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productService.getAll();
      setProducts(data || []);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product?.category === selectedCategory);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProducts} />;
  if (!products || products.length === 0) return <Empty message="No products available" />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
          Curated Skincare Collection
        </h2>
        <p className="text-gray-600 text-lg">
          Discover top-rated products for your skincare routine
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card rounded-2xl p-4"
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-accent to-primary text-white shadow-lg'
                  : 'bg-surface text-gray-600 hover:bg-primary/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </motion.div>

      {filteredProducts.length === 0 ? (
        <Empty message={`No products found in ${categories.find(c => c.id === selectedCategory)?.name}`} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;