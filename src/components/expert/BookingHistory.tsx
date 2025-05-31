import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpertBookings } from '@/hooks/useExpertBookings';
import { format } from 'date-fns';

const BookingHistory = () => {
  const { bookings, loading } = useExpertBookings();

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No expert bookings found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Expert Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{booking.name}</h3>
                  <p className="text-sm text-gray-500">{booking.email}</p>
                  <p className="text-sm text-gray-500">{booking.phone}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(booking.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              {booking.notes && (
                <p className="text-sm text-gray-600 mt-2">{booking.notes}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingHistory;
