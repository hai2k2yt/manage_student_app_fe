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

// ----------------------------------------------------------------------

export default function UserUpdate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="User: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Edit user'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: 'Edit user' },
          ]}
        />

        <UserUpdateForm />
      </Container>
    </Page>
  );
}
