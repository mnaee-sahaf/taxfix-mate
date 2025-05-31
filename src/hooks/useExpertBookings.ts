import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ExpertBooking {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export const useExpertBookings = () => {
  const [bookings, setBookings] = useState<ExpertBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('expert_bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const createBooking = async (bookingData: Omit<ExpertBooking, 'id' | 'user_id' | 'status' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('expert_bookings')
        .insert([
          {
            user_id: user.id,
            ...bookingData,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  };

  const updateBookingStatus = async (bookingId: string, status: ExpertBooking['status']) => {
    try {
      const { data, error } = await supabase
        .from('expert_bookings')
        .update({ status })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  };

  return {
    bookings,
    loading,
    createBooking,
    updateBookingStatus,
    refreshBookings: fetchBookings
  };
};
