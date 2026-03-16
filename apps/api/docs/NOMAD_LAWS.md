# NOMAD — Canonical Laws & State Machines

This document is the **source of truth** for system invariants and state machines.
It is **documentation-first** and must be referenced before any behavioral change.

## Core Laws (Non‑Negotiable)
1. **Money is conserved**: inbound = escrow + penalties + payouts.
2. **Time is server‑owned and monotonic**.
3. **Intent is not a button press**: confirmation must be idempotent and stateful.
4. **Authority is identity‑bound**: no money action without server‑verified identity.
5. **All money‑affecting actions are idempotent**.
6. **Partial success is forbidden**.
7. **State transitions are monotonic**.
8. **Friction is the product**: early unlocks carry explicit, previewed consequences.
9. **The user is both owner and adversary**.
10. **Mock mode must preserve all invariants**.

## Forbidden User Actions
- Unlock and spend the same money simultaneously.
- Shorten locks via retries, cancellation, or race conditions.
- Reuse funding references.
- Bypass penalties except via limited emergencies.
- Double‑release deposits.
- Redirect payouts mid‑flow.
- Reach `RELEASED` without payout confirmation.

## Canonical State Machines

### Deposit
`CREATED → FUNDED → LOCKED → MATURED → RELEASE_REQUESTED → PAYOUT_PENDING → RELEASED`

### Early Unlock
`LOCKED → UNLOCK_PREVIEWED → UNLOCK_CONFIRMED → PENALTY_APPLIED → PAYOUT_PENDING → RELEASED`

### Payout
`REQUESTED → SENT → CONFIRMED`

## Invariant Explanations
- **Conservation**: Every movement is recorded as ledger entries; sums must reconcile.
- **Monotonic time**: Only server time determines maturity; clients never control it.
- **Identity binding**: References, recipients, and actions must link to server identity.
- **Idempotency**: Duplicate requests cannot create extra releases or penalties.
- **Atomicity**: State changes and ledger entries must succeed together or not at all.
- **No bypass**: Early unlock rules apply consistently, even under retries.

## Enforcement Map (High‑Level)
- **Deposits**: funding verification, lock duration, ledger entry.
- **Locks**: maturity enforcement (server time), lock resets.
- **Unlocks**: early unlock preview/confirm, penalty pool, emergency usage.
- **Releases**: matured‑only releases, payout requests.
- **Payouts**: request → send → confirm lifecycle.

## Notes
This file is required reading for any change to money or time logic.

<!--
FILE ROLE:
Canonical, non-negotiable laws and state machines for NOMAD.

CONNECTS TO:
- backend/docs/INVARIANT_AUDIT.md (audit against these laws)

USED BY:
- All engineers before behavioral changes
-->

