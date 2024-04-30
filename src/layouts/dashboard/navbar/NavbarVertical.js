import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer, Stack } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Scrollbar from '../../../components/Scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
//
import NavbarDocs from './NavbarDocs';
import NavbarAccount from './NavbarAccount';
import CollapseButton from './CollapseButton';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

NavbarVertical.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

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

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const theme = useTheme();

  const { user } = useAuth();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      subheader: 'general',
      items: [
        { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      ],
    },

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
      subheader: 'management',
      items: [
        // MANAGEMENT : USER
        ...(user?.role === 1 ? [{
          title: 'user',
          path: PATH_DASHBOARD.user.root,
          icon: ICONS.user,
          children: [
            { title: 'list', path: PATH_DASHBOARD.user.list },
            { title: 'create', path: PATH_DASHBOARD.user.newUser },
          ],
        }] : []),

        // MANAGEMENT : student
        {
          title: 'student',
          path: PATH_DASHBOARD.student.root,
          icon: ICONS.cart,
          children: [
            { title: 'list', path: PATH_DASHBOARD.student.list },
            ...((user?.role === 1) ? [{ title: 'create', path: PATH_DASHBOARD.student.create }] : []),
            ...((user?.role === 2) ? [{ title: 'me', path: PATH_DASHBOARD.student.me }] : []),
          ],
        },

        // MANAGEMENT : class
        {
          title: 'class',
          path: PATH_DASHBOARD.class.root,
          icon: ICONS.cart,
          children: [
            { title: 'list', path: PATH_DASHBOARD.class.list },
            ...((user?.role === 1) ? [{ title: 'create', path: PATH_DASHBOARD.class.create }] : []),
          ],
        },

        ...((user?.role === 1 || user?.role === 4) ? [{
          title: 'statistic',
          path: PATH_DASHBOARD.statistic.root,
          icon: ICONS.cart,
          children: [
            { title: 'student', path: PATH_DASHBOARD.statistic.student },
            { title: 'teacher', path: PATH_DASHBOARD.statistic.teacher },

          ],
        }]: []),
        {
          title: 'club',
          path: PATH_DASHBOARD.club.root,
          icon: ICONS.cart,
          children: [
            { title: 'list', path: PATH_DASHBOARD.club.list },
            ...((user?.role === 1) ? [{ title: 'create', path: PATH_DASHBOARD.club.create }] : []),
          ],
        },
      ],
    },
  ];
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Logo />

          {isDesktop && !isCollapse && (
            <CollapseButton onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />
          )}
        </Stack>

        <NavbarAccount isCollapse={isCollapse} />
      </Stack>

      <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} />

      <Box sx={{ flexGrow: 1 }} />

      {!isCollapse && <NavbarDocs />}
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer open={isOpenSidebar} onClose={onCloseSidebar} PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}>
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: 'dashed',
              bgcolor: 'background.default',
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
