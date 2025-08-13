import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/lib/api';
import { Loader2, X } from 'lucide-react';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: {
    name: string;
    description: string;
    pomodoro_count: number;
    category_id: number;
  }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const TaskForm = ({ task, onSubmit, onCancel, isLoading }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    name: task?.name || '',
    description: task?.description || '',
    pomodoro_count: task?.pomodoro_count || 1,
    category_id: task?.category_id || 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-card animate-slide-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          {task ? 'Edit Task' : 'Create New Task'}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Task Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Study for exam, Write report..."
              required
              className="transition-colors focus:ring-tomato"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add details about your task..."
              rows={3}
              className="transition-colors focus:ring-tomato resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pomodoro_count">Pomodoros</Label>
              <Select
                value={formData.pomodoro_count.toString()}
                onValueChange={(value) => handleChange('pomodoro_count', parseInt(value))}
              >
                <SelectTrigger className="focus:ring-tomato">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} 🍅
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category_id.toString()}
                onValueChange={(value) => handleChange('category_id', parseInt(value))}
              >
                <SelectTrigger className="focus:ring-tomato">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Work</SelectItem>
                  <SelectItem value="2">Study</SelectItem>
                  <SelectItem value="3">Personal</SelectItem>
                  <SelectItem value="4">Health</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit"
              className="flex-1 bg-gradient-primary hover:bg-tomato-dark transition-all duration-300 shadow-subtle hover:shadow-glow"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {task ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  {task ? 'Update Task' : 'Create Task'}
                </>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 border-border hover:border-tomato hover:text-tomato transition-colors"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};