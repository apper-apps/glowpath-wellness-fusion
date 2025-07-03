class ExerciseService {
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "duration" } },
          { field: { Name: "image_url" } },
          { field: { Name: "steps" } },
          { field: { Name: "benefits" } }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('exercise', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Transform data to match UI expectations
      const transformedData = response.data.map(item => ({
        Id: item.Id,
        title: item.title,
        description: item.description,
        duration: item.duration,
        imageUrl: item.image_url,
        steps: typeof item.steps === 'string' ? item.steps.split('\n') : [],
        benefits: typeof item.benefits === 'string' ? item.benefits.split('\n') : []
      }));
      
      return transformedData;
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "duration" } },
          { field: { Name: "image_url" } },
          { field: { Name: "steps" } },
          { field: { Name: "benefits" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('exercise', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      const item = response.data;
      return {
        Id: item.Id,
        title: item.title,
        description: item.description,
        duration: item.duration,
        imageUrl: item.image_url,
        steps: typeof item.steps === 'string' ? item.steps.split('\n') : [],
        benefits: typeof item.benefits === 'string' ? item.benefits.split('\n') : []
      };
    } catch (error) {
      console.error(`Error fetching exercise with ID ${id}:`, error);
      throw error;
    }
  }

  async create(exercise) {
    try {
      const params = {
        records: [{
          Name: exercise.title,
          title: exercise.title,
          description: exercise.description,
          duration: exercise.duration,
          image_url: exercise.imageUrl,
          steps: Array.isArray(exercise.steps) ? exercise.steps.join('\n') : exercise.steps,
          benefits: Array.isArray(exercise.benefits) ? exercise.benefits.join('\n') : exercise.benefits
        }]
      };
      
      const response = await this.apperClient.createRecord('exercise', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error("Error creating exercise:", error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const updateData = {
        Id: id
      };
      
      // Only include updateable fields
      if (data.title !== undefined) updateData.title = data.title;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.duration !== undefined) updateData.duration = data.duration;
      if (data.imageUrl !== undefined) updateData.image_url = data.imageUrl;
      if (data.steps !== undefined) updateData.steps = Array.isArray(data.steps) ? data.steps.join('\n') : data.steps;
      if (data.benefits !== undefined) updateData.benefits = Array.isArray(data.benefits) ? data.benefits.join('\n') : data.benefits;
      
      const params = {
        records: [updateData]
      };
      
      const response = await this.apperClient.updateRecord('exercise', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error("Error updating exercise:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };
      
      const response = await this.apperClient.deleteRecord('exercise', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting exercise:", error);
      throw error;
    }
  }
}

export const exerciseService = new ExerciseService();