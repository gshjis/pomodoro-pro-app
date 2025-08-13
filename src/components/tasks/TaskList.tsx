import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/lib/api';
import { Edit2, Trash2, Play, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TaskListProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
  onStartTimer?: (task: Task) => void;
  isLoading?: boolean;
}

export const TaskList = ({ tasks, onEdit, onDelete, onStartTimer, isLoading }: TaskListProps) => {
  const { toast } = useToast();

  const handleDelete = (task: Task) => {
    if (window.confirm(`Are you sure you want to delete "${task.name}"?`)) {
      onDelete?.(task.task_id);
      toast({
        title: "Task deleted",
        description: `"${task.name}" has been removed.`,
      });
    }
  };

  const getPomodoroColor = (completed: number, total: number) => {
    const percentage = (completed / total) * 100;
    if (percentage === 100) return 'bg-success text-white';
    if (percentage >= 50) return 'bg-warning text-white';
    return 'bg-tomato text-white';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="text-center py-12 shadow-card">
        <CardContent>
          <div className="text-6xl mb-4">🍅</div>
          <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first task to start using the Pomodoro technique!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.task_id} className="group hover:shadow-card transition-all duration-200 animate-slide-in">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg truncate">{task.name}</h3>
                  <Badge 
                    variant="secondary" 
                    className={`${getPomodoroColor(0, task.pomodoro_count)} text-xs px-2 py-1`}
                  >
                    {task.pomodoro_count} 🍅
                  </Badge>
                </div>
                
                {task.description && (
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {task.description}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Category: {task.category_id}</span>
                  <span>•</span>
                  <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  onClick={() => onStartTimer?.(task)}
                  className="bg-gradient-primary hover:bg-tomato-dark text-white shadow-subtle hover:shadow-glow transition-all"
                >
                  <Play className="w-4 h-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit?.(task)}
                  className="border-border hover:border-tomato hover:text-tomato transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(task)}
                  className="border-border hover:border-destructive hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};