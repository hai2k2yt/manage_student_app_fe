// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import ProfileChangePasswordForm from '../../../sections/@dashboard/profile/ProfileChangePasswordForm';

// ----------------------------------------------------------------------

export default function ProfileUpdate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Profile: Change password">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Đổi mật khẩu'
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.general.app },
            { name: 'Đổi mật khẩu' },
          ]}
        />

        <ProfileChangePasswordForm />
      </Container>
    </Page>
  );
}
