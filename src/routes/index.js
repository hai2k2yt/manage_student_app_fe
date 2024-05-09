import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// layouts
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
import ClubSessionGuard from '../guards/ClubSessionGuard';

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
  const user = JSON.parse(window.localStorage.getItem('user'))
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
        (user?.role === 1) && {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace />, index: true },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':id/edit', element: <UserUpdate /> },
          ],
        },
        {
          path: 'student',
          children: [
            { element: <Navigate to="/dashboard/student/list" replace />, index: true },
            { path: 'list', element: <StudentList /> },
            { path: ':student_code/detail', element: <StudentDetail /> },
            (user?.role === 1) && { path: 'create', element: <StudentCreate /> },
            (user?.role === 1) && { path: ':student_code/edit', element: <StudentUpdate /> },
            (user?.role === 2) && { path: 'me', element: <StudentMe /> },
            (user?.role === 2) && { path: ':student_code/club/:club_code/absence-report/create', element: <StudentAbsenceCreate /> },
          ],
        },
        (user?.role !== 4) && {
          path: 'class',
          children: [
            { element: <Navigate to="/dashboard/class/list" replace />, index: true },
            { path: 'list', element: <ClassList /> },
            (user?.role === 1) && { path: 'create', element: <ClassCreate /> },
            (user?.role === 1) && { path: ':class_code/edit', element: <ClassUpdate /> },
          ],
        },
        {
          path: 'club',
          children: [
            { element: <Navigate to="/dashboard/club/list" replace />, index: true },
            { path: 'list', element: <ClubList /> },
            (user?.role === 1) && { path: 'create', element: <ClubCreate /> },
            (user?.role === 1 || user?.role === 3) && { path: ':club_code/edit', element: <ClubUpdate /> },
            { path: ':club_code/detail', element: <ClubDetail /> },
            { path: ':club_code/session/create', element: <ClubSessionCreate /> },
            {
              path: ':club_code/session/:session_code',
              element: (
                <ClubSessionGuard />
              ),
              children: [
                { element: <Navigate to="/dashboard/club/:club_code/session/:session_code" replace />, index: true },
                { path: 'detail', element: <ClubSessionDetail /> },
                { path: 'edit', element: <ClubSessionUpdate /> },
                { path: 'absence-report', element: <AbsenceReportList /> },
                { path: 'absence-report/create', element: <AbsenceReportCreate /> },
                { path: 'attendance', element: <AttendanceList /> },
                { path: 'attendance/create', element: <AttendanceCreate /> },
                { path: 'comment/create', element: <CommentCreate /> },
                { path: 'comment/:comment_id/edit', element: <CommentUpdate /> },
                { path: 'photo/create', element: <ClubSessionPhotoCreate /> },
                { path: 'notification', element: <ClubNotificationList /> },
                { path: 'notification/create', element: <ClubNotificationCreate /> },
                { path: 'notification/:noti_id/edit', element: <ClubNotificationList />}
              ]
            },
          ],
        },
        (user?.role === 1 || user?.role === 4) && {
          path: 'statistic',
          children: [
            { element: <Navigate to="/statistic/student" replace />, index: true },
            { path: 'student', element: <StatisticStudent /> },
            { path: 'teacher', element: <StatisticTeacher /> },
          ],
        }
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

const StudentList = Loadable(lazy(() => import('../pages/dashboard/student/StudentList')));
const StudentDetail = Loadable(lazy(() => import('../pages/dashboard/student/StudentDetail')));
const StudentCreate = Loadable(lazy(() => import('../pages/dashboard/student/StudentCreate')));
const StudentUpdate = Loadable(lazy(() => import('../pages/dashboard/student/StudentUpdate')));
const StudentMe = Loadable(lazy(() => import('../pages/dashboard/student/StudentMe')));
const StudentAbsenceCreate = Loadable(lazy(() => import('../pages/dashboard/student/StudentAbsenceCreate')));


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

const StatisticStudent = Loadable(lazy(() => import('../pages/dashboard/statistics/StatisticStudent')));
const StatisticTeacher = Loadable(lazy(() => import('../pages/dashboard/statistics/StatisticTeacher')));


const UserList = Loadable(lazy(() => import('../pages/dashboard/user/UserList')));
const UserUpdate = Loadable(lazy(() => import('../pages/dashboard/user/UserUpdate')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/user/UserCreate')));
// Main
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
