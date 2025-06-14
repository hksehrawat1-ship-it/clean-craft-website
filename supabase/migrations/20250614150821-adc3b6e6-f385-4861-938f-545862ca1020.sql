
-- Make city column nullable in franchise_leads table since we're removing it from the form
ALTER TABLE public.franchise_leads 
ALTER COLUMN city DROP NOT NULL;

-- Add a comment to document this change
COMMENT ON COLUMN public.franchise_leads.city IS 'Optional city field - not collected in simplified form';
