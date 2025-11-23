export const resourceBooking = 'booking';
export const resourceProduct = 'product';
export const resourceUser = 'user';
export const resourceAccount = 'account';
export const resourceTimeslot = 'timeslot';
export const resourceDailyNote = 'dailyNote';

export const actionBookingGetOne = 'get: booking';
export const actionBookingGetRange = 'getMany: bookings (dates)';
export const actionBookingGetTimeslot = 'getMany: bookings (timeslot)';
export const actionBookingUpdateNotes = 'set: booking notes';
export const actionBookingUpdateCheckin = 'set: booking checkin';
export const actionBookingGetGuests = 'get: booking guests';
export const actionBookingCreate = 'create: booking';

export const actionUserGetOne = 'get: user';
export const actionUserGetAll = 'getAll: users';

export const actionDailyNoteGetToday = 'get: daily note';
export const actionDailyNoteSetToday = 'set: daily note';

export const actionAccountGetCurrent = 'get: current account';

export const actionTimeslotGetDate = 'getMany: timeslots';
export const actionTimeslotGetOne = 'get: timeslot';
export const actionTimeslotSetAvailability = 'set: timeslot availability';
export const actionTimeslotSetNotes = 'set: timeslot notes';

export const actionProductGetAll = 'getAll: products';
export const actionProductGetOne = 'get: product';
