import reminderData from '@/services/mockData/reminders.json';

class ReminderService {
  constructor() {
    this.reminders = [...reminderData];
  }

  async getAll() {
    await this.delay();
    return [...this.reminders];
  }

  async getById(id) {
    await this.delay();
    const reminder = this.reminders.find(r => r.Id === id);
    if (!reminder) {
      throw new Error('Reminder not found');
    }
    return { ...reminder };
  }

  async create(reminder) {
    await this.delay();
    const newReminder = {
      ...reminder,
      Id: Math.max(...this.reminders.map(r => r.Id)) + 1
    };
    this.reminders.push(newReminder);
    return { ...newReminder };
  }

  async update(id, data) {
    await this.delay();
    const index = this.reminders.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error('Reminder not found');
    }
    this.reminders[index] = { ...this.reminders[index], ...data };
    return { ...this.reminders[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.reminders.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error('Reminder not found');
    }
    this.reminders.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 250));
  }
}

export const reminderService = new ReminderService();