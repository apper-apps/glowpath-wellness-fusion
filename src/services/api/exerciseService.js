import exerciseData from '@/services/mockData/exercises.json';

class ExerciseService {
  constructor() {
    this.exercises = [...exerciseData];
  }

  async getAll() {
    await this.delay();
    return [...this.exercises];
  }

  async getById(id) {
    await this.delay();
    const exercise = this.exercises.find(e => e.Id === id);
    if (!exercise) {
      throw new Error('Exercise not found');
    }
    return { ...exercise };
  }

  async create(exercise) {
    await this.delay();
    const newExercise = {
      ...exercise,
      Id: Math.max(...this.exercises.map(e => e.Id)) + 1
    };
    this.exercises.push(newExercise);
    return { ...newExercise };
  }

  async update(id, data) {
    await this.delay();
    const index = this.exercises.findIndex(e => e.Id === id);
    if (index === -1) {
      throw new Error('Exercise not found');
    }
    this.exercises[index] = { ...this.exercises[index], ...data };
    return { ...this.exercises[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.exercises.findIndex(e => e.Id === id);
    if (index === -1) {
      throw new Error('Exercise not found');
    }
    this.exercises.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}

export const exerciseService = new ExerciseService();