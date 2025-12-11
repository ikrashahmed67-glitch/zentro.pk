/*
  # Insert sample data for testing

  1. Sample Categories
    - Electronics, Fashion, Home & Garden, Sports

  2. Notes
    - This migration adds sample categories to help test the application
    - Categories are only inserted if they don't already exist
*/

INSERT INTO categories (name, image) VALUES
  ('Electronics', 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Fashion', 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Home & Garden', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Sports', 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (name) DO NOTHING;