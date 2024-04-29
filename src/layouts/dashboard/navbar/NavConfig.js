// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.newUser },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },

      // MANAGEMENT : student
      {
        title: 'student',
        path: PATH_DASHBOARD.student.root,
        icon: ICONS.cart,
        children: [
          { title: 'list', path: PATH_DASHBOARD.student.list },
          { title: 'create', path: PATH_DASHBOARD.student.create },
        ],
      },

      // MANAGEMENT : class
      {
        title: 'class',
        path: PATH_DASHBOARD.class.root,
        icon: ICONS.cart,
        children: [
          { title: 'shop', path: PATH_DASHBOARD.class.shop },
          { title: 'list', path: PATH_DASHBOARD.class.list },
          { title: 'create', path: PATH_DASHBOARD.class.create },
          { title: 'checkout', path: PATH_DASHBOARD.class.checkout },
          { title: 'invoice', path: PATH_DASHBOARD.class.invoice },
        ],
      },

      {
        title: 'statistic',
        path: PATH_DASHBOARD.statistic.root,
        icon: ICONS.cart,
        children: [
          { title: 'student', path: PATH_DASHBOARD.statistic.student },
          { title: 'teacher', path: PATH_DASHBOARD.statistic.teacher },

        ],
      },

      {
        title: 'club',
        path: PATH_DASHBOARD.club.root,
        icon: ICONS.cart,
        children: [
          { title: 'list', path: PATH_DASHBOARD.club.list },
          { title: 'create', path: PATH_DASHBOARD.club.create },
        ],
      },
      {
        title: 'blog',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.postById },
          { title: 'new post', path: PATH_DASHBOARD.blog.newPost },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: (
          <Label variant="outlined" color="error">
            +32
          </Label>
        ),
      },
      { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },

    ],
  },
];

export default navConfig;
