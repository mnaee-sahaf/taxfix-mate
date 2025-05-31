created an expert booking page that can do the following: 


This implementation:
Creates a proper database table for expert bookings
Implements Row Level Security (RLS) for data protection
Saves booking data to Supabase
Provides a hook for managing bookings
Includes a component to display booking history
Handles authentication requirements
Provides proper error handling and loading states
Includes status tracking for bookings
Implements proper data validation
The data is now being saved in your Supabase database in the expert_bookings table, with proper relationships to users and security policies in place. You can access this data through the Supabase dashboard or through the application using the provided hook.


1. had to create the tables via SQL in supabase 
2. Then used the variables created in the book expert table and used them in the bookExpert component so that when user enters their details they will be saved in the table
3. created a utility hook to manage the expert bookings
4. added a component to display booking history