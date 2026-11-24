# Prompt — ripresa sessione (copia in una chat nuova)

Usa questo testo all’apertura di Cursor (dopo `git pull` se cambi PC).

---

Ciao — riprendiamo **Bass Sheets Library**.

Leggi prima:
- `.cursor/rules/bass-sheets-learning.mdc` (progress + **programma** + next session)
- `docs/DATABASE_SCHEMA.md` se tocchiamo DB/CHECK
- Preferisci italiano; workflow pedagogico: spiega → aspetta OK → un passo; **DIY** (spiega, non scrivere il codice) salvo richiesta esplicita

**Stato (stop 2026-11-24)**
- `main` locale allineato a `origin/main`. Search, zoom, difficulty (PR #7), genre (PR #8), Vercel (`https://bass-sheets-library.vercel.app`).
- Genre completo: `?genre=` + `.contains` (`cs`), persistenza URL, chip dinamici (lista da DB + `Set` + sort + All), upload lowercase, valori DB già minuscoli.
- Tags filtro **non** ancora in UI. Campo testo genre scartato.

**Prossima sessione**
1. Filtro tags (stesso schema di genre: query / `.contains` / `buildHref` / chip dinamici), in DIY.
2. Poi ordinamento (newest / title / difficulty), oppure altro che scelgo io.

Learning mode. Niente deploy/CI salvo richiesta.

Partiamo dal filtro tags (o dimmi se preferisci ordinamento).

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
