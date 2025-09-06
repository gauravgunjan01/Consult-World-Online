import { useTranslation } from 'react-i18next';
import React, { useEffect, Suspense, lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { LoadScript } from '@react-google-maps/api';
import { google_api_keys, user_role } from './utils/constants';
import { generateTokenByRequestPermission, onMessageListener } from './config/firebase-config';
import SocketService from './utils/services/socket-service';
import * as UserActions from './redux/actions/userAction';
import * as CommonActions from './redux/actions/commonAction';
import BgBanner from './assets/images/common/bg-banner.png';

// TODO : Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loading from './components/features/Loading';
import NotFound from './components/features/NotFound';
// import CallInvoiceModal from './components/modal/CallInvoiceModal';
import ScrollToTop from './components/features/ScrollToTop';
import ProtectedRouteCustomer from './utils/protected-routes/customer';
import ProtectedRouteAstrologer from './utils/protected-routes/astrologer';
import DownloadApp from './components/features/DownloadApp';
// import CallRating from './components/features/CallRating';
// import AstrologerSignup from './pages/astrologer-dashboard/astrologer-signup';
import AstrologerLoginModal from './components/modal/AstrologerLoginModal';
import CustomerLoginModal from './components/modal/CustomerLoginModal';
import Breadcrumbs from './components/common/Breadcrumbs';
import SocialMedia from './components/common/SocialMedia';
import InitiatedRequest from './pages/consultation/components/InitiatedRequest';
import IncomingRequest from './pages/consultation/components/IncomingRequest';
// import VideocallInvoiceModal from './components/modal/VideocallInvoiceModal';
// import ChatRating from './components/features/ChatRating';

//! Lazy Load Pages
const LandingPage = lazy(() => import('./pages/landing-page'));
// const PremiumService = lazy(() => import('./pages/premium-service'));
// const PremiumServiceEnquiry = lazy(() => import('./pages/premium-service/enquiry'));

// //! Customer
const CustomerMyAccount = lazy(() => import('./pages/my-account'));
// const CustomerMyMessage = lazy(() => import('./pages/my-message'));
// const CustomerChatMessage = lazy(() => import('./pages/my-message/chat-message'));
// const CustomerTransactionHistory = lazy(() => import('./pages/transaction-history'));
// const CustomerChatSummary = lazy(() => import('./pages/transaction-history/chat-summary'));
// const WhatsappChatSummary = lazy(() => import('./pages/transaction-history/whatsapp-chat-summary'));
// const CustomerWalletHistory = lazy(() => import('./pages/wallet-history'));
// const CustomerMyOrderPuja = lazy(() => import('./pages/my-order/puja'));
// const CustomerMyOrderAstromall = lazy(() => import('./pages/my-order/astro-mall'));

// //! Recharge 
// const Recharge = lazy(() => import('./pages/recharge'));
// const PaymentDetail = lazy(() => import('./pages/recharge/payment-detail'));

// //! Astrologer Dashboard
const AstrologerMyAccount = lazy(() => import('./pages/astrologer-dashboard/my-account'));
// const AstrologerQueuelist = lazy(() => import('./pages/astrologer-dashboard/queue-list'));
// const AstrologerMyMessage = lazy(() => import('./pages/astrologer-dashboard/my-message'));
// const AstrologerQueueChatMessage = lazy(() => import('./pages/astrologer-dashboard/my-message/queue-chat-message'));
// const AstrologerTransactionHistory = lazy(() => import('./pages/astrologer-dashboard/transaction-history'));
// const AstrologerWalletHistory = lazy(() => import('./pages/astrologer-dashboard/wallet-history'));
// const AstrologerRegisterPujaHistory = lazy(() => import('./pages/astrologer-dashboard/register-puja-history'));
// const AstrologerAssignedPujaHistory = lazy(() => import('./pages/astrologer-dashboard/assigned-puja-history'));
// const AstrologerBookPujaHistory = lazy(() => import('./pages/astrologer-dashboard/book-puja-history'));

// //! Astrologer
const Astrologer = lazy(() => import('./pages/astrologer'));
const SingleAstrologer = lazy(() => import('./pages/astrologer/name'));
const IntakeForm = lazy(() => import('./pages/astrologer/intake-form'));

// //! Consultation
// const ChatConsultation = lazy(() => import('./pages/consultation/chat-consultation'));
// const VideocallConsultation = lazy(() => import('./pages/consultation/video-call-consultation'));
// const VoiceCallConsultation = lazy(() => import('./pages/consultation/voice-call-consulation'));

// //! Free Kundli
// const FreeKundli = lazy(() => import('./pages/free-kundli'));
// const KundliId = lazy(() => import('./pages/free-kundli/kundliId'));

// //! Kundli Matching 
// const KundliMatching = lazy(() => import('./pages/kundli-matching'));
// const KundliMatchingReports = lazy(() => import('./pages/kundli-matching/reports'));

// //! Numerology
// const Numerology = lazy(() => import('./pages/numerology'));

// //! Panchang & Muhurat
// const PanchangAndMuhurat = lazy(() => import('./pages/panchang-and-muhurat'));

// //! Horoscope 
// const Horoscope = lazy(() => import('./pages/horoscope-new'));
// const HoroscopeDetails = lazy(() => import('./pages/horoscope-new/HoroscopeDetails'));

// //! Astromall
// const Astromall = lazy(() => import('./pages/astro-mall/index'));
// const AstromallProducts = lazy(() => import('./pages/astro-mall/products'));
// const AstromallProductDetails = lazy(() => import('./pages/astro-mall/products/product-details'));
// const AstromallCart = lazy(() => import('./pages/astro-mall/cart'));
// const AstromallAddress = lazy(() => import('./pages/astro-mall/address'));

// //! Book Puja
// const SuggestedPuja = lazy(() => import('./pages/suggested-puja'));
// const BookPuja = lazy(() => import('./pages/book-puja'));
// const BookPujaDetails = lazy(() => import('./pages/book-puja/puja-details'));
// const RegisterPuja = lazy(() => import('./pages/register-puja'));
// const RegisterPujaDetails = lazy(() => import('./pages/register-puja/puja-details'));

// const Cart = lazy(() => import('./pages/book-puja/cart'));
// const Address = lazy(() => import('./pages/book-puja/address'));

// //! Blog 
// const Blog = lazy(() => import('./pages/blog'));
// const BlogDetails = lazy(() => import('./pages/blog/blog-details'));

// //! Important Links
// const ImportantLinks = lazy(() => import('./pages/important-links'));

// //! Shubh Muhurat
// const ShubhMuhurat = lazy(() => import('./pages/shubh-muhurat'));

// //! Static Page 
// const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'));
// const TermsOfUse = lazy(() => import('./pages/terms-of-use'));
// const AboutUs = lazy(() => import('./pages/about-us'));

const LIBRARIES = ['places'];

const App = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const { userCustomerDetails, userAstrologerDetails } = useSelector(state => state?.userReducer);
  const { callIntakeDetailData } = useSelector(state => state?.consultationReducer);
  const { webLanguageData } = useSelector(state => state?.commonReducer);
  const { initiatedRequestData, incomingRequestData, astrologerRatingVisibility } = useSelector(state => state?.consultationReducer);

  useEffect(() => {
    generateTokenByRequestPermission();
    onMessageListener(navigate, dispatch); //! Listen for foreground messages

    if (userCustomerDetails?._id) {
      //! Initialize Socket for customer
      console.log(`Initialize Socket for customer`);
      SocketService.initializeSocket(dispatch, navigate, userCustomerDetails._id, 'Customer');
    } else if (userAstrologerDetails?._id) {
      //! Initialize Socket for astrologer
      console.log(`Initialize Socket for astrologer`);
      SocketService.initializeSocket(dispatch, navigate, userAstrologerDetails?._id, 'Astrologer');
    }

  }, [dispatch, navigate, userCustomerDetails, userAstrologerDetails]);

  // useEffect(() => {
  //   userCustomerDetails && dispatch(UserActions?.getUserCustomerCompletedQueueList());
  // }, [userCustomerDetails]);

  // useEffect(() => {
  //   userAstrologerDetails && dispatch(UserActions?.getUserAstrologerPendingQueueList());
  // }, [userAstrologerDetails]);

  useEffect(() => {
    const local_user_role = localStorage.getItem(user_role);

    if (local_user_role == 'Customer') dispatch(UserActions.getUserCustomerDetails());
    if (local_user_role == 'Astrologer') dispatch(UserActions.getUserAstrologerDetails());

    // TODO: Remove Focus On Wheel Rotation - Input type:number
    const handleWheel = (e) => {
      if (document.activeElement.type === 'number') {
        e.preventDefault(); // Stop scroll action
        document.activeElement.blur(); // Blur the input
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    dispatch(CommonActions?.webLanguage(localStorage?.getItem('web_language') || webLanguageData));
    i18n?.changeLanguage(localStorage?.getItem('web_language') || webLanguageData);
  }, [webLanguageData]);

  //! Scrolling 
  const scrollToSection = (sectionId) => {
    console.log("Section ID ::: ", sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      setTimeout(() => {
        const homeSection = document.getElementById(sectionId);
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <>
      <LoadScript googleMapsApiKey={google_api_keys} libraries={LIBRARIES} loadingElement={<Loading />}>
        <Suspense fallback={<Loading />}>
          {!location?.pathname.startsWith('/astrologer-dashboard') && <Header />}

          {!location?.pathname.startsWith('/astrologer-dashboard') && < Breadcrumbs />}
          <ScrollToTop>
            <section className={`w-full bg-fixed bg-cover bg-center ${!location?.pathname?.startsWith('/astrologer-dashboard') && 'px-5'} min-h-screen`}>
              <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<LandingPage />} />

                {/* <Route path='/consultant-signup' element={<AstrologerSignup />} />
                <Route path='/premium-service' element={<PremiumService />} />
                <Route path='/premium-service/enquiry' element={<PremiumServiceEnquiry />} /> */}

                {/* Customer */}
                {/* <Route path='/my-account' element={<ProtectedRouteCustomer><CustomerMyAccount /></ProtectedRouteCustomer>} />
                <Route path='/my-message' element={<ProtectedRouteCustomer><CustomerMyMessage /></ProtectedRouteCustomer>} />
                <Route path='/my-message/chat-message' element={<ProtectedRouteCustomer><CustomerChatMessage /></ProtectedRouteCustomer>} />
                <Route path='/transaction-history' element={<ProtectedRouteCustomer><CustomerTransactionHistory /></ProtectedRouteCustomer>} />
                <Route path='/transaction-history/chat-summary' element={<ProtectedRouteCustomer><CustomerChatSummary /></ProtectedRouteCustomer>} />
                <Route path='/transaction-history/whatsapp-chat-summary' element={<WhatsappChatSummary />} />
                <Route path='/wallet-history' element={<ProtectedRouteCustomer><CustomerWalletHistory /></ProtectedRouteCustomer>} />
                <Route path='/my-order/puja' element={<ProtectedRouteCustomer><CustomerMyOrderPuja /></ProtectedRouteCustomer>} />
                <Route path='/my-order/astro-mall' element={<ProtectedRouteCustomer><CustomerMyOrderAstromall /></ProtectedRouteCustomer>} /> */}

                {/* Recharge */}
                {/* <Route path='/recharge' element={<ProtectedRouteCustomer><Recharge /></ProtectedRouteCustomer>} />
                <Route path='/recharge/payment-details' element={<ProtectedRouteCustomer><PaymentDetail /></ProtectedRouteCustomer>} /> */}

                {/* Astrologer Dashboard */}
                <Route path="/astrologer-dashboard" exact element={<ProtectedRouteAstrologer />}>
                  <Route path='*' element={<NotFound />} />
                  <Route path='my-account' element={<AstrologerMyAccount />} />
                  {/* <Route path='queue-list' element={<AstrologerQueuelist />} />
                  <Route path='my-message' element={<AstrologerMyMessage />} />
                  <Route path='my-message/queue-chat-message' element={<AstrologerQueueChatMessage />} />
                  <Route path='transaction-history' element={<AstrologerTransactionHistory />} />
                  <Route path='wallet-history' element={<AstrologerWalletHistory />} />
                  <Route path='register-puja-history' element={<AstrologerRegisterPujaHistory />} />
                  <Route path='assigned-puja-history' element={<AstrologerAssignedPujaHistory />} />
                  <Route path='book-puja-history' element={<AstrologerBookPujaHistory />} /> */}
                </Route>

                {/* Astrologer */}
                <Route path='/consultant' element={<Astrologer />} />
                <Route path='/talk-to-consultant' element={<Astrologer />} />
                <Route path='/chat-with-consultant' element={<Astrologer />} />
                <Route path='/video-call-with-consultant' element={<Astrologer />} />
                <Route path='/astrologer/details' element={<SingleAstrologer />} />
                <Route path='/astrologer/intake-form/:astrologerId' element={<ProtectedRouteCustomer><IntakeForm /></ProtectedRouteCustomer>} />

                {/* Consultation */}
                {/* <Route path='/consultation/chat-consultation' element={<ChatConsultation />} />
                <Route path='/consultation/video-call-consultation' element={<VideocallConsultation />} />
                <Route path='/consultation/voice-call-consultation' element={<VoiceCallConsultation />} /> */}

                {/* Free Kundli */}
                {/* <Route path='/kundli' element={<FreeKundli />} />
                <Route path='/kundli/kundli-details' element={<KundliId />} /> */}

                {/* Kundli Matching */}
                {/* <Route path='/kundli-matching' element={<KundliMatching />} />
                <Route path='/kundli-matching/reports/:profileId' element={<KundliMatchingReports />} /> */}

                {/* Numerology */}
                {/* <Route path='/numerology' element={<Numerology />} /> */}

                {/* Panchang & Muhurat */}
                {/* <Route path='/panchang-and-muhurat' element={<PanchangAndMuhurat />} /> */}

                {/*Horoscope */}
                {/* <Route path='/horoscope' element={<Horoscope />} />
                <Route path='/horoscope/:zodiacSign' element={<HoroscopeDetails />} /> */}

                {/* Astromall */}
                {/* <Route path='/astro-mall' element={<ProtectedRouteCustomer><Astromall /></ProtectedRouteCustomer>} />
                <Route path='/astro-mall/products' element={<ProtectedRouteCustomer><AstromallProducts /></ProtectedRouteCustomer>} />
                <Route path='/astro-mall/products/product-details' element={<ProtectedRouteCustomer><AstromallProductDetails /></ProtectedRouteCustomer>} />
                <Route path='/astro-mall/cart' element={<AstromallCart />} />
                <Route path='/astro-mall/cart/address' element={<AstromallAddress />} /> */}

                {/* Book Puja */}
                {/* <Route path='/suggested-puja' element={<ProtectedRouteCustomer><SuggestedPuja /></ProtectedRouteCustomer>} />
                <Route path='/book-puja' element={<ProtectedRouteCustomer><BookPuja /></ProtectedRouteCustomer>} />
                <Route path='/book-puja/puja-details' element={<ProtectedRouteCustomer><BookPujaDetails /></ProtectedRouteCustomer>} /> */}

                {/* Register Puja */}
                {/* <Route path='/register-puja' element={<ProtectedRouteAstrologer><RegisterPuja /></ProtectedRouteAstrologer>} />
                <Route path='/register-puja/puja-details' element={<ProtectedRouteAstrologer><RegisterPujaDetails /></ProtectedRouteAstrologer>} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/cart/address' element={<Address />} />
                <Route path='/astro-book-store' element={<div className='min-h-40 text-black text-center pt-40 '>Coming Soon....</div>} /> */}

                {/* Important Links */}
                {/* <Route path='/important-links' element={<ImportantLinks />} /> */}

                {/* Shubh Muhurat */}
                {/* <Route path='/shubh-muhurat' element={<ShubhMuhurat />} /> */}

                {/* Blog */}
                {/* <Route path='/blog' element={<Blog />} />
                <Route path='/blog/blog-details' element={<BlogDetails />} /> */}

                {/* Pages */}
                {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsOfUse />} />
                <Route path="/about-us" element={<AboutUs />} /> */}
              </Routes>
            </section>
          </ScrollToTop>
        </Suspense>
        {/* {(location?.pathname !== '/chat' && location?.pathname !== '/transaction-history/chat-summary' && location?.pathname !== '/transaction-history/whatsapp-chat-summary') && <NewsLetter />} */}
        {(location?.pathname !== '/chat' && location?.pathname !== '/consultation/chat-consultation' && location?.pathname !== '/transaction-history/chat-summary' && location?.pathname !== '/transaction-history/whatsapp-chat-summary' && !location?.pathname.startsWith('/astrologer-dashboard')) && <Footer scrollToSection={scrollToSection} />}

        {!location?.pathname.startsWith('/astrologer-dashboard') && <SocialMedia />}
        <AstrologerLoginModal />
        <CustomerLoginModal />
        <DownloadApp />
        {/* <CallInvoiceModal />
        <VideocallInvoiceModal /> */}
        {/* {localStorage.getItem('user_type') == 'customer' && astrologerRatingVisibility?.type == 'VIDEO_CALL' && astrologerRatingVisibility?.ratingVisible && <ChatRating />}
        {localStorage.getItem('user_type') == 'customer' && astrologerRatingVisibility?.type == 'CHAT' && astrologerRatingVisibility?.ratingVisible && <ChatRating />} */}
        {initiatedRequestData?.initiated && <InitiatedRequest />}
        {incomingRequestData?.incoming && <IncomingRequest />}
        <ToastContainer />
        {/* {astrologerRatingVisibility?.type == 'CALL' && <CallRating />} */}

        {callIntakeDetailData?.visible && location?.pathname !== '/kundli' && location?.pathname !== '/kundli/kundli-details' && <div onClick={() => navigate(`/kundli/kundli-details?kundliId=${callIntakeDetailData?.profileId}&type=intake-details`)} className='p-5 py-2 right-[50px] bottom-[50px] bg-primary fixed z-[1000] cursor-pointer rounded-md text-white'>Intake Detail</div>}
      </LoadScript>
    </>
  )
}

export default App;