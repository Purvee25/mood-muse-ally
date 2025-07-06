
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Brain, 
  Users, 
  Award, 
  TrendingUp, 
  MessageCircle,
  Sparkles,
  Calendar,
  Target
} from "lucide-react";
import MoodTracker from "@/components/MoodTracker";
import AICoach from "@/components/AICoach";
import PeerSupport from "@/components/PeerSupport";
import WellnessStats from "@/components/WellnessStats";
import { useAppContext } from "@/contexts/AppContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { userStats, supportPosts } = useAppContext();

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "mood", label: "Mood Check", icon: Heart },
    { id: "coach", label: "AI Coach", icon: Brain },
    { id: "community", label: "Support", icon: Users },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "mood":
        return <MoodTracker />;
      case "coach":
        return <AICoach />;
      case "community":
        return <PeerSupport />;
      default:
        return <DashboardView userStats={userStats} supportPosts={supportPosts} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Companion
                </h1>
                <p className="text-sm text-gray-600">Your Mental Wellness Ally</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Award className="w-4 h-4 mr-1" />
                {userStats.streak} day streak
              </Badge>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex flex-wrap gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`flex items-center space-x-2 transition-all duration-200 ${
                    activeTab === item.id 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                      : "hover:bg-white/60"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="space-y-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

const DashboardView = ({ userStats, supportPosts }: { userStats: any, supportPosts: any[] }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Good morning! 🌅</h2>
              <p className="text-blue-100">How are you feeling today? Let's check in with yourself.</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userStats.wellnessScore}%</div>
              <div className="text-blue-200 text-sm">Wellness Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/60 backdrop-blur-md border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userStats.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userStats.completedTasks}</div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{supportPosts.length}</div>
                <div className="text-sm text-gray-600">Support Messages</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Progress */}
      <Card className="bg-white/60 backdrop-blur-md border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Today's Wellness Journey</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Daily Goals Progress</span>
                <span className="text-sm text-gray-600">{userStats.completedTasks}/{userStats.totalTasks}</span>
              </div>
              <Progress value={(userStats.completedTasks / userStats.totalTasks) * 100} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  ✅
                </div>
                <div className="text-sm font-medium">Mood Check</div>
                <div className="text-xs text-gray-600">Available</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  🧘
                </div>
                <div className="text-sm font-medium">Mindfulness</div>
                <div className="text-xs text-gray-600">AI Coach</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  📝
                </div>
                <div className="text-sm font-medium">Journaling</div>
                <div className="text-xs text-gray-600">With Mood</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  💙
                </div>
                <div className="text-sm font-medium">Support</div>
                <div className="text-xs text-gray-600">Community</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wellness Stats Component */}
      <WellnessStats />
    </div>
  );
};

export default Index;
