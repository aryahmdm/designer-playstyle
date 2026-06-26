-- Initialize tables for local development

CREATE TABLE IF NOT EXISTS participants_f9f749d6 (
  resultid TEXT PRIMARY KEY,
  name TEXT,
  role TEXT,
  email TEXT,
  archetype TEXT,
  points INT,
  created_date TIMESTAMP,
  technic INT DEFAULT 0,
  empathic INT DEFAULT 0,
  strategic INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS kv_store_f9f749d6 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
