
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const MailingListSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('mailing_list')
        .insert([{ email: values.email }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've been added to our mailing list.",
        variant: "success",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "This email is already subscribed or something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Stay Updated for Tax Season</h2>
          <p className="text-muted-foreground">
            Join our mailing list to get notified when tax season starts and receive important updates.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input 
                      placeholder="Enter your email" 
                      type="email" 
                      className="w-full"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              Subscribe
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default MailingListSignup;
