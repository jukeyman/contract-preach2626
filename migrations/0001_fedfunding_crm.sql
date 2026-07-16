CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  industry TEXT NOT NULL,
  website TEXT NOT NULL DEFAULT '',
  employees TEXT NOT NULL DEFAULT '',
  annual_revenue TEXT NOT NULL DEFAULT '',
  naics TEXT NOT NULL DEFAULT '',
  sam_status TEXT NOT NULL DEFAULT 'unknown',
  certifications TEXT NOT NULL DEFAULT '',
  services TEXT NOT NULL,
  goals TEXT NOT NULL,
  readiness_score INTEGER NOT NULL DEFAULT 0,
  stage TEXT NOT NULL DEFAULT 'new-intake',
  strengths TEXT NOT NULL DEFAULT '[]',
  risks TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
