import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import Home from './home';
import Header from '@/components/layouts/header.layout';
import Footer from '@/components/layouts/footer.layout';
import SearchPage from './search';
import HotelDetails from './hotel-details';
import { SignInPage, SignUpPage } from './auth';
import { PATHS } from '@/config/path.config';
import CheckoutPage from './checkout';
import { WithAuthProvider } from '@/lib/providers/auth-context-provider';
import WithSearchLayout from '@/components/layouts/with-search-layput';
import Aboutus from './aboutus';
import ContactUs from './contactus';
import DestinationPage from './destination';
import PaymentStatus from './payments';
import BookingHistory from './bookinghistory';
import Profile from './profile';
import AdminRouter from './admin-router';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<WithSearchLayout />}>
          <Route path={PATHS.SEARCH} element={<SearchPage />} />
          <Route path={PATHS.HOTEL} element={<HotelDetails />} />
        </Route>

        <Route path={PATHS.SIGN_IN} element={<SignInPage />} />
        <Route path={PATHS.SIGN_UP} element={<SignUpPage />} />
        <Route path={PATHS.ABOUT} element={<Aboutus />} />
        <Route path={PATHS.CONTACT} element={<ContactUs />} />
        <Route path={PATHS.DESTINATION} element={<DestinationPage />} />
        <Route path={PATHS.BOOKING_HISTORY} element={<BookingHistory />} />
        <Route path={PATHS.PROFILE} element={<Profile />} />

        <Route element={<WithAuthProvider />}>
          <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
          <Route path={PATHS.PAYMENTS_STATUS} element={<PaymentStatus />} />
        </Route>

        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default Router;
