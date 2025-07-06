
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Square, Timer } from "lucide-react";

interface ActivityTimerProps {
  activityTitle: string;
  duration: string; // e.g., "5 min", "10 min"
  onComplete: () => void;
  onClose: () => void;
}

const ActivityTimer: React.FC<ActivityTimerProps> = ({ activityTitle, duration, onComplete, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  // Parse duration string to seconds
  useEffect(() => {
    const minutes = parseInt(duration.split(' ')[0]);
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setTotalTime(seconds);
  }, [duration]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft, onComplete]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(totalTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            <div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Timer className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{activityTitle}</h3>
              <p className="text-gray-600">Focus time for your wellness activity</p>
            </div>

            <div className="space-y-4">
              <div className="text-6xl font-mono font-bold text-gray-800">
                {formatTime(timeLeft)}
              </div>
              
              <Progress value={progress} className="h-3" />
              
              <div className="text-sm text-gray-500">
                {Math.floor(progress)}% complete
              </div>
            </div>

            <div className="flex justify-center space-x-3">
              {!isRunning ? (
                <Button
                  onClick={handleStart}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              ) : (
                <Button
                  onClick={handlePause}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
              )}
              
              <Button
                onClick={handleStop}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Square className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            <div className="pt-4 border-t">
              <Button
                onClick={onClose}
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
              >
                Close Timer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityTimer;
