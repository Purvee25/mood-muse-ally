
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [journalEntry, setJournalEntry] = useState("");
  const [showReflection, setShowReflection] = useState(false);
  const { moodEntries, addMoodEntry } = useAppContext();
  const { toast } = useToast();

  const moods = [
    { emoji: "😄", label: "Great", value: "great", color: "bg-green-100 text-green-700" },
    { emoji: "🙂", label: "Good", value: "good", color: "bg-blue-100 text-blue-700" },
    { emoji: "😐", label: "Okay", value: "okay", color: "bg-yellow-100 text-yellow-700" },
    { emoji: "☹️", label: "Down", value: "down", color: "bg-orange-100 text-orange-700" },
    { emoji: "😢", label: "Sad", value: "sad", color: "bg-red-100 text-red-700" },
  ];

  const handleMoodSubmit = () => {
    if (selectedMood) {
      addMoodEntry(selectedMood, journalEntry);
      setShowReflection(true);
      toast({
        title: "Mood logged successfully!",
        description: "Your wellness journey continues. Keep tracking your progress.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSelectedMood("");
        setJournalEntry("");
        setShowReflection(false);
      }, 3000);
    }
  };

  const generateAIReflection = () => {
    const reflections = {
      great: "It's wonderful to see you feeling great! This positive energy is a gift - consider what contributed to this feeling today and how you might nurture more of these moments.",
      good: "You're in a good space today! This is a solid foundation to build upon. Maybe try a small act of kindness for yourself or others to amplify this positive feeling.",
      okay: "Feeling okay is perfectly valid. Some days are neutral, and that's part of life's rhythm. Consider a gentle activity like a short walk or listening to music you enjoy.",
      down: "I understand you're feeling down today. Remember, this feeling is temporary. Have you tried some deep breathing or reaching out to someone you trust? You don't have to face this alone.",
      sad: "I'm here for you during this difficult moment. Sadness is a natural human emotion, but you deserve support. Consider gentle self-care activities or connecting with a friend, counselor, or support group."
    };
    return reflections[selectedMood as keyof typeof reflections] || "Thank you for checking in with yourself today. Self-awareness is the first step toward emotional well-being.";
  };

  const getMoodEmoji = (mood: string) => {
    const moodEmoji: Record<string, string> = {
      'great': '😄',
      'good': '🙂',
      'okay': '😐',
      'down': '☹️',
      'sad': '😢'
    };
    return moodEmoji[mood] || '😐';
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const entryTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - entryTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 backdrop-blur-md border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span>How are you feeling today?</span>
          </CardTitle>
          <p className="text-gray-600">Take a moment to check in with yourself</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Selection */}
          <div>
            <h3 className="font-semibold mb-4">Select your current mood:</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {moods.map((mood) => (
                <Button
                  key={mood.value}
                  variant={selectedMood === mood.value ? "default" : "ghost"}
                  className={`h-20 flex flex-col space-y-2 transition-all duration-200 ${
                    selectedMood === mood.value 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105" 
                      : "hover:bg-white/60 hover:scale-105"
                  }`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-sm font-medium">{mood.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {selectedMood && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  What's on your mind? (Optional)
                </label>
                <Textarea
                  placeholder="Share your thoughts, feelings, or what led to this mood..."
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className="min-h-[100px] bg-white/50"
                />
              </div>

              <Button 
                onClick={handleMoodSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Log My Mood
              </Button>
            </div>
          )}

          {showReflection && (
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2">AI Reflection</h4>
                    <p className="text-purple-800 text-sm leading-relaxed">
                      {generateAIReflection()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Mood History */}
      <Card className="bg-white/60 backdrop-blur-md border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span>Your Mood Journey</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moodEntries.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No mood entries yet. Start by logging your first mood!</p>
            ) : (
              moodEntries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <div className="font-medium capitalize">{entry.mood} mood</div>
                      <div className="text-sm text-gray-600">{getTimeAgo(entry.timestamp)}</div>
                      {entry.note && (
                        <div className="text-sm text-gray-700 mt-1 italic">"{entry.note}"</div>
                      )}
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">Logged</Badge>
                </div>
              ))
            )}
          </div>

          <Button variant="ghost" className="w-full mt-4 text-blue-600">
            <Calendar className="w-4 h-4 mr-2" />
            View Full Mood Calendar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
