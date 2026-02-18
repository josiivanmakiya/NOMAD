# Local Error Discovery Checklist

This is the fastest way to catch issues early while building NOMAD.

## 1) Start with health + DB checks

```bash
npm run db:check
```

What this catches:
- Mongo not running
- wrong `MONGO_URI`
- model/connection boot errors

## 2) Start full local stack with one command

```bash
npm run dev
```

This does:
- DB check first
- starts backend + frontend
- prefixes logs as `[backend]` and `[frontend]`

## 3) Validate backend is alive

Open:
- `http://localhost:5000/`

Expected:
- `{ "ok": true, "message": "NOMAD v1 backend running." }`

## 4) Validate waitlist API contract

### Success test
```bash
curl -X POST http://localhost:5000/api/waitlist ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"phoneNumber\":\"+2348012345678\",\"biggestLeak\":\"Impulse spending\",\"tenYearGoal\":\"Land\",\"automation\":\"high_protocol\",\"resetConsent\":true}"
```

### Validation-fail test
```bash
curl -X POST http://localhost:5000/api/waitlist ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"badmail\",\"phoneNumber\":\"08012345678\",\"biggestLeak\":\"\",\"tenYearGoal\":\"\",\"automation\":\"wrong\",\"resetConsent\":false}"
```

What this catches:
- schema/validation drift
- response contract regressions

## 5) Validate founder dashboard access

Request (with admin key):
```bash
curl http://localhost:5000/api/founder/users ^
  -H "x-user-id: 000000000000000000000001" ^
  -H "x-admin-key: <ADMIN_API_KEY>"
```

What this catches:
- missing `ADMIN_API_KEY`
- auth/key mismatches
- founder route visibility issues

## 6) Frontend compile safety

```bash
cd frontend
npm run build
```

What this catches:
- JSX/runtime import issues
- route/component compile breaks

## 7) Common error sources to watch

- `MONGO_URI` wrong or Mongo not running
- `ADMIN_API_KEY` mismatch between backend and frontend env
- `VITE_API_BASE_URL` pointing to wrong port
- `AUTH_BYPASS=false` locally without proper auth flow ready
- stale `.env` after changing flags (restart dev servers)

## 8) Waitlist action logs in Compass

A dedicated collection is now written for waitlist attempts:
- `NOMAD.waitlistlogs`

Useful filters:
```json
{ "outcome": "VALIDATION_FAILED" }
```
```json
{ "outcome": "SERVER_ERROR" }
```

Newest first:
- Sort by `createdAt: -1`
