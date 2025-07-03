import { format } from 'date-fns';

class HealthService {
  constructor() {
    this.healthData = this.loadHealthData();
  }

  loadHealthData() {
    const stored = localStorage.getItem('glowpath-health-data');
    if (stored) {
      return JSON.parse(stored);
    }
    return {};
  }

  saveHealthData() {
    localStorage.setItem('glowpath-health-data', JSON.stringify(this.healthData));
  }

  async getTodaysData() {
    await this.delay();
    const today = format(new Date(), 'yyyy-MM-dd');
    return this.healthData[today] || {
      date: today,
      waterGlasses: 0,
      healthyMeals: 0,
      unhealthyMeals: 0,
      exercisesCompleted: []
    };
  }

  async updateWaterIntake(glassCount) {
    await this.delay();
    const today = format(new Date(), 'yyyy-MM-dd');
    if (!this.healthData[today]) {
      this.healthData[today] = {
        date: today,
        waterGlasses: 0,
        healthyMeals: 0,
        unhealthyMeals: 0,
        exercisesCompleted: []
      };
    }
    this.healthData[today].waterGlasses = glassCount;
    this.saveHealthData();
    return { ...this.healthData[today] };
  }

  async updateMealCount(type, count) {
    await this.delay();
    const today = format(new Date(), 'yyyy-MM-dd');
    if (!this.healthData[today]) {
      this.healthData[today] = {
        date: today,
        waterGlasses: 0,
        healthyMeals: 0,
        unhealthyMeals: 0,
        exercisesCompleted: []
      };
    }
    this.healthData[today][type] = count;
    this.saveHealthData();
    return { ...this.healthData[today] };
  }

  async completeExercise(exerciseId) {
    await this.delay();
    const today = format(new Date(), 'yyyy-MM-dd');
    if (!this.healthData[today]) {
      this.healthData[today] = {
        date: today,
        waterGlasses: 0,
        healthyMeals: 0,
        unhealthyMeals: 0,
        exercisesCompleted: []
      };
    }
    if (!this.healthData[today].exercisesCompleted.includes(exerciseId)) {
      this.healthData[today].exercisesCompleted.push(exerciseId);
    }
    this.saveHealthData();
    return { ...this.healthData[today] };
  }

  async getWeeklyProgress() {
    await this.delay();
    const weekData = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i));
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayData = this.healthData[dateStr];
      
      weekData.push({
        date: dateStr,
        waterGoal: dayData ? dayData.waterGlasses >= 8 : false,
        exerciseComplete: dayData ? dayData.exercisesCompleted.length > 0 : false,
        mealsBalanced: dayData ? dayData.healthyMeals >= Math.max(1, dayData.unhealthyMeals) : false
      });
    }
    
    return weekData;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 200));
  }
}

export const healthService = new HealthService();