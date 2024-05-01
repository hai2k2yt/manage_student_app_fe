// @mui
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ClubCreateForm from '../../../sections/@dashboard/club/create/ClubCreateForm';

// ----------------------------------------------------------------------

export default function ClubCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="CLub: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Tạo CLB'
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            {
              name: 'CLB',
              href: PATH_DASHBOARD.club.root,
            },
            { name: 'Tạo mới'},
          ]}
        />

        <ClubCreateForm />
      </Container>
    </Page>
  );
}
