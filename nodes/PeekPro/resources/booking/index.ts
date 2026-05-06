import type { INodeProperties } from 'n8n-workflow';
import { bookingGetDescription } from './getBooking';
import { bookingGetRangeDescription } from './getRange';
import {
  actionBookingAddAddon,
  actionBookingCancel,
  actionBookingCreateBooking,
  actionBookingGetInvoiceLink,
  actionBookingGetOne,
  actionBookingGetPaymentsOnFile,
  actionBookingGetTimeslot,
  actionBookingMakePayment,
  actionBookingRefundPayment,
  actionBookingUpdateCheckin,
  actionBookingUpdateNotes,
  resourceBooking,
} from '../resources.constants';
import { bookingUpdateCheckinDescription } from './setCheckin';
import { bookingUpdateNotesDescription } from './appendNotes';
import { bookingGetTimeslotDescription } from './getForTimeslot';
import { bookingCreateDescription } from './createBooking';
import { bookingCancelDescription } from './cancelBooking';
import { bookingGetPaymentsOnFileDescription } from './getPaymentsOnFile';
import { bookingMakePaymentDescription } from './makePayment';
import { bookingRefundPaymentDescription } from './refundPayment';
import { bookingGetInvoiceLinkDescription } from './getInvoiceLink';
import { bookingAddAddonDescription } from './addAddon';

const showOnlyForBookings = {
  resource: [resourceBooking],
};

