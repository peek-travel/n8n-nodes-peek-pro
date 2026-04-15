import type { INodeProperties } from 'n8n-workflow';
import { actionBookingMakePayment, resourceBooking } from '../resources.constants';

const showOnlyForBookingMakePayment = {
  operation: [actionBookingMakePayment],
  resource: [resourceBooking],
};

export const bookingMakePaymentDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForBookingMakePayment },
    default: "",
    description: 'The ID of the booking to charge (e.g. "b_jgmxry8" or "B-JGMXRY8")',
    required: true,
  },
  {
    displayName: "Payment Source ID",
    name: "paymentSourceId",
    type: "string",
    displayOptions: { show: showOnlyForBookingMakePayment },
    default: "",
    description: 'The payment source to charge (must start with "ps_")',
    required: true,
  },
  {
    displayName: "Amount",
    name: "amount",
    type: "string",
    displayOptions: { show: showOnlyForBookingMakePayment },
    default: "",
    placeholder: '50.00',
    description: 'Amount to charge (e.g. "50.00")',
    required: true,
  },
  {
    displayName: "Currency",
    name: "currency",
    type: "string",
    displayOptions: { show: showOnlyForBookingMakePayment },
    default: "USD",
    placeholder: 'USD',
    description: '3-letter uppercase currency code (e.g. "USD")',
    required: true,
  },
  {
    displayName: "Idempotency Key",
    name: "idempotencyKey",
    type: "string",
    displayOptions: { show: showOnlyForBookingMakePayment },
    default: "",
    description: 'Unique key to prevent duplicate charges',
    required: true,
  },
  {
    displayName: 'Live Mode',
		name: 'liveMode',
		type: "boolean",
    displayOptions: { show: showOnlyForBookingMakePayment },
		default: false,
		description: 'Whether to make a real charge. When false, this is a dry run (no charge).',
  },
  {
    displayName: "Customer Message",
    name: "customerMessage",
    type: "string",
    displayOptions: { show: showOnlyForBookingMakePayment },
    default: "",
    description: 'Optional message appended to charge description',
  },
];
