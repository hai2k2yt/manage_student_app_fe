// @mui
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ClubSessionCreateForm from '../../../sections/@dashboard/club-session/create/ClubSessionCreateForm';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function ClubSessionCreate() {
  const { themeStretch } = useSettings();
  const {club_code} = useParams();

  return (
    <Page title="Club Session: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Create new session'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Club',
              href: PATH_DASHBOARD.club.root,
            },
            {
              name: 'Club detail',
              href: `${PATH_DASHBOARD.club.root}/${club_code}/detail`,
            },
            { name: 'New session'},
          ]}
        />

        <ClubSessionCreateForm />
      </Container>
    </Page>
  );
}
