import type { INodeProperties } from 'n8n-workflow';
import { actionBookingUpdateMetadata, resourceBooking } from '../resources.constants';

const showOnlyForUpdateBookingMetatada = {
  operation: [actionBookingUpdateMetadata],
  resource: [resourceBooking],
};

export const bookingUpdateBookingMetatadaDescription: INodeProperties[] = [
  {
    displayName: 'Booking ID',
    name: 'bookingId',
    type: 'string',
    displayOptions: { show: showOnlyForUpdateBookingMetatada },
    default: '',
    description: "The ID of the booking to update",
    required: true,
  },
  {
    displayName: 'Metadata Field',
    name: 'metadataField',
    type: 'string',
    displayOptions: { show: showOnlyForUpdateBookingMetatada },
    default: '',
    description: "The field of the booking's metadata field to update",
    required: true,
  },
  {
    displayName: 'New Metadata Value',
    name: 'metadataId',
    type: 'string',
    displayOptions: { show: showOnlyForUpdateBookingMetatada },
    default: '',
    description: "The value of the booking's metadata field to update",
  },
];
