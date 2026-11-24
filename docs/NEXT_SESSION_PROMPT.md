# Prompt — ripresa sessione (copia in una chat nuova)

Usa questo testo all’apertura di Cursor (dopo `git pull` se cambi PC).

---

Ciao — riprendiamo **Bass Sheets Library**.

Leggi prima:
- `.cursor/rules/bass-sheets-learning.mdc` (progress + **programma** + next session)
- `docs/DATABASE_SCHEMA.md` se tocchiamo DB/CHECK
- Preferisci italiano; workflow pedagogico: spiega → aspetta OK → un passo; **DIY** (spiega, non scrivere il codice) salvo richiesta esplicita

**Stato (stop 2026-11-23)**
- Branch: `feat/add-filter-genre` (non su `main`). Difficulty già su `main` (PR #7).
- Sul branch: commit query genre + commit persistenza URL.
- Genre filtro **parziale**:
  - Query: `?genre=` + `.contains("genre", [value])` (colonna `TEXT[]`, PostgREST `cs`).
  - Persistenza: `buildHref` + chip status/difficulty + `SearchInput` (hidden + Clear search) + Clear filters include genre.
  - URL corretto: `/?genre=funk` (niente `%22` / virgolette nel param).
  - Multi-valore `funk,rock` = AND (tutti presenti); OR = `overlaps` più avanti se serve.
- **Non fatto:** UI chip dinamici genre; tags. Campo testo genre scartato a favore dei chip.

**Prossima sessione — DIY, in ordine**
1. Lista generi: seconda query `.select("genre")` (dedicata, non dalle sheet filtrate) → flatten + `Set` + sort.
2. Chip `Link` All + un chip per genere: `buildHref({ …, genre })`, `isActive` vs filtro corrente, `filterIdle` / `filterAllActive`.
3. Poi tags (stesso schema) o merge PR, come scelgo io.

Learning mode. Niente deploy/CI salvo richiesta.

Partiamo dal punto 1 (lista generi).

---

## Comandi utili (nuovo PC)

```bash
git fetch origin
git switch feat/add-filter-genre
git pull
npm install
cp .env.example .env.local            # poi incolla URL + publishable key Supabase
npm run dev
```
