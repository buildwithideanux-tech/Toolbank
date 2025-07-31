'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Select, Button } from '@/components/ui/FormField';
import { Play, Pause, Square, RotateCcw, Bell } from 'lucide-react';

const timerSchema = z.object({
  hours: z.number().min(0, 'Hours cannot be negative').max(23, 'Hours cannot exceed 23'),
  minutes: z.number().min(0, 'Minutes cannot be negative').max(59, 'Minutes cannot exceed 59'),
  seconds: z.number().min(0, 'Seconds cannot be negative').max(59, 'Seconds cannot exceed 59'),
  title: z.string().optional(),
});

type TimerFormData = z.infer<typeof timerSchema>;

interface TimerState {
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  isFinished: boolean;
  title: string;
}

const CountdownTimer = () => {
  const [timer, setTimer] = useState<TimerState>({
    totalSeconds: 0,
    remainingSeconds: 0,
    isRunning: false,
    isFinished: false,
    title: '',
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TimerFormData>({
    resolver: zodResolver(timerSchema),
    defaultValues: {
      hours: 0,
      minutes: 5,
      seconds: 0,
      title: '',
    },
  });

  // Create audio element for notification
  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timer.isRunning && timer.remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          const newRemaining = prev.remainingSeconds - 1;
          
          if (newRemaining <= 0) {
            // Timer finished
            if (audioRef.current) {
              audioRef.current.play().catch(console.error);
            }
            
            // Show browser notification if permission granted
            if (Notification.permission === 'granted') {
              new Notification('Timer Finished!', {
                body: prev.title || 'Your countdown timer has finished.',
                icon: '/favicon.ico',
              });
            }
            
            return {
              ...prev,
              remainingSeconds: 0,
              isRunning: false,
              isFinished: true,
            };
          }
          
          return {
            ...prev,
            remainingSeconds: newRemaining,
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.isRunning, timer.remainingSeconds]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  const onSubmit = (data: TimerFormData) => {
    const totalSeconds = data.hours * 3600 + data.minutes * 60 + data.seconds;
    
    if (totalSeconds === 0) return;
    
    setTimer({
      totalSeconds,
      remainingSeconds: totalSeconds,
      isRunning: false,
      isFinished: false,
      title: data.title || '',
    });
  };

  const startTimer = () => {
    if (timer.remainingSeconds > 0) {
      setTimer(prev => ({ ...prev, isRunning: true, isFinished: false }));
    }
  };

  const pauseTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: false }));
  };

  const stopTimer = () => {
    setTimer(prev => ({
      ...prev,
      isRunning: false,
      remainingSeconds: prev.totalSeconds,
      isFinished: false,
    }));
  };

  const resetTimer = () => {
    setTimer({
      totalSeconds: 0,
      remainingSeconds: 0,
      isRunning: false,
      isFinished: false,
      title: '',
    });
    setValue('hours', 0);
    setValue('minutes', 5);
    setValue('seconds', 0);
    setValue('title', '');
  };

  const setQuickTimer = (minutes: number, title: string) => {
    const totalSeconds = minutes * 60;
    setTimer({
      totalSeconds,
      remainingSeconds: totalSeconds,
      isRunning: false,
      isFinished: false,
      title,
    });
    setValue('hours', 0);
    setValue('minutes', minutes);
    setValue('seconds', 0);
    setValue('title', title);
  };

  const timeDisplay = formatTime(timer.remainingSeconds);
  const progress = timer.totalSeconds > 0 ? ((timer.totalSeconds - timer.remainingSeconds) / timer.totalSeconds) * 100 : 0;

  const relatedTools = [
    {
      name: 'Time Zone Converter',
      href: '/time-zone-converter',
      description: 'Convert time between time zones',
    },
    {
      name: 'Age Calculator',
      href: '/age-calculator',
      description: 'Calculate exact age and time differences',
    },
    {
      name: 'Date Calculator',
      href: '/date-calculator',
      description: 'Calculate differences between dates',
    },
  ];

  const quickTimers = [
    { minutes: 1, title: 'Quick Break' },
    { minutes: 5, title: 'Short Break' },
    { minutes: 15, title: 'Coffee Break' },
    { minutes: 25, title: 'Pomodoro' },
    { minutes: 30, title: 'Meeting' },
    { minutes: 60, title: 'Hour Timer' },
  ];

  return (
    <ToolLayout
      title="Pomodoro Timer - Productivity Timer & Countdown Timer"
      description="Free Pomodoro timer for productivity, study sessions & work breaks. Online countdown timer with notifications for cooking, workouts & time management."
      slug="countdown-timer"
      keywords={['pomodoro timer', 'productivity timer', 'study timer', 'work timer', 'countdown timer', 'focus timer', 'break timer', 'cooking timer']}
      relatedTools={relatedTools}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pomodoro Timer</h1>
          <p className="text-lg text-gray-600">
            Boost productivity with Pomodoro technique timers, study sessions, and work breaks.
            Set custom countdown timers for cooking, workouts, or any activity with notifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timer Setup */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Set Timer</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField 
                  label="Timer Title (Optional)" 
                  description="Give your timer a name"
                >
                  <Input
                    type="text"
                    {...register('title')}
                    placeholder="e.g., Pomodoro Session, Cooking Timer"
                  />
                </FormField>

                <div className="grid grid-cols-3 gap-4">
                  <FormField 
                    label="Hours" 
                    error={errors.hours}
                  >
                    <Input
                      type="number"
                      min="0"
                      max="23"
                      {...register('hours', { valueAsNumber: true })}
                      error={!!errors.hours}
                    />
                  </FormField>

                  <FormField 
                    label="Minutes" 
                    error={errors.minutes}
                  >
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      {...register('minutes', { valueAsNumber: true })}
                      error={!!errors.minutes}
                    />
                  </FormField>

                  <FormField 
                    label="Seconds" 
                    error={errors.seconds}
                  >
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      {...register('seconds', { valueAsNumber: true })}
                      error={!!errors.seconds}
                    />
                  </FormField>
                </div>

                <Button type="submit" className="w-full">
                  Set Timer
                </Button>
              </form>
            </div>

            {/* Quick Timers */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Timers</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickTimers.map((quick) => (
                  <Button
                    key={quick.minutes}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickTimer(quick.minutes, quick.title)}
                    className="text-sm"
                  >
                    {quick.minutes}m - {quick.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Timer Display */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-8 text-center">
              {timer.title && (
                <h3 className="text-lg font-medium text-gray-900 mb-4">{timer.title}</h3>
              )}
              
              <div className={`text-6xl md:text-8xl font-mono font-bold mb-6 ${
                timer.isFinished ? 'text-red-600' : 
                timer.remainingSeconds <= 10 && timer.remainingSeconds > 0 ? 'text-orange-600' :
                'text-blue-600'
              }`}>
                {timeDisplay.hours}:{timeDisplay.minutes}:{timeDisplay.seconds}
              </div>

              {timer.totalSeconds > 0 && (
                <div className="mb-6">
                  <div className="bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        timer.isFinished ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.round(progress)}% complete
                  </div>
                </div>
              )}

              {timer.isFinished && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 text-red-600">
                    <Bell className="h-5 w-5" />
                    <span className="font-medium">Timer Finished!</span>
                  </div>
                </div>
              )}

              {/* Timer Controls */}
              <div className="flex justify-center space-x-3">
                {!timer.isRunning ? (
                  <Button
                    onClick={startTimer}
                    disabled={timer.remainingSeconds === 0}
                    className="flex items-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Start</span>
                  </Button>
                ) : (
                  <Button
                    onClick={pauseTimer}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Pause className="h-4 w-4" />
                    <span>Pause</span>
                  </Button>
                )}

                <Button
                  onClick={stopTimer}
                  variant="outline"
                  disabled={timer.totalSeconds === 0}
                  className="flex items-center space-x-2"
                >
                  <Square className="h-4 w-4" />
                  <span>Stop</span>
                </Button>

                <Button
                  onClick={resetTimer}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </Button>
              </div>
            </div>

            {/* Timer Status */}
            {timer.totalSeconds > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-700">
                  <div className="flex justify-between mb-1">
                    <span>Status:</span>
                    <span className="font-medium">
                      {timer.isFinished ? 'Finished' : 
                       timer.isRunning ? 'Running' : 'Paused'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Time:</span>
                    <span className="font-medium">
                      {formatTime(timer.totalSeconds).hours}:
                      {formatTime(timer.totalSeconds).minutes}:
                      {formatTime(timer.totalSeconds).seconds}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Countdown Timers</h2>
          <p className="text-gray-600 mb-4">
            Countdown timers are useful for time management, productivity techniques, cooking, 
            workouts, and many other activities that require precise timing.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Popular Timer Uses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900">Pomodoro Technique</h4>
              <p className="text-blue-700">25-minute focused work sessions with 5-minute breaks</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900">Cooking & Baking</h4>
              <p className="text-green-700">Perfect timing for recipes and cooking processes</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900">Exercise & Workouts</h4>
              <p className="text-yellow-700">Time intervals, rest periods, and workout sessions</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900">Study Sessions</h4>
              <p className="text-purple-700">Focused study periods with scheduled breaks</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Timer Features</h3>
          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 p-3 rounded">
              <strong>Visual Progress:</strong> Progress bar shows completion percentage
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>Sound Alert:</strong> Audio notification when timer finishes
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>Browser Notification:</strong> Desktop notification (if permission granted)
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>Quick Presets:</strong> Common timer durations for easy setup
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Will the timer work if I close the browser tab?</h4>
              <p className="text-gray-600">
                No, the timer runs in the browser tab. Keep the tab open for the timer to continue. 
                You'll receive a notification when it finishes if you have notifications enabled.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">How do I enable notifications?</h4>
              <p className="text-gray-600">
                Your browser will ask for notification permission when you first use the timer. 
                You can also enable it in your browser settings for this website.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Can I set multiple timers?</h4>
              <p className="text-gray-600">
                This tool supports one timer at a time. For multiple timers, you can open 
                multiple browser tabs with the timer tool.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CountdownTimer;
