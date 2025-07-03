import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ReminderCard from '@/components/molecules/ReminderCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { reminderService } from '@/services/api/reminderService';

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReminders = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await reminderService.getAll();
      setReminders(data);
    } catch (err) {
      setError('Failed to load reminders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const handleToggleReminder = async (id, enabled) => {
    try {
      await reminderService.update(id, { enabled });
      setReminders(prev =>
        prev.map(reminder =>
          reminder.Id === id ? { ...reminder, enabled } : reminder
        )
      );
      
      toast.success(
        enabled ? 'Reminder enabled' : 'Reminder disabled'
      );
    } catch (err) {
      toast.error('Failed to update reminder.');
    }
  };

  const handleUpdateTime = async (id, time) => {
    try {
      await reminderService.update(id, { time });
      setReminders(prev =>
        prev.map(reminder =>
          reminder.Id === id ? { ...reminder, time } : reminder
        )
      );
      
      toast.success('Reminder time updated');
    } catch (err) {
      toast.error('Failed to update reminder time.');
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadReminders} />;
  if (reminders.length === 0) return <Empty message="No reminders configured" />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
          Smart Reminders
        </h2>
        <p className="text-gray-600 text-lg">
          Stay consistent with gentle nudges throughout your day
        </p>
      </motion.div>

      <div className="space-y-4">
        {reminders.map((reminder, index) => (
          <motion.div
            key={reminder.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ReminderCard
              reminder={reminder}
              onToggle={handleToggleReminder}
              onTimeUpdate={handleUpdateTime}
            />
          </motion.div>
        ))}
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="text-xl font-display font-bold text-gray-800 mb-4">
          💡 Reminder Tips
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
            <p className="text-gray-600">
              Set water reminders every 2 hours to maintain consistent hydration
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
            <p className="text-gray-600">
              Morning exercise reminders work best between 6-8 AM
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
            <p className="text-gray-600">
              Evening skincare reminders help establish a consistent routine
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RemindersPage;