
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MoodEntry {
  id: string;
  mood: string;
  note?: string;
  timestamp: string;
  date: string;
}

interface SupportPost {
  id: number;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  anonymous: boolean;
  supportive: boolean;
  likedByUser?: boolean;
}

interface UserStats {
  streak: number;
  wellnessScore: number;
  completedTasks: number;
  totalTasks: number;
  totalPoints: number;
}

interface AppContextType {
  // Mood tracking
  moodEntries: MoodEntry[];
  addMoodEntry: (mood: string, note?: string) => void;
  
  // Support posts
  supportPosts: SupportPost[];
  addSupportPost: (content: string) => void;
  likeSupportPost: (postId: number) => void;
  
  // AI Coach
  completedActivities: string[];
  completeActivity: (activityId: string) => void;
  
  // User stats
  userStats: UserStats;
  updateStats: (updates: Partial<UserStats>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MOOD_ENTRIES: 'companion_mood_entries',
  SUPPORT_POSTS: 'companion_support_posts',
  COMPLETED_ACTIVITIES: 'companion_completed_activities',
  USER_STATS: 'companion_user_stats'
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [supportPosts, setSupportPosts] = useState<SupportPost[]>([]);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    streak: 7,
    wellnessScore: 72,
    completedTasks: 15,
    totalTasks: 20,
    totalPoints: 0
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedMoodEntries = localStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES);
        if (savedMoodEntries) {
          setMoodEntries(JSON.parse(savedMoodEntries));
        }

        const savedSupportPosts = localStorage.getItem(STORAGE_KEYS.SUPPORT_POSTS);
        if (savedSupportPosts) {
          setSupportPosts(JSON.parse(savedSupportPosts));
        } else {
          // Initialize with default posts
          const defaultPosts: SupportPost[] = [
            {
              id: 1,
              content: "Today was challenging but I made it through. Sometimes just taking it one hour at a time helps. Anyone else feel this way?",
              timestamp: "2 hours ago",
              likes: 12,
              replies: 3,
              anonymous: true,
              supportive: true
            },
            {
              id: 2,
              content: "I've been practicing the 5-4-3-2-1 grounding technique when I feel anxious. 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. It really helps center me.",
              timestamp: "4 hours ago",
              likes: 23,
              replies: 7,
              anonymous: true,
              supportive: true
            }
          ];
          setSupportPosts(defaultPosts);
        }

        const savedActivities = localStorage.getItem(STORAGE_KEYS.COMPLETED_ACTIVITIES);
        if (savedActivities) {
          setCompletedActivities(JSON.parse(savedActivities));
        }

        const savedStats = localStorage.getItem(STORAGE_KEYS.USER_STATS);
        if (savedStats) {
          setUserStats(JSON.parse(savedStats));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUPPORT_POSTS, JSON.stringify(supportPosts));
  }, [supportPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_ACTIVITIES, JSON.stringify(completedActivities));
  }, [completedActivities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(userStats));
  }, [userStats]);

  const addMoodEntry = (mood: string, note?: string) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      note,
      timestamp: new Date().toLocaleString(),
      date: new Date().toISOString().split('T')[0]
    };
    
    setMoodEntries(prev => [newEntry, ...prev]);
    
    // Update streak and wellness score
    const moodValue = getMoodValue(mood);
    setUserStats(prev => ({
      ...prev,
      wellnessScore: Math.min(100, prev.wellnessScore + 2),
      completedTasks: prev.completedTasks + 1
    }));
  };

  const addSupportPost = (content: string) => {
    const newPost: SupportPost = {
      id: Date.now(),
      content,
      timestamp: "Just now",
      likes: 0,
      replies: 0,
      anonymous: true,
      supportive: true
    };
    
    setSupportPosts(prev => [newPost, ...prev]);
    
    // Update stats for community participation
    setUserStats(prev => ({
      ...prev,
      wellnessScore: Math.min(100, prev.wellnessScore + 3),
      completedTasks: prev.completedTasks + 1
    }));
  };

  const likeSupportPost = (postId: number) => {
    setSupportPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likedByUser ? post.likes - 1 : post.likes + 1, likedByUser: !post.likedByUser }
          : post
      )
    );
  };

  const completeActivity = (activityId: string) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities(prev => [...prev, activityId]);
      
      // Update stats and points
      const activityPoints = getActivityPoints(activityId);
      setUserStats(prev => ({
        ...prev,
        completedTasks: prev.completedTasks + 1,
        totalPoints: prev.totalPoints + activityPoints,
        wellnessScore: Math.min(100, prev.wellnessScore + 5)
      }));
    }
  };

  const updateStats = (updates: Partial<UserStats>) => {
    setUserStats(prev => ({ ...prev, ...updates }));
  };

  const getMoodValue = (mood: string): number => {
    const moodValues: Record<string, number> = {
      'great': 9,
      'good': 7,
      'okay': 5,
      'down': 3,
      'sad': 1
    };
    return moodValues[mood] || 5;
  };

  const getActivityPoints = (activityId: string): number => {
    const activityPoints: Record<string, number> = {
      'mindfulness': 10,
      'gratitude': 15,
      'hydration': 5,
      'music-therapy': 12,
      'heart-coherence': 20,
      'sunlight': 8
    };
    return activityPoints[activityId] || 10;
  };

  return (
    <AppContext.Provider value={{
      moodEntries,
      addMoodEntry,
      supportPosts,
      addSupportPost,
      likeSupportPost,
      completedActivities,
      completeActivity,
      userStats,
      updateStats
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
