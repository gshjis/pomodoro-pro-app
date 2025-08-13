import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PomodoroTimer } from '@/components/timer/PomodoroTimer';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskForm } from '@/components/tasks/TaskForm';
import { tasksAPI, Task } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Plus, LogOut, User, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await tasksAPI.getAll();
      setTasks(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        navigate('/login');
        return;
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tasks",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData: any) => {
    setIsSubmitting(true);
    try {
      const response = await tasksAPI.create(taskData);
      setTasks(prev => [response.data, ...prev]);
      setShowTaskForm(false);
      toast({
        title: "Task created!",
        description: `"${taskData.name}" is ready for your focus sessions.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create task",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (taskData: any) => {
    if (!editingTask) return;
    
    setIsSubmitting(true);
    try {
      const response = await tasksAPI.update(editingTask.task_id, taskData);
      setTasks(prev => prev.map(task => 
        task.task_id === editingTask.task_id ? response.data : task
      ));
      setEditingTask(null);
      setShowTaskForm(false);
      toast({
        title: "Task updated!",
        description: `"${taskData.name}" has been updated.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update task",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await tasksAPI.delete(taskId);
      setTasks(prev => prev.filter(task => task.task_id !== taskId));
      if (activeTask?.task_id === taskId) {
        setActiveTask(null);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete task",
      });
    }
  };

  const handleStartTimer = (task: Task) => {
    setActiveTask(task);
    toast({
      title: "Timer started!",
      description: `Focus session for "${task.name}" has begun.`,
    });
  };

  const handleTimerComplete = () => {
    // Could update task completion count here
    toast({
      title: "🎉 Great work!",
      description: "You've completed a Pomodoro session!",
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  const cancelTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-subtle border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">🍅 Pomodoro</h1>
              <span className="text-muted-foreground">Dashboard</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:border-tomato hover:text-tomato transition-colors"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Stats
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-border hover:border-destructive hover:text-destructive transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Timer & Active Task */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-center">
                  {activeTask ? `Working on: ${activeTask.name}` : 'Ready to Focus?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PomodoroTimer
                  taskName={activeTask?.name}
                  onComplete={handleTimerComplete}
                />
                
                {activeTask && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Current Task</h4>
                    <p className="text-sm text-muted-foreground">
                      {activeTask.description || 'No description provided'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-tomato text-white px-2 py-1 rounded">
                        {activeTask.pomodoro_count} 🍅
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => setShowTaskForm(true)}
                    className="bg-gradient-primary hover:bg-tomato-dark transition-all duration-300 shadow-subtle hover:shadow-glow"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Task
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-border hover:border-success hover:text-success transition-colors"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Progress
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tasks */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Tasks</h2>
              <span className="text-sm text-muted-foreground">
                {tasks.length} task{tasks.length !== 1 ? 's' : ''}
              </span>
            </div>

            {showTaskForm ? (
              <TaskForm
                task={editingTask}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={cancelTaskForm}
                isLoading={isSubmitting}
              />
            ) : (
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStartTimer={handleStartTimer}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;