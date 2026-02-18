# NOMAD — Invariant Audit (No Fixes)

This audit lists **violations and weak points** against `backend/docs/NOMAD_LAWS.md`.
It is intentionally **non‑prescriptive** (no fixes yet).

## Deposits
1. **Identity binding missing**  
   - File: `backend/services/depositService.js`  
   - Function: `ensureFunding`  
   - Violation: Funding reference is not bound to authenticated identity.  
   - Invariant: Authority is identity‑bound; funding references must not be reusable across users.

2. **Funding reference reuse risk**  
   - File: `backend/services/depositService.js`  
   - Function: `ensureFunding`  
   - Violation: No stored “consumed” marker for funding references.  
   - Invariant: Reuse of funding references is forbidden.

## Locks / Maturity
3. **Clock drift exposure**  
   - File: `backend/services/lockService.js`  
   - Function: `checkMaturity`  
   - Violation: Maturity depends on system clock without drift detection.  
   - Invariant: Time is server‑owned and monotonic.

## Early Unlocks
4. **Retry / concurrency double‑release risk**  
   - File: `backend/services/unlockService.js`  
   - Functions: `confirmUnlockSingle`, `confirmUnlockAll`  
   - Violation: No idempotency or transactional guard; repeated requests can double‑release.  
   - Invariant: All money‑affecting actions are idempotent.

5. **Emergency unlock race risk**  
   - File: `backend/services/unlockService.js`  
   - Function: `consumeEmergency`  
   - Violation: Emergency usage increments without concurrency protection.  
   - Invariant: Authorization and limits must remain correct under retries.

## Releases
6. **Release before payout confirmation**  
   - File: `backend/services/releaseService.js`  
   - Function: `confirmRelease`  
   - Violation: Deposit transitions to RELEASED even if payout fails.  
   - Invariant: Cannot reach RELEASED without payout confirmation.

## Payouts
7. **Client‑controlled recipient details**  
   - File: `backend/services/payoutService.js`  
   - Function: `initiatePayout`  
   - Violation: Recipient details come directly from client input.  
   - Invariant: Authority is identity‑bound; redirecting payouts mid‑flow is forbidden.

## Auth / Identity
8. **Mock identity is freely injectable**  
   - File: `backend/middleware/requireAuth.js`  
   - Violation: Any request can supply `x-user-id` and impersonate a user.  
   - Invariant: Authorization must be bound to identity, not client input.

## Ledger
9. **Penalty pool is ledgered but not reconciled**  
   - File: `backend/services/unlockService.js`  
   - Function: `confirmUnlockSingle`, `confirmUnlockAll`  
   - Violation: Penalty pool entries exist but no escrow account state is enforced.  
   - Invariant: Money is conserved; penalties must be accounted as held funds.

## General
10. **No idempotency keys**  
    - Files: `backend/controllers/depositController.js`, `backend/controllers/releaseController.js`, `backend/controllers/unlockController.js`  
    - Violation: Confirm endpoints do not accept or enforce idempotency keys.  
    - Invariant: All money‑affecting actions are idempotent.

<!--
FILE ROLE:
Non-prescriptive audit of law violations and weak assumptions.

CONNECTS TO:
- backend/docs/NOMAD_LAWS.md

USED BY:
- Future fix planning and invariant hardening
-->

