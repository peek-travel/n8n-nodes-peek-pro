import type { INodeProperties } from 'n8n-workflow';
import { bookingGetDescription } from './getBooking';
import { bookingGetRangeDescription } from './getRange';
import { actionBookingCreate, actionBookingGetMetadata, actionBookingGetOne, actionBookingGetRange, actionBookingUpdateCheckin, actionBookingUpdateMetadata, resourceBookings } from '../resources.constants';
import { bookingUpdateCheckinDescription } from './updateCheckin';
import { bookingGetBookingMetatadaDescription } from './getMetadata';
import { bookingUpdateBookingMetatadaDescription } from './updateBookingMetadata';

const showOnlyForBookings = {
  resource: [resourceBookings],
};

export const bookingDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForBookings,
    },
    options: [
      {
        name: 'Get Bookings for Time Range',
        value: actionBookingGetRange,
        action: 'Get Bookings for Time Range',
        description: 'Get many bookings for a given time range',
        routing: {
          request: {
            method: 'GET',
            url: '/bookings',
          },
        },
      },
      {
        name: 'Get One',
        value: actionBookingGetOne,
        action: 'Get one booking',
        description: 'Get the data of a single booking',
        routing: {
          request: {
            method: 'GET',
            url: '=/bookings/{{$parameter.bookingId}}',
          },
        },
      },
      {
        name: 'Update Booking Checkin Status',
        value: actionBookingUpdateCheckin,
        action: 'Update booking checkin status',
        description: 'Update the checkin status of a single booking',
        routing: {
          request: {
            method: 'GET',
            url: '=/bookings/{{$parameter.bookingId}}',
          },
        },
      },
      {
        name: 'Get Metadata',
        value: actionBookingGetMetadata,
        action: 'Get metadata for one booking',
        description: 'Get the metadata of a single booking',
        routing: {
          request: {
            method: 'GET',
            url: '=/bookings/{{$parameter.bookingId}}',
          },
        },
      },
      {
        name: 'Update Metadata',
        value: actionBookingUpdateMetadata,
        action: 'Update metadata for one booking',
        description: 'Update the matadata of a single booking',
        routing: {
          request: {
            method: 'GET',
            url: '=/bookings/{{$parameter.bookingId}}',
          },
        },
      },
      {
        name: 'Create Booking',
        value: actionBookingCreate,
        action: 'Create booking',
        description: 'Create a booking',
        routing: {
          request: {
            method: 'GET',
            url: '=/bookings/{{$parameter.bookingId}}',
          },
        },
      },
    ],
    default: 'getRange',
  },
  ...bookingGetDescription,
  ...bookingGetRangeDescription,
  ...bookingUpdateCheckinDescription,
  ...bookingGetBookingMetatadaDescription,
  ...bookingUpdateBookingMetatadaDescription,
];
