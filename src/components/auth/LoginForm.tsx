import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.login(formData);
      localStorage.setItem('access_token', response.data.access_token);
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.response?.data?.detail || "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-card">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
          <span className="text-2xl">🍅</span>
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to your Pomodoro account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username or Email</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="transition-colors focus:ring-tomato"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="transition-colors focus:ring-tomato"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:bg-tomato-dark transition-all duration-300 shadow-subtle hover:shadow-glow"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-tomato hover:text-tomato-dark font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};