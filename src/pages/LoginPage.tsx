import { LoginForm } from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            🍅 Pomodoro
          </h1>
          <p className="text-muted-foreground">
            Focus. Achieve. Succeed.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;