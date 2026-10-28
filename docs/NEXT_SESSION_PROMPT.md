# Prompt — ripresa sessione (copia in una chat nuova)

Usa questo testo all’apertura di Cursor su un altro PC (dopo `git pull`).

---

Ciao — riprendiamo **Bass Sheets Library**.

Leggi prima:
- `.cursor/rules/bass-sheets-learning.mdc` (progress + **programma** + next session)
- `docs/DATABASE_SCHEMA.md` se tocchiamo DB/CHECK
- Preferisci italiano; workflow pedagogico: spiega → aspetta OK → un passo; DIY se chiedo di fare io

**Stato atteso**
- `main`: search + zoom + Vercel (`https://bass-sheets-library.vercel.app`)
- Branch feature: `feat/filter-difficulty` — filtro difficulty (All+1–5, persistenza status/q/difficulty, Clear search/filters) — merge PR se non ancora su `main`

**Prossima sessione (in ordine)**
1. Se `feat/filter-difficulty` non è mergiata → review/merge PR
2. Nit: validare difficulty `1…5` prima del `.eq`; `filterIdle` sui chip difficulty
3. Refactor: helper tipo `buildCatalogHref` / builder `URLSearchParams` per non ripetere i `set` di status, difficulty, `q` in ogni chip/clear (`app/page.tsx` + `components/search-input/search-input.tsx`)
4. Poi dal programma: filtro genre/tags, oppure altro che scelgo io

Learning mode su helper e nit; non fare deploy/CI salvo richiesta.

Partiamo dal punto 2–3 (o dimmi se la PR difficulty è già su `main`).

---

## Comandi utili (nuovo PC)

```bash
git fetch origin
git checkout feat/filter-difficulty   # o main se già mergiato
git pull
npm install
cp .env.example .env.local            # poi incolla URL + publishable key Supabase
npm run dev
```
