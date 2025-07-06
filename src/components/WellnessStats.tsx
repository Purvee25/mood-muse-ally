
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  BarChart3,
  Activity
} from "lucide-react";

const WellnessStats = () => {
  const weeklyData = [
    { day: "Mon", mood: 7, activities: 4 },
    { day: "Tue", mood: 6, activities: 3 },
    { day: "Wed", mood: 8, activities: 5 },
    { day: "Thu", mood: 7, activities: 4 },
    { day: "Fri", mood: 9, activities: 6 },
    { day: "Sat", mood: 8, activities: 5 },
    { day: "Sun", mood: 8, activities: 4 }
  ];

  const achievements = [
    { title: "Mindful Week", description: "Completed 7 days of mindfulness", icon: "🧘", earned: true },
    { title: "Mood Tracker", description: "Logged mood for 5 consecutive days", icon: "📊", earned: true },
    { title: "Support Star", description: "Gave encouragement to 3 community members", icon: "⭐", earned: true },
    { title: "Wellness Warrior", description: "Completed 25 wellness activities", icon: "🏆", earned: false }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Weekly Progress Chart */}
      <Card className="bg-white/60 backdrop-blur-md border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <span>Weekly Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-10 text-sm font-medium text-gray-600">{day.day}</div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 w-12">Mood</span>
                    <Progress value={day.mood * 10} className="h-2 flex-1" />
                    <span className="text-xs font-medium w-6">{day.mood}/10</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 w-12">Tasks</span>
                    <div className="flex space-x-1 flex-1">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-4 rounded ${
                            i < day.activities ? "bg-green-400" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium w-6">{day.activities}/6</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-white/60 backdrop-blur-md border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  achievement.earned 
                    ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200" 
                    : "bg-gray-50 border border-gray-200 opacity-60"
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className={`font-medium ${achievement.earned ? "text-yellow-800" : "text-gray-600"}`}>
                    {achievement.title}
                  </div>
                  <div className={`text-sm ${achievement.earned ? "text-yellow-700" : "text-gray-500"}`}>
                    {achievement.description}
                  </div>
                </div>
                {achievement.earned && (
                  <Badge className="bg-yellow-100 text-yellow-700">
                    Earned
                  </Badge>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-900">Next Goal</span>
            </div>
            <p className="text-sm text-blue-800">
              Complete 3 more wellness activities to unlock "Wellness Warrior" achievement
            </p>
            <Progress value={70} className="h-2 mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessStats;
