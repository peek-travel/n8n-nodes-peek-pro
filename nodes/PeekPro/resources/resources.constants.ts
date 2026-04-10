export const resourceBooking = 'booking';
export const resourceProduct = 'product';
export const resourceUser = 'user';
export const resourceAccount = 'account';
export const resourceTimeslot = 'timeslot';
export const resourceDailyNote = 'dailyNote';
export const resourceReseller = 'reseller';
export const resourcePromoCode = 'promoCode';

export const actionBookingGetOne = 'get: booking';
export const actionBookingGetRange = 'getMany: bookings (dates)';
export const actionBookingGetTimeslot = 'getMany: bookings (timeslot)';
export const actionBookingUpdateNotes = 'set: booking notes';
export const actionBookingUpdateCheckin = 'set: booking checkin';
export const actionBookingCreateBooking = 'create: booking';
export const actionBookingCancel = 'cancel: booking';
export const actionBookingGetPaymentsOnFile = 'get: booking payments on file';
export const actionBookingMakePayment = 'create: booking payment';

export const actionUserGetOne = 'get: user';
export const actionUserGetAll = 'getAll: users';

export const actionDailyNoteGetToday = 'get: daily note';
export const actionDailyNoteSetToday = 'set: daily note';

export const actionAccountGetCurrent = 'get: current account';

export const actionTimeslotGetDate = 'getMany: timeslots';
export const actionTimeslotGetOne = 'get: timeslot';
export const actionTimeslotSetAvailability = 'set: timeslot availability';
export const actionTimeslotSetNotes = 'set: timeslot notes';
export const actionTimeslotSetGuide = 'set: timeslot guide';

export const actionProductGetAll = 'getAll: products';
export const actionProductGetOne = 'get: product';

export const actionResellerGetAll = 'getAll: reseller';

export const actionPromoCodeGetAll = 'getAll: promoCode';
export const actionPromoCodeCreate = 'create: promoCode';
