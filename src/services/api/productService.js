import productData from '@/services/mockData/products.json';

class ProductService {
  constructor() {
    this.products = [...productData];
  }

  async getAll() {
    await this.delay();
    return [...this.products];
  }

  async getById(id) {
    await this.delay();
    const product = this.products.find(p => p.Id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  }

  async getByCategory(category) {
    await this.delay();
    return this.products.filter(p => p.category === category);
  }

  async create(product) {
    await this.delay();
    const newProduct = {
      ...product,
      Id: Math.max(...this.products.map(p => p.Id)) + 1
    };
    this.products.push(newProduct);
    return { ...newProduct };
  }

  async update(id, data) {
    await this.delay();
    const index = this.products.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products[index] = { ...this.products[index], ...data };
    return { ...this.products[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.products.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 250));
  }
}

export const productService = new ProductService();