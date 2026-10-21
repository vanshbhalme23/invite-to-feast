CREATE TABLE public.invite_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  roll_no text NOT NULL DEFAULT '',
  food_choice text NOT NULL CHECK (food_choice IN ('veg','non-veg')),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.invite_responses TO anon;
GRANT ALL ON public.invite_responses TO service_role;

ALTER TABLE public.invite_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can submit a response"
  ON public.invite_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);