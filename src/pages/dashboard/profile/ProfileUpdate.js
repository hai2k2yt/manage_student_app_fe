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
import ProfileUpdateForm from '../../../sections/@dashboard/profile/ProfileUpdateForm';

// ----------------------------------------------------------------------

export default function ProfileUpdate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Profile: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Cập nhật thông tin cá nhân'
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.general.app },
            { name: 'Cập nhật thông tin cá nhân' },
          ]}
        />

        <ProfileUpdateForm />
      </Container>
    </Page>
  );
}
