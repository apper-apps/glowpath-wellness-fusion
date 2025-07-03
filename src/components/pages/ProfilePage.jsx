import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import ProfileStats from '@/components/molecules/ProfileStats';
import SettingsSection from '@/components/molecules/SettingsSection';
const ProfilePage = () => {
  // Get user data from Redux store
  const { user, isAuthenticated } = useSelector((state) => state.user);
  
  // Get user display name and email from authenticated user
  const getUserDisplayName = () => {
    if (!user) return 'User';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName} ${lastName}`.trim() || user.emailAddress || 'User';
  };

  const getUserEmail = () => {
    return user?.emailAddress || '';
  };

  const getCompanyName = () => {
    return user?.accounts?.[0]?.companyName || '';
  };

  const [userProfile, setUserProfile] = useState({
    streak: 7,
    totalExercises: 45,
    favoriteProducts: 12,
    waterGoal: 8,
    notifications: true,
    darkMode: false,
    weeklyGoal: 5
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    waterGoal: userProfile.waterGoal,
    weeklyGoal: userProfile.weeklyGoal
  });

const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({
        waterGoal: userProfile.waterGoal,
        weeklyGoal: userProfile.weeklyGoal
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setUserProfile(prev => ({
      ...prev,
      ...editForm
    }));
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleSettingChange = (setting, value) => {
    setUserProfile(prev => ({
      ...prev,
      [setting]: value
    }));
    toast.success(`${setting === 'darkMode' ? 'Dark mode' : 'Notifications'} ${value ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
          Your Profile
        </h2>
        <p className="text-gray-600 text-lg">
          Manage your account and track your wellness journey
        </p>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={40} className="text-white" />
          </div>
          
<div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <div className="text-2xl font-display font-bold text-gray-800 bg-transparent border-b-2 border-accent pb-2">
                  {getUserDisplayName()}
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Daily Water Goal</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={editForm.waterGoal}
                      onChange={(e) => setEditForm(prev => ({ ...prev, waterGoal: parseInt(e.target.value) }))}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Weekly Exercise Goal</label>
                    <input
                      type="number"
                      min="1"
                      max="7"
                      value={editForm.weeklyGoal}
                      onChange={(e) => setEditForm(prev => ({ ...prev, weeklyGoal: parseInt(e.target.value) }))}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-800">
                  {getUserDisplayName()}
                </h3>
                <p className="text-gray-600 mb-2">{getUserEmail()}</p>
                {getCompanyName() && (
                  <p className="text-sm text-gray-500 mb-1">
                    {getCompanyName()}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  {isAuthenticated ? 'Authenticated User' : 'Guest User'}
                </p>
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="btn-glow">
                  <ApperIcon name="Check" size={16} />
                  Save
                </Button>
                <Button variant="secondary" onClick={handleEditToggle}>
                  <ApperIcon name="X" size={16} />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleEditToggle} variant="secondary">
                <ApperIcon name="Edit" size={16} />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Profile Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ProfileStats
          streak={userProfile.streak}
          totalExercises={userProfile.totalExercises}
          favoriteProducts={userProfile.favoriteProducts}
        />
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <SettingsSection
          notifications={userProfile.notifications}
          darkMode={userProfile.darkMode}
          onSettingChange={handleSettingChange}
        />
      </motion.div>

      {/* App Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="text-xl font-display font-bold text-gray-800 mb-4">
          About GlowPath
        </h3>
        <div className="space-y-3 text-gray-600">
          <div className="flex justify-between">
            <span>App Version</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated</span>
            <span className="font-medium">Dec 2024</span>
          </div>
          <div className="flex justify-between">
            <span>Data Storage</span>
            <span className="font-medium">Local Device</span>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col space-y-2">
            <button className="text-accent hover:text-accent/80 transition-colors text-left">
              Privacy Policy
            </button>
            <button className="text-accent hover:text-accent/80 transition-colors text-left">
              Terms of Service
            </button>
            <button className="text-accent hover:text-accent/80 transition-colors text-left">
              Contact Support
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;