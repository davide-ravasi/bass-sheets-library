# Database schema — Bass Sheets Library

Source of truth for the Supabase Postgres table `public.sheets`, constraints, indexes, and related Storage notes.

The Supabase Dashboard often **does not show CHECK constraints** clearly (Columns may only show nullable). Use the SQL snippets below to inspect the live database.

**Last reviewed:** 2026-09-17 (aligned with app usage + original project SQL; FTS language is **english** as created in TAPPA 3).

---

## Table: `public.sheets`

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|--------|
| `id` | `UUID` | NO | `gen_random_uuid()` | Primary key |
| `title` | `TEXT` | NO | — | |
| `artist` | `TEXT` | NO | — | |
| `composer` | `TEXT` | YES | — | |
| `genre` | `TEXT[]` | YES | `'{}'` | |
| `key` | `TEXT` | YES | — | Musical key, e.g. `Em` |
| `time_signature` | `TEXT` | YES | — | e.g. `4/4` |
| `tempo` | `INTEGER` | YES | — | BPM |
| `difficulty` | `INTEGER` | YES | — | CHECK 1–5 |
| `techniques` | `TEXT[]` | YES | `'{}'` | |
| `image_url` | `TEXT` | NO | — | Public Storage URL |
| `thumbnail_url` | `TEXT` | NO | — | Same as `image_url` for now |
| `original_filename` | `TEXT` | NO | — | Browser `File.name` |
| `notation_type` | `TEXT` | YES | — | CHECK enum-like |
| `tags` | `TEXT[]` | YES | `'{}'` | |
| `status` | `TEXT` | YES | `'to-learn'` | CHECK enum-like |
| `notes` | `TEXT` | YES | — | Free text |
| `extracted_text` | `TEXT` | YES | — | OCR later |
| `created_at` | `TIMESTAMPTZ` | YES | `NOW()` | |
| `updated_at` | `TIMESTAMPTZ` | YES | `NOW()` | Not auto-updated in app yet |

### App usage today (upload / detail)

Written from the form today: `title`, `artist`, `tempo`, `status`, `image_url`, `thumbnail_url`, `original_filename`.  
Other columns exist in DB and can be added to the UI later.

---

## CHECK constraints

| Name (typical) | Definition |
|----------------|------------|
| `sheets_difficulty_check` | `difficulty BETWEEN 1 AND 5` |
| `sheets_notation_type_check` | `notation_type IN ('standard', 'tab', 'both', 'chord')` |
| `sheets_status_check` | `status IN ('to-learn', 'practicing', 'mastered')` |

**UI labels vs DB values (status)**

| Label (UI) | Value (must match CHECK) |
|------------|---------------------------|
| To learn | `to-learn` |
| Practicing | `practicing` |
| Mastered | `mastered` |

Do **not** send values like `in-progress` or `completed` — they violate `sheets_status_check`.

---

## Indexes

| Name | Purpose |
|------|---------|
| `idx_sheets_title` | Filter/sort by title |
| `idx_sheets_artist` | Filter/sort by artist |
| `idx_sheets_difficulty` | Filter by difficulty |
| `idx_sheets_status` | Filter by status |
| `idx_sheets_created_at` | Newest first (`DESC`) |
| `idx_sheets_search` | Full-text (GIN) on title + artist + notes |

Full-text definition (as created):

```sql
CREATE INDEX idx_sheets_search ON sheets USING GIN (
  to_tsvector('english', title || ' ' || artist || ' ' || COALESCE(notes, ''))
);
```

---

## RLS (table `sheets`)

RLS is **enabled**. Policies for role `anon` (Publishable key):

- SELECT, INSERT, UPDATE, DELETE — allow all rows (`USING (true)` / `WITH CHECK (true)`)

Personal app; tighten when Auth is added.

---

## Storage

- Bucket: **`sheets`** (public)
- Object path pattern: `{timestamp}.{ext}` (not raw `File.name`)
- Policies on `storage.objects` for `anon`: INSERT, UPDATE, SELECT where `bucket_id = 'sheets'`

---

## Inspect live DB (SQL Editor)

### All CHECK constraints on `sheets`

```sql
SELECT
  conname AS constraint_name,
  pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conrelid = 'public.sheets'::regclass
  AND contype = 'c'
ORDER BY conname;
```

### All constraints (PK, CHECK, etc.)

```sql
SELECT
  conname,
  contype,
  pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conrelid = 'public.sheets'::regclass
ORDER BY contype, conname;
```

`contipe` / `contype`: `p` = primary key, `c` = check, `f` = foreign key, `u` = unique.

### Indexes

```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'sheets';
```

---

## Original `CREATE TABLE` (reference)

```sql
CREATE TABLE sheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  composer TEXT,
  genre TEXT[] DEFAULT '{}',
  key TEXT,
  time_signature TEXT,
  tempo INTEGER,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
  techniques TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  notation_type TEXT CHECK (notation_type IN ('standard', 'tab', 'both', 'chord')),
  tags TEXT[] DEFAULT '{}',
  status TEXT CHECK (status IN ('to-learn', 'practicing', 'mastered')) DEFAULT 'to-learn',
  notes TEXT,
  extracted_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Future (not created)

`practice_sessions` — optional practice log table (see `PROJECT_BRAINSTORMING.md`).

---

## Related docs

- `docs/PROJECT_BRAINSTORMING.md` — full product plan
- `.env.example` — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
