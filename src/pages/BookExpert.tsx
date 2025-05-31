
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CheckCircle, User, Phone, Mail, FileText } from 'lucide-react';

interface ExpertBookingForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

const BookExpert = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ExpertBookingForm>();

  const onSubmit = async (data: ExpertBookingForm) => {
    setIsLoading(true);
    
    try {
      // Simulate API call for booking
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Expert booking data:', data);
      
      // Show success message
      toast.success('Booking Confirmed!', {
        description: 'Our expert will contact you within 24 hours.'
      });
      
      setIsSubmitted(true);
    } catch (error) {
      toast.error('Booking Failed', {
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for choosing our expert tax filing service. Our certified tax professional will contact you within 24 hours to schedule your consultation.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You will receive a confirmation email shortly with all the details.
            </p>
            <Button onClick={() => window.location.href = '/dashboard'} className="w-full">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Expert Tax Filing Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let our certified tax professionals handle your tax return with guaranteed accuracy and maximum refunds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                What's Included
              </CardTitle>
              <CardDescription>
                Complete tax filing service by certified professionals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Expert Review & Filing</p>
                    <p className="text-sm text-gray-600">Certified tax professional handles your entire return</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Maximum Deductions</p>
                    <p className="text-sm text-gray-600">We find every deduction you're entitled to</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Audit Protection</p>
                    <p className="text-sm text-gray-600">Free audit support and representation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Direct FBR Filing</p>
                    <p className="text-sm text-gray-600">We file directly with FBR on your behalf</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">PKR 10,000</p>
                  <p className="text-sm text-gray-600">One-time fee, no hidden charges</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Book Your Expert</CardTitle>
              <CardDescription>
                Fill in your details to get started with professional tax filing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address"
                      }
                    })}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone", { required: "Phone number is required" })}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    {...register("address", { required: "Address is required" })}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    {...register("notes")}
                    placeholder="Any specific requirements or questions"
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Book Expert Service - PKR 10,000'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By booking, you agree to our terms of service. Payment will be collected upon service completion.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookExpert;
