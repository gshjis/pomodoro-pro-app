import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PomodoroTimerProps {
  taskName?: string;
  onComplete?: () => void;
}

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

type TimerState = 'work' | 'break' | 'paused' | 'stopped';

export const PomodoroTimer = ({ taskName = 'Focus Session', onComplete }: PomodoroTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [timerState, setTimerState] = useState<TimerState>('stopped');
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const currentDuration = sessionType === 'work' ? WORK_TIME : BREAK_TIME;
  const progress = ((currentDuration - timeLeft) / currentDuration) * 100;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Session completed
    if (timeLeft === 0 && isRunning) {
      handleSessionComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    
    if (sessionType === 'work') {
      toast({
        title: "🍅 Pomodoro Complete!",
        description: "Great work! Time for a break.",
      });
      setSessionType('break');
      setTimeLeft(BREAK_TIME);
      onComplete?.();
    } else {
      toast({
        title: "✨ Break Complete!",
        description: "Ready for another focus session?",
      });
      setSessionType('work');
      setTimeLeft(WORK_TIME);
    }
    
    setTimerState('stopped');
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    setTimerState(isRunning ? 'paused' : (sessionType === 'work' ? 'work' : 'break'));
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSessionType('work');
    setTimeLeft(WORK_TIME);
    setTimerState('stopped');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    switch (sessionType) {
      case 'work':
        return 'text-timer-progress';
      case 'break':
        return 'text-success';
      default:
        return 'text-timer-text';
    }
  };

  const getProgressColor = () => {
    return sessionType === 'work' ? 'bg-tomato' : 'bg-success';
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-card">
      <CardHeader className="text-center pb-2">
        <CardTitle className="flex items-center justify-center gap-2 text-lg">
          <Clock className="w-5 h-5 text-tomato" />
          {sessionType === 'work' ? 'Focus Time' : 'Break Time'}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{taskName}</p>
      </CardHeader>
      
      <CardContent className="text-center space-y-6">
        {/* Timer Display */}
        <div className={`text-6xl font-mono font-bold ${getTimerColor()} ${isRunning ? 'animate-timer-pulse' : ''}`}>
          {formatTime(timeLeft)}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress 
            value={progress} 
            className="h-2 bg-timer-bg"
          />
          <p className="text-xs text-muted-foreground">
            {Math.round(progress)}% complete
          </p>
        </div>

        {/* Timer Controls */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={toggleTimer}
            size="lg"
            className={`
              flex items-center gap-2 px-6 transition-all duration-300
              ${sessionType === 'work' 
                ? 'bg-gradient-primary hover:bg-tomato-dark shadow-subtle hover:shadow-glow' 
                : 'bg-gradient-success hover:bg-success shadow-subtle'
              }
            `}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                {timerState === 'stopped' ? 'Start' : 'Resume'}
              </>
            )}
          </Button>

          <Button
            onClick={resetTimer}
            size="lg"
            variant="outline"
            className="flex items-center gap-2 px-4 border-border hover:border-tomato hover:text-tomato transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Session Info */}
        <div className="flex justify-between text-xs text-muted-foreground bg-muted rounded-lg p-3">
          <span>Work: {Math.floor(WORK_TIME / 60)}min</span>
          <span>•</span>
          <span>Break: {Math.floor(BREAK_TIME / 60)}min</span>
        </div>
      </CardContent>
    </Card>
  );
};