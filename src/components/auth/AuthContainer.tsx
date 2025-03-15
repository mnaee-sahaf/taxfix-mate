
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthContainer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLoginSuccess = () => {
    toast({
      title: "Sign in successful!",
      description: "Welcome back!",
    });
  };

  const handleSignupSuccess = () => {
    toast({
      title: "Sign up successful!",
      description: "Please check your email for a confirmation link.",
    });
  };

  return (
    <div className="w-full max-w-md p-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">TaxFix</CardTitle>
          <CardDescription>Sign in to save and submit your tax returns</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              onSuccess={handleLoginSuccess}
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              onSuccess={handleSignupSuccess}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthContainer;
