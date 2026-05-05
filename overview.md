# Peek Pro n8n Community Node — Overview

## Peek Pro (Action Node)

### Account

| Action | Description | Parameters |
|--------|-------------|------------|
| Get Current | Retrieve the current account | _(none)_ |

---

### Booking

| Action | Description | Parameters |
|--------|-------------|------------|
| Get All for Time Range | Retrieve bookings within a date range | `searchBy` (required): `purchaseDate` \| `activityDate`<br>`startTime` (required): dateTime<br>`endTime` (required): dateTime<br>`productId` (optional): string<br>`email` (optional): string<br>`searchString` (optional): string<br>`includeGuests` (optional): boolean |
| Get All for Timeslot | Retrieve all bookings for a specific timeslot | `timeslotId` (required): string<br>`includeGuests` (optional): boolean |
| Get One | Retrieve a single booking by ID | `bookingId` (required): string<br>`includeGuests` (optional): boolean |
| Add Note | Append or overwrite notes on a booking | `bookingId` (required): string<br>`note` (required): string<br>`appendOrOverwrite` (required): `append` \| `overwrite` (default: `append`) |
| Update Checkin Status | Check a booking in or out | `bookingId` (required): string<br>`checkedIn` (required): boolean (default: `true`) |
| Cancel Booking | Cancel a booking | `bookingId` (required): string |
| Get Payments On File | Get payment sources and associated payments for a booking | `bookingId` (required): string |
| Get Invoice Link | Get the invoice link for a booking | `bookingId` (required): string |
| Refund Payment | Refund a payment on a booking | `bookingId` (required): string<br>`paymentId` (required): string — must start with `"pmt_"`<br>`amount` (required): string — e.g. `"1.00"`<br>`currency` (required): string — 3-letter code, e.g. `"USD"` (default: `"USD"`)<br>`idempotencyKey` (required): string — unique key to prevent duplicate refunds<br>`liveMode` (required): boolean (default: `false`) — `false` = dry run, `true` = real refund |
| Make Payment | Charge a saved payment source for a booking | `bookingId` (required): string<br>`paymentSourceId` (required): string — must start with `"ps_"`<br>`amount` (required): string — e.g. `"50.00"`<br>`currency` (required): string — 3-letter code, e.g. `"USD"` (default: `"USD"`)<br>`idempotencyKey` (required): string — unique key to prevent duplicate charges<br>`liveMode` (required): boolean (default: `false`) — `false` = dry run, `true` = real charge<br>`customerMessage` (optional): string — message appended to charge description |
| Create Booking | Create a new booking from an external system | `externalId` (required): string — unique import ID from external system<br>`product` (required): string — product name or ID<br>`tickets` (required): string — e.g. `"2x Adult, 1x Child"` (must match Peek Pro ticket types exactly)<br>`date` (required): dateTime<br>`start` (required): string — local time, e.g. `"4:30pm"`<br>`end` (required): string — local time, e.g. `"5:30pm"`<br>`customerName` (required): string<br>`email` (optional): string<br>`phone` (optional): string — e.g. `"+15555555555"`<br>`notes` (optional): string<br>`postalCode` (optional): string<br>`country` (optional): string — 2-letter code, e.g. `"US"`<br>`optinMarketing` (optional): boolean (default: `false`)<br>`optinSms` (optional): boolean (default: `false`)<br>`shouldSendEmails` (optional): boolean (default: `false`)<br>`markBookingAsPaid` (optional): boolean (default: `false`)<br>`parentOrderId` (optional): string — order ID to add this booking to (starts with `"O-"` or `"o_"`)<br>`partialPaymentAmount` (optional, visible when `markBookingAsPaid` is `true`): string — partial payment amount to apply |

---

### Daily Note

| Action | Description | Parameters |
|--------|-------------|------------|
| Get Today's Note | Retrieve today's daily note | _(none)_ |
| Set Today's Note | Create or replace today's daily note | `note` (required): string |

---

### Product

| Action | Description | Parameters |
|--------|-------------|------------|
| Get All | List all products | _(none)_ |
| Get One | Retrieve a single product by ID | `productId` (required): string |

---

### Promo Code

| Action | Description | Parameters |
|--------|-------------|------------|
| Get All | List all promo codes | _(none)_ |
| Create | Create a new promo code | `name` (required): string — display name<br>`code` (required): string — redemption code<br>`amount` (required): string — e.g. `"30.0"`<br>`discountType` (required): `fixed` \| `percent` (default: `fixed`)<br>`currency` (optional): string (default: `"USD"`) |

---

### Reseller

| Action | Description | Parameters |
|--------|-------------|------------|
| Get All | List all resellers | _(none)_ |

---

### Timeslot

| Action | Description | Parameters |
|--------|-------------|------------|
| Get All for Date | Retrieve timeslots for a product on a given date | `date` (required): dateTime<br>`productId` (required): string<br>`filterBookings` (optional): `all` \| `withBookings` \| `withoutBookings` (default: `withBookings`) |
| Get One | Retrieve a single timeslot by ID | `timeslotId` (required): string |
| Set Availability Status | Block, open, or mark a timeslot as call-to-book | `timeslotId` (required): string<br>`status` (required): `BOOKABLE` \| `BLOCKED` \| `CALL_TO_BOOK` (default: `BOOKABLE`) |
| Set Notes | Set notes on a timeslot | `timeslotId` (required): string<br>`note` (required): string |
| Set Guide / Resource | Assign or unassign guides or resources to timeslots | `timeslotIds` (required): string[] — one or more timeslot IDs<br>`guideOrResourceIds` (required): string[] — one or more guide/resource IDs<br>`assignOrUnassign` (required): `assign` \| `unassign` (default: `assign`) |

---

### User

| Action | Description | Parameters |
|--------|-------------|------------|
| Get All | List all users | _(none)_ |
| Get One | Retrieve a single user by ID | `userId` (required): string |

---

## Peek Pro Trigger (Webhook Node)

Registers a webhook with Peek Pro and fires whenever the selected event occurs. The node rejects localhost URLs and cleans up the webhook subscription when deactivated.

**Output shape for each event:**

```json
{
  "event": { ... },
  "headers": { ... },
  "query": { ... },
  "timestamp": "<ISO 8601>"
}
```

### Events

| Event Name | Value | Description |
|-----------|-------|-------------|
| On Any Booking Change | `booking.updated` | Fires when a booking is created or updated |
| On Booking Cancelled | `booking.cancelled` | Fires when a booking is cancelled |
| On Booking Checked In | `booking.checked_in` | Fires when a booking is checked in |
| On Booking Created | `booking.created` | Fires when a new booking is created |
| On Booking Rescheduled | `booking.rescheduled` | Fires when a booking is rescheduled |
| On Data Push From Focus App | `focus.data` | Fires when the Peek Pro Focus app pushes data |
| On Data Push From Peek Pro Backend | `backend.data` | Fires when the Peek Pro backend pushes data |
| On Waiver Signed | `waiver.signed` | Fires when a guest signs a waiver |
