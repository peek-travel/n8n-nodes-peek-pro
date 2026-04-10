import type { INodeProperties } from 'n8n-workflow';
import { actionBookingRefundPayment, resourceBooking } from '../resources.constants';

const showOnlyForBookingRefundPayment = {
  operation: [actionBookingRefundPayment],
  resource: [resourceBooking],
};

export const bookingRefundPaymentDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForBookingRefundPayment },
    default: "",
    description: 'The ID of the booking to refund (e.g. "b_jgmxry8" or "B-JGMXRY8")',
    required: true,
  },
  {
    displayName: "Payment ID",
    name: "paymentId",
    type: "string",
    displayOptions: { show: showOnlyForBookingRefundPayment },
    default: "",
    description: 'The payment ID to refund (must start with "pmt_")',
    required: true,
  },
  {
    displayName: "Amount",
    name: "amount",
    type: "string",
    displayOptions: { show: showOnlyForBookingRefundPayment },
    default: "",
    placeholder: '1.00',
    description: 'Amount to refund (e.g. "1.00")',
    required: true,
  },
  {
    displayName: "Currency",
    name: "currency",
    type: "string",
    displayOptions: { show: showOnlyForBookingRefundPayment },
    default: "USD",
    placeholder: 'USD',
    description: '3-letter uppercase currency code (e.g. "USD")',
    required: true,
  },
  {
    displayName: "Idempotency Key",
    name: "idempotencyKey",
    type: "string",
    displayOptions: { show: showOnlyForBookingRefundPayment },
    default: "",
    description: 'Unique key to prevent duplicate refunds',
    required: true,
  },
  {
    displayName: 'Live Mode',
		name: 'liveMode',
		type: "boolean",
    displayOptions: { show: showOnlyForBookingRefundPayment },
		default: false,
		description: 'Whether to make a real refund. When false, this is a dry run (no refund).',
  },
];
