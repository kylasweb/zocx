/*
  # Investment Platform Schema

  1. New Tables
    - investment_plans
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - min_amount (numeric)
      - max_amount (numeric)
      - roi_value (numeric)
      - roi_type (text)
      - duration (integer)
      - status (text)
      - created_at (timestamptz)
    
    - investments
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - plan_id (uuid, foreign key)
      - amount (numeric)
      - start_date (timestamptz)
      - end_date (timestamptz)
      - status (text)
      - earnings (numeric)
      - created_at (timestamptz)
    
    - investment_transactions
      - id (uuid, primary key)
      - investment_id (uuid, foreign key)
      - type (text)
      - amount (numeric)
      - status (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
*/

-- Investment Plans Table
CREATE TABLE IF NOT EXISTS investment_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  min_amount numeric(20,2) NOT NULL,
  max_amount numeric(20,2) NOT NULL,
  roi_value numeric(5,2) NOT NULL,
  roi_type text NOT NULL CHECK (roi_type IN ('fixed', 'dynamic', 'compound')),
  duration integer NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now()
);

-- Investments Table
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  plan_id uuid REFERENCES investment_plans(id) NOT NULL,
  amount numeric(20,2) NOT NULL,
  start_date timestamptz NOT NULL DEFAULT now(),
  end_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  earnings numeric(20,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Investment Transactions Table
CREATE TABLE IF NOT EXISTS investment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investment_id uuid REFERENCES investments(id) NOT NULL,
  type text NOT NULL CHECK (type IN ('deposit', 'payout', 'withdrawal')),
  amount numeric(20,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE investment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Investment Plans policies
CREATE POLICY "Anyone can view active investment plans"
  ON investment_plans FOR SELECT
  TO authenticated
  USING (status = 'active');

-- Investments policies
CREATE POLICY "Users can view their own investments"
  ON investments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create investments"
  ON investments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Investment Transactions policies
CREATE POLICY "Users can view their own transactions"
  ON investment_transactions FOR SELECT
  TO authenticated
  USING (
    investment_id IN (
      SELECT id FROM investments WHERE user_id = auth.uid()
    )
  );

-- Create functions for investment operations
CREATE OR REPLACE FUNCTION calculate_investment_earnings(investment_id uuid)
RETURNS numeric AS $$
DECLARE
  inv investments;
  plan investment_plans;
  days_active integer;
  earnings numeric;
BEGIN
  SELECT * INTO inv FROM investments WHERE id = investment_id;
  SELECT * INTO plan FROM investment_plans WHERE id = inv.plan_id;
  
  -- Calculate days since investment start
  days_active := LEAST(
    EXTRACT(EPOCH FROM (COALESCE(inv.end_date, NOW()) - inv.start_date)) / 86400,
    plan.duration
  )::integer;
  
  -- Calculate earnings based on ROI type
  CASE plan.roi_type
    WHEN 'fixed' THEN
      earnings := (inv.amount * plan.roi_value / 100) * (days_active::numeric / plan.duration);
    WHEN 'compound' THEN
      earnings := inv.amount * (POWER(1 + plan.roi_value / 100, days_active::numeric / 30) - 1);
    WHEN 'dynamic' THEN
      -- Dynamic ROI calculation (simplified example)
      earnings := (inv.amount * plan.roi_value / 100) * (days_active::numeric / plan.duration) * 
        (1 + (RANDOM() * 0.2 - 0.1)); -- -10% to +10% variation
  END CASE;
  
  RETURN ROUND(earnings, 2);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update earnings
CREATE OR REPLACE FUNCTION update_investment_earnings()
RETURNS trigger AS $$
BEGIN
  UPDATE investments
  SET earnings = calculate_investment_earnings(id)
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_earnings_after_change
AFTER INSERT OR UPDATE OF amount, start_date, end_date
ON investments
FOR EACH ROW
EXECUTE FUNCTION update_investment_earnings();

-- Insert default investment plans
INSERT INTO investment_plans (name, description, min_amount, max_amount, roi_value, roi_type, duration)
VALUES
  ('Starter Plan', 'Perfect for beginners', 100, 1000, 5, 'fixed', 30),
  ('Growth Plan', 'For intermediate investors', 1000, 10000, 8, 'compound', 60),
  ('Premium Plan', 'For experienced investors', 10000, 100000, 12, 'dynamic', 90);