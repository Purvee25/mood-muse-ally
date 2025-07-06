
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Heart, 
  Droplets, 
  Music, 
  BookOpen, 
  Sun,
  Moon,
  CheckCircle,
  Play,
  Clock
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

const AICoach = () => {
  const { completedActivities, completeActivity, userStats } = useAppContext();
  const { toast } = useToast();

  const wellnessActivities = [
    {
      id: "mindfulness",
      title: "5-Minute Mindfulness",
      description: "Take a moment to breathe and center yourself",
      icon: Brain,
      duration: "5 min",
      points: 10,
      category: "Mental",
      difficulty: "Easy"
    },
    {
      id: "gratitude",
      title: "Gratitude Journaling",
      description: "Write down 3 things you're grateful for today",
      icon: BookOpen,
      duration: "3 min",
      points: 15,
      category: "Emotional",
      difficulty: "Easy"
    },
    {
      id: "hydration",
      title: "Hydration Check",
      description: "Drink a glass of water mindfully",
      icon: Droplets,
      duration: "1 min",
      points: 5,
      category: "Physical",
      difficulty: "Easy"
    },
    {
      id: "music-therapy",
      title: "Calming Music Session",
      description: "Listen to nature sounds or peaceful music",
      icon: Music,
      duration: "10 min",
      points: 12,
      category: "Mental",
      difficulty: "Easy"
    },
    {
      id: "heart-coherence",
      title: "Heart Coherence Breathing",
      description: "Sync your breathing with your heartbeat",
      icon: Heart,
      duration: "7 min",
      points: 20,
      category: "Physical",
      difficulty: "Medium"
    },
    {
      id: "sunlight",
      title: "Natural Light Exposure",
      description: "Step outside or sit by a window for natural light",
      icon: Sun,
      duration: "5 min",
      points: 8,
      category: "Physical",
      difficulty: "Easy"
    }
  ];

  const handleCompleteTask = (activityId: string, activityTitle: string, points: number) => {
    completeActivity(activityId);
    toast({
      title: "Activity Completed! 🎉",
      description: `Great job completing "${activityTitle}"! You earned ${points} points.`,
    });
  };

  const totalPoints = completedActivities.reduce((sum, taskId) => {
    const task = wellnessActivities.find(t => t.id === taskId);
    return sum + (task?.points || 0);
  }, 0);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mental": return "bg-purple-100 text-purple-700";
      case "Emotional": return "bg-pink-100 text-pink-700";
      case "Physical": return "bg-green-100 text-green-700";
      default: return "bg-blue-100 text-blue-700";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-600";
      case "Medium": return "bg-yellow-100 text-yellow-600";
      case "Hard": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Coach Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
                <Brain className="w-6 h-6" />
                <span>Your AI Wellness Coach</span>
              </h2>
              <p className="text-purple-100">Personalized activities based on your mood and goals</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userStats.totalPoints}</div>
              <div className="text-purple-200 text-sm">Total Points</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="bg-white/60 backdrop-blur-md border-blue-100">
        <CardHeader>
          <CardTitle>Today's Wellness Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Daily Activities</span>
                <span className="text-sm text-gray-600">{completedActivities.length}/{wellnessActivities.length}</span>
              </div>
              <Progress value={(completedActivities.length / wellnessActivities.length) * 100} className="h-3" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{completedActivities.length}</div>
                <div className="text-sm text-purple-600">Completed</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</div>
                <div className="text-sm text-blue-600">Points</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userStats.streak}</div>
                <div className="text-sm text-green-600">Day Streak</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Activities */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recommended Activities</h3>
        
        <div className="grid gap-4">
          {wellnessActivities.map((activity) => {
            const Icon = activity.icon;
            const isCompleted = completedActivities.includes(activity.id);
            
            return (
              <Card key={activity.id} className={`transition-all duration-200 ${
                isCompleted 
                  ? "bg-green-50 border-green-200" 
                  : "bg-white/60 backdrop-blur-md border-blue-100 hover:shadow-md"
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted ? "bg-green-100" : "bg-gradient-to-r from-purple-100 to-blue-100"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Icon className="w-6 h-6 text-purple-600" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getCategoryColor(activity.category)}>
                            {activity.category}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(activity.difficulty)}>
                            {activity.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-gray-600">
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600 mb-2">
                        +{activity.points} pts
                      </div>
                      
                      {isCompleted ? (
                        <Badge className="bg-green-100 text-green-700">
                          ✓ Complete
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleCompleteTask(activity.id, activity.title, activity.points)}
                          className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Evening Wind-down */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Moon className="w-6 h-6" />
            <div>
              <h4 className="font-semibold">Evening Wind-down Reminder</h4>
              <p className="text-indigo-100 text-sm">Don't forget to prepare for restful sleep with a calming routine</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AICoach;
