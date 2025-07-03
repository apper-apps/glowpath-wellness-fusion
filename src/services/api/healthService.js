import { format } from 'date-fns';

class HealthService {
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

  async getTodaysData() {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      const params = {
        fields: [
          { field: { Name: "date" } },
          { field: { Name: "water_glasses" } },
          { field: { Name: "healthy_meals" } },
          { field: { Name: "unhealthy_meals" } },
          { field: { Name: "exercises_completed" } }
        ],
        where: [{
          FieldName: "date",
          Operator: "EqualTo",
          Values: [today]
        }]
      };
      
      const response = await this.apperClient.fetchRecords('health_data', params);
      
      if (!response.success) {
        console.error(response.message);
        // Return default data if no record exists
        return {
          date: today,
          waterGlasses: 0,
          healthyMeals: 0,
          unhealthyMeals: 0,
          exercisesCompleted: []
        };
      }
      
      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        return {
          date: data.date,
          waterGlasses: data.water_glasses || 0,
          healthyMeals: data.healthy_meals || 0,
          unhealthyMeals: data.unhealthy_meals || 0,
          exercisesCompleted: data.exercises_completed ? data.exercises_completed.split(',') : []
        };
      }
      
      return {
        date: today,
        waterGlasses: 0,
        healthyMeals: 0,
        unhealthyMeals: 0,
        exercisesCompleted: []
      };
    } catch (error) {
      console.error("Error fetching today's health data:", error);
      throw error;
    }
  }

  async updateWaterIntake(glassCount) {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const todaysData = await this.getTodaysData();
      
      if (todaysData.date === today && todaysData.Id) {
        // Update existing record
        const params = {
          records: [{
            Id: todaysData.Id,
            water_glasses: glassCount
          }]
        };
        
        const response = await this.apperClient.updateRecord('health_data', params);
        
        if (!response.success) {
          console.error(response.message);
          throw new Error(response.message);
        }
      } else {
        // Create new record
        const params = {
          records: [{
            Name: `Health Data - ${today}`,
            date: today,
            water_glasses: glassCount,
            healthy_meals: 0,
            unhealthy_meals: 0,
            exercises_completed: ""
          }]
        };
        
        const response = await this.apperClient.createRecord('health_data', params);
        
        if (!response.success) {
          console.error(response.message);
          throw new Error(response.message);
        }
      }
      
      return await this.getTodaysData();
    } catch (error) {
      console.error("Error updating water intake:", error);
      throw error;
    }
  }

  async updateMealCount(type, count) {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const todaysData = await this.getTodaysData();
      
      const fieldName = type === 'healthyMeals' ? 'healthy_meals' : 'unhealthy_meals';
      
      if (todaysData.date === today && todaysData.Id) {
        // Update existing record
        const params = {
          records: [{
            Id: todaysData.Id,
            [fieldName]: count
          }]
        };
        
        const response = await this.apperClient.updateRecord('health_data', params);
        
        if (!response.success) {
          console.error(response.message);
          throw new Error(response.message);
        }
      } else {
        // Create new record
        const params = {
          records: [{
            Name: `Health Data - ${today}`,
            date: today,
            water_glasses: 0,
            healthy_meals: type === 'healthyMeals' ? count : 0,
            unhealthy_meals: type === 'unhealthyMeals' ? count : 0,
            exercises_completed: ""
          }]
        };
        
        const response = await this.apperClient.createRecord('health_data', params);
        
        if (!response.success) {
          console.error(response.message);
          throw new Error(response.message);
        }
      }
      
      return await this.getTodaysData();
    } catch (error) {
      console.error("Error updating meal count:", error);
      throw error;
    }
  }

  async completeExercise(exerciseId) {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const todaysData = await this.getTodaysData();
      
      let exercisesCompleted = todaysData.exercisesCompleted || [];
      if (!exercisesCompleted.includes(exerciseId.toString())) {
        exercisesCompleted.push(exerciseId.toString());
      }
      
      const exercisesString = exercisesCompleted.join(',');
      
      if (todaysData.date === today && todaysData.Id) {
        // Update existing record
        const params = {
          records: [{
            Id: todaysData.Id,
            exercises_completed: exercisesString
          }]
        };
        
        const response = await this.apperClient.updateRecord('health_data', params);
        
        if (!response.success) {
          console.error(response.message);
          throw new Error(response.message);
        }
      } else {
        // Create new record
        const params = {
          records: [{
            Name: `Health Data - ${today}`,
            date: today,
            water_glasses: 0,
            healthy_meals: 0,
            unhealthy_meals: 0,
            exercises_completed: exercisesString
          }]
        };
        
        const response = await this.apperClient.createRecord('health_data', params);
        
        if (!response.success) {
          console.error(response.message);
          throw new Error(response.message);
        }
      }
      
      return await this.getTodaysData();
    } catch (error) {
      console.error("Error completing exercise:", error);
      throw error;
    }
  }

  async getWeeklyProgress() {
    try {
      const weekData = [];
      const today = new Date();
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - i));
        const dateStr = format(date, 'yyyy-MM-dd');
        
        const params = {
          fields: [
            { field: { Name: "date" } },
            { field: { Name: "water_glasses" } },
            { field: { Name: "healthy_meals" } },
            { field: { Name: "unhealthy_meals" } },
            { field: { Name: "exercises_completed" } }
          ],
          where: [{
            FieldName: "date",
            Operator: "EqualTo",
            Values: [dateStr]
          }]
        };
        
        const response = await this.apperClient.fetchRecords('health_data', params);
        
        let dayData = null;
        if (response.success && response.data && response.data.length > 0) {
          dayData = response.data[0];
        }
        
        weekData.push({
          date: dateStr,
          waterGoal: dayData ? dayData.water_glasses >= 8 : false,
          exerciseComplete: dayData ? (dayData.exercises_completed && dayData.exercises_completed.length > 0) : false,
          mealsBalanced: dayData ? dayData.healthy_meals >= Math.max(1, dayData.unhealthy_meals) : false
        });
      }
      
      return weekData;
    } catch (error) {
      console.error("Error fetching weekly progress:", error);
      throw error;
    }
  }
}

export const healthService = new HealthService();