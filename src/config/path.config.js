const PATHS = {

  LANDING: '/',

  SIGN_IN: '/signin',
  SIGN_UP: '/signup',

  HOTEL: '/hotels/:id',
  SEARCH: '/search',

  PROFILE: '/me/profile',
  BOOKING_HISTORY: '/me/booking-history',

  CHECKOUT: '/hotels/:id/checkout',
  PAYMENTS_STATUS: '/payments/:bookingId/status',

  ABOUT: '/about',
  CONTACT: '/contact',
  DESTINATION: '/destination',
  
  ADMIN_HOME: '/admin',
  ADMIN_SIGN_UP:'/admin/signup',
  ADMIN_SIGN_IN:'/admin/signin',
  ADMIN_DASHBOARD:'/admin/dashboard',
  
  UNAUTHORIZED:'/unauthorized'
}

export {PATHS};