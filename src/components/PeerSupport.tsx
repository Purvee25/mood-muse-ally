import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Send, 
  Shield,
  ThumbsUp,
  Clock,
  UserX
} from "lucide-react";

const PeerSupport = () => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
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
    },
    {
      id: 3,
      content: "Gentle reminder: It's okay to have bad days. You're not weak for struggling. You're human for feeling. Tomorrow is a new opportunity. 💙",
      timestamp: "6 hours ago", 
      likes: 45,
      replies: 12,
      anonymous: true,
      supportive: true
    }
  ]);

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const newPostObj = {
        id: posts.length + 1,
        content: newPost,
        timestamp: "Just now",
        likes: 0,
        replies: 0,
        anonymous: true,
        supportive: true
      };
      setPosts([newPostObj, ...posts]);
      setNewPost("");
    }
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span>Anonymous Support Wall</span>
              </h2>
              <p className="text-pink-100">Share, support, and connect with others on their wellness journey</p>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-pink-200" />
              <span className="text-sm text-pink-100">AI Moderated</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Community Guidelines</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• All posts are anonymous to protect your privacy</p>
            <p>• Be kind, supportive, and respectful to others</p>
            <p>• Share experiences, coping strategies, and encouragement</p>
            <p>• AI moderation ensures a safe, supportive environment</p>
          </div>
        </CardContent>
      </Card>

      {/* Post Creation */}
      <Card className="bg-white/60 backdrop-blur-md border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-purple-500" />
            <span>Share Your Thoughts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Share something supportive, ask for advice, or just let others know they're not alone..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[120px] bg-white/50"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <UserX className="w-4 h-4" />
              <span>Your post will be anonymous</span>
            </div>
            
            <Button 
              onClick={handleSubmitPost}
              disabled={!newPost.trim()}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Share Anonymously
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support Posts */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Community Support</h3>
        
        {posts.map((post) => (
          <Card key={post.id} className="bg-white/60 backdrop-blur-md border-blue-100 hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
              <div className="space-y-4">
                <p className="text-gray-800 leading-relaxed">{post.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.replies} replies
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.timestamp}
                    </Badge>
                    <Badge className="bg-green-100 text-green-700">
                      Anonymous
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Resources */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white border-0">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2">Need Immediate Support?</h4>
          <p className="text-green-100 text-sm mb-3">
            If you're in crisis or need immediate help, please reach out to professional resources.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/20 text-white">Crisis Hotline: 988</Badge>
            <Badge className="bg-white/20 text-white">Text HOME to 741741</Badge>
            <Badge className="bg-white/20 text-white">Emergency: 911</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeerSupport;
