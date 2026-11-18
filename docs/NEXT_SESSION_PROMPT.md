# Prompt — ripresa sessione (copia in una chat nuova)

Usa questo testo all’apertura di Cursor (dopo `git pull` se cambi PC).

---

Ciao — riprendiamo **Bass Sheets Library**.

Leggi prima:
- `.cursor/rules/bass-sheets-learning.mdc` (progress + **programma** + next session)
- `docs/DATABASE_SCHEMA.md` se tocchiamo DB/CHECK
- Preferisci italiano; workflow pedagogico: spiega → aspetta OK → un passo; **DIY** (spiega, non scrivere il codice) salvo richiesta esplicita

**Stato (stop 2026-11-18)**
- `main` locale allineato a `origin/main`. Search, zoom, Vercel (`https://bass-sheets-library.vercel.app`).
- Filtro difficulty **mergiato** (PR #7): chip All+1–5, persistenza status/`q`/difficulty, Clear search/filters. `difficulty` solo `"1"`…`"5"`; `filterIdle` sui chip inattivi; `buildHref` in `lib/utils.ts`. All non scrive `difficulty=0`.
- Supabase free tier si mette in pausa: riattivare il progetto prima di provare la home.

**Prossima sessione**
1. Filtro genre / tags (array PostgREST), in DIY.
2. Poi ordinamento (newest / title / difficulty), oppure altro che scelgo io.

Learning mode. Niente deploy/CI salvo richiesta.

Partiamo dal filtro genre/tags.

---

## Comandi utili (nuovo PC)

```bash
git fetch origin
git switch main
git pull
npm install
cp .env.example .env.local            # poi incolla URL + publishable key Supabase
npm run dev
```
