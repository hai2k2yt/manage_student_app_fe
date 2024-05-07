// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import UserUpdateForm from '../../../sections/@dashboard/user/UserUpdateForm';
import ProfileUpdateForm from '../../../sections/@dashboard/user/update-profile/ProfileUpdateForm';

// ----------------------------------------------------------------------

export default function UserUpdate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="User: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Cập nhật thông tin cá nhân'
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Cập nhật thông tin cá nhân' },
          ]}
        />

        <ProfileUpdateForm />
      </Container>
    </Page>
  );
}
