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
          heading='Create a new club'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Club',
              href: PATH_DASHBOARD.club.root,
            },
            { name: 'New club'},
          ]}
        />

        <ClubCreateForm />
      </Container>
    </Page>
  );
}
