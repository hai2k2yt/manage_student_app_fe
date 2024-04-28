import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':id/edit', element: <UserUpdate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'class',
          children: [
            { element: <Navigate to="/dashboard/class/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <ClassList /> },
            { path: 'create', element: <ClassCreate /> },
            { path: ':class_code/edit', element: <ClassUpdate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
            { path: 'invoice', element: <EcommerceInvoice /> },
          ],
        },
        {
          path: 'club',
          children: [
            { element: <Navigate to="/dashboard/club/list" replace />, index: true },
            { path: 'list', element: <ClubList /> },
            { path: 'create', element: <ClubCreate /> },
            { path: ':club_code/edit', element: <ClubUpdate /> },
            { path: ':club_code/detail', element: <ClubDetail /> },
            { path: ':club_code/session/create', element: <ClubSessionCreate /> },
            { path: ':club_code/session/:session_code/detail', element: <ClubSessionDetail /> },
            { path: ':club_code/session/:session_code/edit', element: <ClubSessionUpdate /> },
            { path: ':club_code/session/:session_code/absence-report', element: <AbsenceReportList /> },
            { path: ':club_code/session/:session_code/absence-report/create', element: <AbsenceReportCreate /> },
            { path: ':club_code/session/:session_code/attendance', element: <AttendanceList /> },
            { path: ':club_code/session/:session_code/attendance/create', element: <AttendanceCreate /> },
            { path: ':club_code/session/:session_code/comment/create', element: <CommentCreate /> },
            { path: ':club_code/session/:session_code/comment/:comment_id/edit', element: <CommentUpdate /> },
            { path: ':club_code/session/:session_code/photo/create', element: <ClubSessionPhotoCreate /> },
            { path: ':club_code/session/:session_code/notification', element: <ClubNotificationList /> },
            { path: ':club_code/session/:session_code/notification/create', element: <ClubNotificationCreate /> },
            { path: ':club_code/session/:session_code/notification/:noti_id/edit', element: <ClubNotificationList /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Chat />, index: true },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> },
          ],
        },
        { path: 'calendar', element: <Calendar /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/auth/login" replace />, index: true },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));

const ClassList = Loadable(lazy(() => import('../pages/dashboard/class/ClassList')));
const ClassCreate = Loadable(lazy(() => import('../pages/dashboard/class/ClassCreate')));
const ClassUpdate = Loadable(lazy(() => import('../pages/dashboard/class/ClassUpdate')));

const ClubList = Loadable(lazy(() => import('../pages/dashboard/club/ClubList')));
const ClubCreate = Loadable(lazy(() => import('../pages/dashboard/club/ClubCreate')));
const ClubUpdate = Loadable(lazy(() => import('../pages/dashboard/club/ClubUpdate')));
const ClubDetail = Loadable(lazy(() => import('../pages/dashboard/club/ClubDetail')));

const ClubSessionCreate = Loadable(lazy(() => import('../pages/dashboard/club-session/ClubSessionCreate')));
const ClubSessionUpdate = Loadable(lazy(() => import('../pages/dashboard/club-session/ClubSessionUpdate')));
const ClubSessionDetail = Loadable(lazy(() => import('../pages/dashboard/club-session/ClubSessionDetail')));


const AbsenceReportList = Loadable(lazy(() => import('../pages/dashboard/absence-report/AbsenceReportList')));
const AbsenceReportCreate = Loadable(lazy(() => import('../pages/dashboard/absence-report/AbsenceReportCreate')));

const AttendanceList = Loadable(lazy(() => import('../pages/dashboard/attendance/AttendanceList')));
const AttendanceCreate = Loadable(lazy(() => import('../pages/dashboard/attendance/AttendanceCreate')));

const CommentCreate = Loadable(lazy(() => import('../pages/dashboard/comment/CommentCreate')));
const CommentUpdate = Loadable(lazy(() => import('../pages/dashboard/comment/CommentUpdate')));

const ClubNotificationList = Loadable(lazy(() => import('../pages/dashboard/club-notification/ClubNotificationList')));
const ClubNotificationCreate = Loadable(lazy(() => import('../pages/dashboard/club-notification/ClubNotificationCreate')));
const ClubNotificationUpdate = Loadable(lazy(() => import('../pages/dashboard/club-notification/ClubNotificationUpdate')));

const ClubSessionPhotoList = Loadable(lazy(() => import('../pages/dashboard/club-session-photo/ClubSessionPhotoList')));
const ClubSessionPhotoCreate = Loadable(lazy(() => import('../pages/dashboard/club-session-photo/ClubSessionPhotoCreate')));

const StatisticOverall = Loadable(lazy(() => import('../pages/dashboard/statistics/StatisticOverall')));
const StatisticStudent = Loadable(lazy(() => import('../pages/dashboard/statistics/StatisticStudent')));
const StatisticTeacher = Loadable(lazy(() => import('../pages/dashboard/statistics/StatisticTeacher')));

const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));
const EcommerceInvoice = Loadable(lazy(() => import('../pages/dashboard/EcommerceInvoice')));
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/user/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/user/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/user/UserList')));
const UserUpdate = Loadable(lazy(() => import('../pages/dashboard/user/UserUpdate')));

const UserAccount = Loadable(lazy(() => import('../pages/dashboard/user/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/user/UserCreate')));
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
// Main
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
