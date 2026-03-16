# NOMAD Read-Only Bank API Schema (Observer Model)

## Operating Boundary
Nomad is a read-only behavioral intelligence layer.
Nomad never initiates transfers, edits balances, or holds custody.

## Core Objects

### User
```json
{
  "user_id": "uuid",
  "email": "string",
  "country": "NG",
  "currency": "NGN",
  "created_at": "timestamp"
}
```

### Account
```json
{
  "account_id": "uuid",
  "user_id": "uuid",
  "account_type": "checking | savings",
  "bank_name": "string",
  "balance": 250000.75,
  "currency": "NGN",
  "last_synced_at": "timestamp"
}
```

### Transaction
```json
{
  "transaction_id": "uuid",
  "account_id": "uuid",
  "amount": -15000.00,
  "currency": "NGN",
  "type": "debit | credit",
  "description": "POS PURCHASE BETKING",
  "merchant_name": "BETKING",
  "category": "gambling",
  "timestamp": "2026-02-14T03:21:00Z",
  "balance_after": 185000.75
}
```

## Interpretation Rules
- `amount < 0` means withdrawal.
- `amount > 0` means deposit.
- Category is a weak signal; behavioral patterns must come from repetition over time.
- All timestamps must be ISO-8601 UTC.

## Intelligence Pipeline
Bank -> Aggregator -> Nomad Backend -> Behavior Engine -> AI Layer -> Dashboard

## Minimum Endpoint Contract (Aggregator-facing)
- `GET /users/:userId/accounts`
- `GET /accounts/:accountId/transactions?from=...&to=...`
- `GET /accounts/:accountId/balance`

## Non-Negotiables
- Read-only tokens only.
- User-consented and revocable access.
- Full request/response audit logging for sync calls.
