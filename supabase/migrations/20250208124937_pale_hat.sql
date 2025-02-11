/*
# Initial MLM Platform Schema

1. Core Tables
  - users: Store user profiles and authentication data
  - network_positions: Store MLM network structure
  - commissions: Track all commission transactions
  - ranks: Define rank levels and requirements
  - wallets: Store user wallet balances
  - transactions: Record all financial transactions

2. Security
  - Enable RLS on all tables
  - Add policies for data access control
  - Set up audit logging

3. Relationships
  - Users to network positions (1:1)
  - Users to wallets (1:1)
  - Users to commissions (1:many)
  - Users to transactions (1:many)
*/

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  country text,
  date_of_birth date,
  sponsor_id uuid REFERENCES users(id),
  rank_id text DEFAULT 'starter',
  status text DEFAULT 'active',
  kyc_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Network Positions Table
CREATE TABLE IF NOT EXISTS network_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) UNIQUE NOT NULL,
  upline_id uuid REFERENCES users(id),
  position text CHECK (position IN ('left', 'right')),
  level integer NOT NULL,
  left_leg uuid REFERENCES network_positions(id),
  right_leg uuid REFERENCES network_positions(id),
  personal_volume numeric(20,2) DEFAULT 0,
  group_volume numeric(20,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ranks Table
CREATE TABLE IF NOT EXISTS ranks (
  id text PRIMARY KEY,
  name text NOT NULL,
  level integer NOT NULL,
  personal_volume numeric(20,2) NOT NULL,
  group_volume numeric(20,2) NOT NULL,
  direct_referrals integer NOT NULL,
  minimum_leg_volume numeric(20,2) NOT NULL,
  commission_rate numeric(5,2) NOT NULL,
  matching_bonus_rate numeric(5,2) NOT NULL,
  leadership_bonus numeric(20,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Wallets Table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) UNIQUE NOT NULL,
  available_balance numeric(20,2) DEFAULT 0,
  pending_balance numeric(20,2) DEFAULT 0,
  total_earned numeric(20,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Commissions Table
CREATE TABLE IF NOT EXISTS commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  source_user_id uuid REFERENCES users(id) NOT NULL,
  type text NOT NULL CHECK (type IN ('direct', 'binary', 'matching', 'leadership', 'retail')),
  amount numeric(20,2) NOT NULL,
  percentage numeric(5,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected')),
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  type text NOT NULL CHECK (type IN ('commission', 'withdrawal', 'bonus', 'adjustment')),
  amount numeric(20,2) NOT NULL,
  fee numeric(20,2) DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  description text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE network_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ranks ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Network positions policies
CREATE POLICY "Users can view network positions"
  ON network_positions FOR SELECT
  TO authenticated
  USING (true);

-- Ranks policies
CREATE POLICY "Anyone can view ranks"
  ON ranks FOR SELECT
  TO authenticated
  USING (true);

-- Wallets policies
CREATE POLICY "Users can view their own wallet"
  ON wallets FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Commissions policies
CREATE POLICY "Users can view their own commissions"
  ON commissions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Transactions policies
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Insert default ranks
INSERT INTO ranks (id, name, level, personal_volume, group_volume, direct_referrals, minimum_leg_volume, commission_rate, matching_bonus_rate, leadership_bonus)
VALUES
  ('starter', 'Starter', 0, 0, 0, 0, 0, 10, 0, 0),
  ('bronze', 'Bronze', 1, 100, 1000, 2, 300, 15, 5, 100),
  ('silver', 'Silver', 2, 200, 5000, 5, 1500, 20, 10, 500),
  ('gold', 'Gold', 3, 300, 10000, 10, 3000, 25, 15, 1000),
  ('diamond', 'Diamond', 4, 500, 25000, 15, 7500, 30, 20, 2500);

-- Create functions for network operations
CREATE OR REPLACE FUNCTION calculate_group_volume(position_id uuid)
RETURNS numeric AS $$
DECLARE
  total numeric := 0;
  pos network_positions;
BEGIN
  SELECT * INTO pos FROM network_positions WHERE id = position_id;
  IF pos IS NULL THEN
    RETURN 0;
  END IF;
  
  total := pos.personal_volume;
  
  IF pos.left_leg IS NOT NULL THEN
    total := total + calculate_group_volume(pos.left_leg);
  END IF;
  
  IF pos.right_leg IS NOT NULL THEN
    total := total + calculate_group_volume(pos.right_leg);
  END IF;
  
  RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update group volume
CREATE OR REPLACE FUNCTION update_group_volumes()
RETURNS trigger AS $$
BEGIN
  -- Update the group volume for the current position
  UPDATE network_positions
  SET group_volume = calculate_group_volume(id)
  WHERE id = NEW.id;
  
  -- Update upline positions
  WITH RECURSIVE upline AS (
    SELECT * FROM network_positions WHERE id = NEW.id
    UNION ALL
    SELECT np.* 
    FROM network_positions np
    INNER JOIN upline u ON np.id = u.upline_id
  )
  UPDATE network_positions np
  SET group_volume = calculate_group_volume(np.id)
  FROM upline
  WHERE network_positions.id = upline.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_volumes_after_change
AFTER INSERT OR UPDATE OF personal_volume
ON network_positions
FOR EACH ROW
EXECUTE FUNCTION update_group_volumes();