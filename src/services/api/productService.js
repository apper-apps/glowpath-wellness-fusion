class ProductService {
  constructor() {
    this.apperClient = null;
    this.initApperClient();
  }

  initApperClient() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "rating" } },
          { field: { Name: "image_url" } },
          { field: { Name: "shop_url" } },
          { field: { Name: "category" } }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('product', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Transform data to match UI expectations
      const transformedData = response.data.map(item => ({
        Id: item.Id,
        name: item.Name,
        brand: item.brand,
        price: item.price,
        rating: item.rating,
        imageUrl: item.image_url,
        shopUrl: item.shop_url,
        category: item.category
      }));
      
      return transformedData;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "rating" } },
          { field: { Name: "image_url" } },
          { field: { Name: "shop_url" } },
          { field: { Name: "category" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('product', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      const item = response.data;
      return {
        Id: item.Id,
        name: item.Name,
        brand: item.brand,
        price: item.price,
        rating: item.rating,
        imageUrl: item.image_url,
        shopUrl: item.shop_url,
        category: item.category
      };
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  async getByCategory(category) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "rating" } },
          { field: { Name: "image_url" } },
          { field: { Name: "shop_url" } },
          { field: { Name: "category" } }
        ],
        where: [{
          FieldName: "category",
          Operator: "EqualTo",
          Values: [category]
        }]
      };
      
      const response = await this.apperClient.fetchRecords('product', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      const transformedData = response.data.map(item => ({
        Id: item.Id,
        name: item.Name,
        brand: item.brand,
        price: item.price,
        rating: item.rating,
        imageUrl: item.image_url,
        shopUrl: item.shop_url,
        category: item.category
      }));
      
      return transformedData;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  }

  async create(product) {
    try {
      const params = {
        records: [{
          Name: product.name,
          brand: product.brand,
          price: product.price,
          rating: product.rating,
          image_url: product.imageUrl,
          shop_url: product.shopUrl,
          category: product.category
        }]
      };
      
      const response = await this.apperClient.createRecord('product', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const updateData = {
        Id: id
      };
      
      // Only include updateable fields
      if (data.name !== undefined) updateData.Name = data.name;
      if (data.brand !== undefined) updateData.brand = data.brand;
      if (data.price !== undefined) updateData.price = data.price;
      if (data.rating !== undefined) updateData.rating = data.rating;
      if (data.imageUrl !== undefined) updateData.image_url = data.imageUrl;
      if (data.shopUrl !== undefined) updateData.shop_url = data.shopUrl;
      if (data.category !== undefined) updateData.category = data.category;
      
      const params = {
        records: [updateData]
      };
      
      const response = await this.apperClient.updateRecord('product', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };
      
      const response = await this.apperClient.deleteRecord('product', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

export const productService = new ProductService();