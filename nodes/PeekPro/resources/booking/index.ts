import type { INodeProperties } from 'n8n-workflow';
import { bookingGetDescription } from './getBooking';
import { bookingGetRangeDescription } from './getRange';
import {
  actionBookingCreate,
  actionBookingGetMetadata,
  actionBookingGetOne,
  actionBookingGetRange,
  actionBookingUpdateCheckin,
  actionBookingUpdateMetadata,
  resourceBooking,
} from '../resources.constants';
import { bookingUpdateCheckinDescription } from './setCheckin';
import { bookingGetBookingMetatadaDescription } from './getMetadata';
import { bookingUpdateBookingMetatadaDescription } from './setMetadata';

const showOnlyForBookings = {
  resource: [resourceBooking],
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
        name: 'Get All for Time Range',
        value: actionBookingGetRange,
        action: 'Get bookings within time range',
        description: 'Get all bookings for a given time range',
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
        name: 'Update Checkin Status',
        value: actionBookingUpdateCheckin,
        action: 'Update the checkin status of a booking',
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
        action: 'Get the metadata of a booking',
        description: 'Get the metadata of a single booking',
        routing: {
          request: {
            method: 'GET',
            url: '=/bookings/{{$parameter.bookingId}}',
          },
        },
      },
      {
        name: 'Set Metadata',
        value: actionBookingUpdateMetadata,
        action: 'Update metadata of a booking',
        description: 'Update the matadata of a single booking',
        routing: {
          request: {
            method: 'GET',
            url: '=/bookings/{{$parameter.bookingId}}',
          },
        },
      },
      {
        name: 'Create',
        value: actionBookingCreate,
        action: 'Create a new booking',
        description: 'Create a new booking',
        routing: {
          request: {
            method: 'GET',
            url: '=/bookings/{{$parameter.bookingId}}',
          },
        },
      },
    ],
    default: actionBookingGetRange,
  },
  ...bookingGetDescription,
  ...bookingGetRangeDescription,
  ...bookingUpdateCheckinDescription,
  ...bookingGetBookingMetatadaDescription,
  ...bookingUpdateBookingMetatadaDescription,
];
