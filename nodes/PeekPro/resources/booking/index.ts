import type { INodeProperties } from 'n8n-workflow';
import { bookingGetDescription } from './getBooking';
import { bookingGetRangeDescription } from './getRange';
import {
  actionBookingGetGuests,
  actionBookingGetOne,
  actionBookingGetRange,
  actionBookingGetTimeslot,
  actionBookingUpdateCheckin,
  actionBookingUpdateNotes,
  resourceBooking,
} from '../resources.constants';
import { bookingUpdateCheckinDescription } from './setCheckin';
import { bookingGetBookingGuestsDescription } from './getGuests';
import { bookingUpdateNotesDescription } from './appendNotes';
import { bookingGetTimeslotDescription } from './getForTimeslot';

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
        value: actionBookingGetRange,
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
          },
        },
      },
      {
        name: "Get Guests",
        value: actionBookingGetGuests,
        action: "Get the guests for a booking",
        description: "Get the guests for a single booking",
        routing: {
          request: {
            method: "GET",
            url: '=/bookings/{{$parameter.bookingId}}/guests',
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
    ],
    default: actionBookingGetRange,
  },
  ...bookingGetDescription,
  ...bookingGetRangeDescription,
  ...bookingGetTimeslotDescription,
  ...bookingUpdateCheckinDescription,
  ...bookingGetBookingGuestsDescription,
  ...bookingUpdateNotesDescription,
];
