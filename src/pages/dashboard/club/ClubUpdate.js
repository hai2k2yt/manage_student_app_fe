// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ClubUpdateForm from '../../../sections/@dashboard/club/update/ClubUpdateForm';

// ----------------------------------------------------------------------

export default function ClubUpdate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Edit club">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Cập nhật CLB'
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            {
              name: 'CLB',
              href: PATH_DASHBOARD.club.list,
            },
            { name: 'Cập nhật' },
          ]}
        />

        <ClubUpdateForm />
      </Container>
    </Page>
  );
}