export const bookingDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForBookings,
    },
    options: [
      {
        name: "Get All for Time Range",
        value: 'getMany: bookings (dates)',
        action: "Get bookings within time range",
        description: "Get all bookings for a given time range",
        routing: {
          request: {
            method: "GET",
            url: "/bookings",
            qs: {
              start: '={{$parameter["startTime"]}}',
              end: '={{$parameter["endTime"]}}',
              searchBy: '={{$parameter["searchBy"]}}',
              productId: '={{$parameter["productId"]}}',
              email: '={{$parameter["email"]}}',
              searchString: '={{$parameter["searchString"]}}',
              includeGuests: '={{$parameter["includeGuests"]}}',
            },
          },
        },
      },
      {
        name: "Get All for Timeslot",
        value: actionBookingGetTimeslot,
        action: "Get bookings for a timeslot",
        description: "Get all bookings for a given timeslot",
        routing: {
          request: {
            method: "GET",
            url: "/bookings",
            qs: {
              timeslotId: '={{$parameter["timeslotId"]}}',
              includeGuests: '={{$parameter["includeGuests"]}}',
            },
          },
        },
      },
      {
        name: "Get One",
        value: actionBookingGetOne,
        action: "Get one booking",
        description: "Get the data of a single booking",
        routing: {
          request: {
            method: "GET",
            url: '=/bookings/{{$parameter.bookingId}}',
            qs: {
              includeGuests: '={{$parameter["includeGuests"]}}',
            },
          },
        },
      },
      {
        name: "Add Note",
        value: actionBookingUpdateNotes,
        action: "Append a note to the booking notes",
        description: "Append a note to the booking notes",
        routing: {
          request: {
            method: "POST",
            url: '=/bookings/{{$parameter.bookingId}}/notes',
            body: {
              note: '={{$parameter["note"]}}',
              appendOrOverwrite: '={{$parameter["appendOrOverwrite"]}}',
            },
          },
        },
      },
      {
        name: "Update Checkin Status",
        value: actionBookingUpdateCheckin,
        action: "Update the checkin status of a booking",
        description: "Update the checkin status of a single booking",
        routing: {
          request: {
            method: "POST",
            url: '=/bookings/{{$parameter.bookingId}}/checkin',
            body: {
              checkedIn: '={{$parameter["checkedIn"]}}',
            },
          },
        },
      },
      {
        name: "Cancel Booking",
        value: actionBookingCancel,
        action: "Cancel a booking",
        description: "Cancel a booking",
        routing: {
          request: {
            method: "POST",
            url: '=/bookings/{{$parameter.bookingId}}/cancel',
          },
        },
      },
      {
        name: "Get Payments On File",
        value: actionBookingGetPaymentsOnFile,
        action: "Get payments on file for a booking",
        description: "Get the payment sources and associated payments for a booking",
        routing: {
          request: {
            method: "GET",
            url: '=/bookings/{{$parameter.bookingId}}/paymentsOnFile',
          },
        },
      },
      {
        name: "Get Invoice Link",
        value: actionBookingGetInvoiceLink,
        action: "Get the invoice link for a booking",
        description: "Get the invoice link for a booking",
        routing: {
          request: {
            method: "GET",
            url: '=/bookings/{{$parameter.bookingId}}/invoiceLink',
          },
        },
      },
      {
        name: "Make Payment",
        value: actionBookingMakePayment,
        action: "Make a payment on a booking",
        description: "Charge a saved payment source for a booking",
        routing: {
          request: {
            method: "POST",
            url: '=/bookings/{{$parameter.bookingId}}/makePayment',
            body: {
              paymentSourceId: '={{$parameter["paymentSourceId"]}}',
              amount: '={{$parameter["amount"]}}',
              currency: '={{$parameter["currency"]}}',
              idempotencyKey: '={{$parameter["idempotencyKey"]}}',
              liveMode: '={{$parameter["liveMode"]}}',
              customerMessage: '={{$parameter["customerMessage"]}}',
            },
          },
        },
      },
      {
        name: "Refund Payment",
        value: actionBookingRefundPayment,
        action: "Refund a payment on a booking",
        description: "Refund a payment on a booking",
        routing: {
          request: {
            method: "POST",
            url: '=/bookings/{{$parameter.bookingId}}/refund',
            body: {
              paymentId: '={{$parameter["paymentId"]}}',
              amount: '={{$parameter["amount"]}}',
              currency: '={{$parameter["currency"]}}',
              idempotencyKey: '={{$parameter["idempotencyKey"]}}',
              liveMode: '={{$parameter["liveMode"]}}',
            },
          },
        },
      },
      {
        name: "Add Add-On",
        value: actionBookingAddAddon,
        action: 'Add an addon to a booking',
        description: "Attach an add-on to an existing booking",
        routing: {
          request: {
            method: "POST",
            url: '=/bookings/{{$parameter.bookingId}}/addons',
            body: {
              addonId: '={{$parameter["addonId"]}}',
              quantity: '={{$parameter["quantity"]}}',
            },
          },
        },
      },
      {
        name: "Create Booking",
        value: actionBookingCreateBooking,
        action: "Create a new booking",
        description: "Create a new booking",
        routing: {
          request: {
            method: "POST",
            url: '=/bookings/create',
            body: {
              externalId: '={{$parameter["externalId"]}}',
              product: '={{$parameter["product"]}}',
              tickets: '={{$parameter["tickets"]}}',
              date: '={{$parameter["date"]}}',
              start: '={{$parameter["start"]}}',
              end: '={{$parameter["end"]}}',
              customerName: '={{$parameter["customerName"]}}',
              email: '={{$parameter["email"]}}',
              phone: '={{$parameter["phone"]}}',
              notes: '={{$parameter["notes"]}}',
              postalCode: '={{$parameter["postalCode"]}}',
              country: '={{$parameter["country"]}}',
              optinMarketing: '={{$parameter["optinMarketing"]}}',
              optinSms: '={{$parameter["optinSms"]}}',
              shouldSendEmails: '={{$parameter["shouldSendEmails"]}}',
              markBookingAsPaid: '={{$parameter["markBookingAsPaid"]}}',
              partialPaymentAmount: '={{$parameter["partialPaymentAmount"]}}',
              parentOrderId: '={{$parameter["parentOrderId"]}}',
            },
          },
        },
      },
    ],
    default: 'getMany: bookings (dates)',
  },
  ...bookingGetDescription,
  ...bookingGetRangeDescription,
  ...bookingGetTimeslotDescription,
  ...bookingUpdateCheckinDescription,
  ...bookingUpdateNotesDescription,
  ...bookingCreateDescription,
  ...bookingCancelDescription,
  ...bookingGetPaymentsOnFileDescription,
  ...bookingMakePaymentDescription,
  ...bookingRefundPaymentDescription,
  ...bookingGetInvoiceLinkDescription,
  ...bookingAddAddonDescription,
];
