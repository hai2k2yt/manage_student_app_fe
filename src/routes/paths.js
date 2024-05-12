// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  profile: path(ROOTS_DASHBOARD, '/profile'),
  change_password: path(ROOTS_DASHBOARD, '/change-password'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  student: {
    root: path(ROOTS_DASHBOARD, '/student'),
    create: path(ROOTS_DASHBOARD, '/student/create'),
    list: path(ROOTS_DASHBOARD, '/student/list'),
    me: path(ROOTS_DASHBOARD, '/student/me'),
  },
  class: {
    root: path(ROOTS_DASHBOARD, '/class'),
    list: path(ROOTS_DASHBOARD, '/class/list'),
    shop: path(ROOTS_DASHBOARD, '/class/shop'),
    create: path(ROOTS_DASHBOARD, '/class/create'),
    checkout: path(ROOTS_DASHBOARD, '/class/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/class/invoice')
  },
  club: {
    root: path(ROOTS_DASHBOARD, '/club'),
    list: path(ROOTS_DASHBOARD, '/club/list'),
    create: path(ROOTS_DASHBOARD, '/club/create'),
    me: path(ROOTS_DASHBOARD, '/club/me'),
  },
  statistic: {
    root: path(ROOTS_DASHBOARD, '/statistic'),
    student: path(ROOTS_DASHBOARD, '/statistic/student'),
    teacher: path(ROOTS_DASHBOARD, '/statistic/teacher')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
