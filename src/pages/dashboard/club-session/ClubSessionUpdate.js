import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ClubSessionUpdateForm from '../../../sections/@dashboard/club-session/update/ClubSessionUpdateForm';

// ----------------------------------------------------------------------

export default function ClubSessionUpdate() {
  const { themeStretch } = useSettings();
  const {club_code} = useParams();
  return (
    <Page title="Club Session: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Edit club session'
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
            { name: 'Update session' },
          ]}
        />

        <ClubSessionUpdateForm />
      </Container>
    </Page>
  );
}
