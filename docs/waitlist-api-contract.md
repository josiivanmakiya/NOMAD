# Waitlist API Contract (Frozen)

## Endpoint
- `POST /api/waitlist`

## Request Body
```json
{
  "email": "josee@example.com",
  "phoneNumber": "+2348012345678",
  "biggestLeak": "Impulse spending",
  "tenYearGoal": "Land",
  "automation": "high_protocol",
  "resetConsent": true
}
```

## Validation Rules
- `email`: required, valid email format
- `phoneNumber`: required, strict Nigerian format `+234XXXXXXXXXX`
- `biggestLeak`: required, max 80 chars
- `tenYearGoal`: required, max 120 chars
- `automation`: required enum: `high_protocol | manual`
- `resetConsent`: must be `true`

## Success Response
HTTP `201 Created`
```json
{
  "ok": true,
  "status": "success",
  "userId": "66ef9f1c7f0c5d0012345678",
  "automation": "high_protocol",
  "message": "You are now on the Nomad Genesis waitlist.",
  "nextStep": "Deposit setup and lock configuration will be sent via email."
}
```

## Duplicate Response
HTTP `200 OK`
```json
{
  "ok": true,
  "status": "success",
  "alreadyJoined": true,
  "userId": "66ef9f1c7f0c5d0012345678",
  "automation": "high_protocol",
  "message": "You are already on the Nomad Genesis waitlist.",
  "nextStep": "Deposit setup and lock configuration will be sent via email."
}
```

## Validation Error Response
HTTP `400 Bad Request`
```json
{
  "ok": false,
  "status": "error",
  "message": "Invalid email format.",
  "errors": [
    { "field": "email", "message": "Invalid email format." }
  ]
}
```

## Test Cases

### 1) Success
Request:
```json
{
  "email": "josee@example.com",
  "phoneNumber": "+2348012345678",
  "biggestLeak": "Betting",
  "tenYearGoal": "Business",
  "automation": "high_protocol",
  "resetConsent": true
}
```
Expect:
- status `201`
- `status=success`
- `userId` present

### 2) Duplicate
Submit same `email` or `phoneNumber` again.
Expect:
- status `200`
- `alreadyJoined=true`

### 3) Invalid Email
`email = "badmail"`
Expect:
- status `400`
- `errors` includes `field=email`

### 4) Invalid Phone
`phoneNumber = "08012345678"` or `+123...`
Expect:
- status `400`
- `errors` includes `field=phoneNumber`

### 5) No Consent
`resetConsent = false`
Expect:
- status `400`
- `errors` includes `field=resetConsent`

