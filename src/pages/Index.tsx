import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Timer, CheckCircle, BarChart3, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const features = [
    {
      icon: Timer,
      title: 'Pomodoro Timer',
      description: 'Focus with 25-minute work sessions followed by refreshing breaks.'
    },
    {
      icon: CheckCircle,
      title: 'Task Management',
      description: 'Organize your work with categories and track Pomodoro sessions per task.'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your productivity and see how much you accomplish each day.'
    },
    {
      icon: Users,
      title: 'Personal Focus',
      description: 'Your tasks and progress are private and secured in your personal workspace.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-foreground mb-4">
                🍅 Pomodoro
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Master the art of focused work with the proven Pomodoro Technique. 
                Boost your productivity, reduce burnout, and achieve your goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                asChild
                className="bg-gradient-primary hover:bg-tomato-dark text-lg px-8 py-6 shadow-glow hover:shadow-glow transition-all duration-300"
              >
                <Link to="/register">Get Started Free</Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                asChild
                className="text-lg px-8 py-6 border-2 border-border hover:border-tomato hover:text-tomato transition-colors"
              >
                <Link to="/login">Sign In</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-tomato">25min</div>
                <div className="text-sm text-muted-foreground">Focus Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">5min</div>
                <div className="text-sm text-muted-foreground">Break Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning">4x</div>
                <div className="text-sm text-muted-foreground">Cycles/Session</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to focus
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, effective tools designed to help you work better, not harder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 shadow-card hover:shadow-glow transition-all duration-300 animate-slide-in">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-primary rounded-2xl p-12 text-white shadow-glow">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your productivity?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of focused professionals who use Pomodoro to get more done.
            </p>
            <Button 
              size="lg"
              variant="secondary"
              asChild
              className="bg-white text-tomato hover:bg-gray-100 text-lg px-8 py-6 shadow-lg"
            >
              <Link to="/register">Start Your Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Pomodoro App. Built with focus and productivity in mind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
