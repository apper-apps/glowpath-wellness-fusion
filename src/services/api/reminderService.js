class ReminderService {
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
          { field: { Name: "type" } },
          { field: { Name: "time" } },
          { field: { Name: "enabled" } },
          { field: { Name: "message" } }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('reminder', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Transform data to match UI expectations
      const transformedData = response.data.map(item => ({
        Id: item.Id,
        type: item.type,
        time: item.time,
        enabled: item.enabled,
        message: item.message
      }));
      
      return transformedData;
    } catch (error) {
      console.error("Error fetching reminders:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "time" } },
          { field: { Name: "enabled" } },
          { field: { Name: "message" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('reminder', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      const item = response.data;
      return {
        Id: item.Id,
        type: item.type,
        time: item.time,
        enabled: item.enabled,
        message: item.message
      };
    } catch (error) {
      console.error(`Error fetching reminder with ID ${id}:`, error);
      throw error;
    }
  }

  async create(reminder) {
    try {
      const params = {
        records: [{
          Name: `${reminder.type} reminder - ${reminder.time}`,
          type: reminder.type,
          time: reminder.time,
          enabled: reminder.enabled,
          message: reminder.message
        }]
      };
      
      const response = await this.apperClient.createRecord('reminder', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error("Error creating reminder:", error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const updateData = {
        Id: id
      };
      
      // Only include updateable fields
      if (data.type !== undefined) updateData.type = data.type;
      if (data.time !== undefined) updateData.time = data.time;
      if (data.enabled !== undefined) updateData.enabled = data.enabled;
      if (data.message !== undefined) updateData.message = data.message;
      
      const params = {
        records: [updateData]
      };
      
      const response = await this.apperClient.updateRecord('reminder', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error("Error updating reminder:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };
      
      const response = await this.apperClient.deleteRecord('reminder', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting reminder:", error);
      throw error;
    }
  }
}

export const reminderService = new ReminderService();