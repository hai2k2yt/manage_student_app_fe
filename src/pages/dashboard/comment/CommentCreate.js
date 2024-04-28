// @mui
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { useParams } from 'react-router-dom';
import AbsenceReportCreateForm from '../../../sections/@dashboard/absence-report/create/AbsenceReportCreateForm';
import CommentCreateForm from '../../../sections/@dashboard/comment/create/CommentCreateForm';

// ----------------------------------------------------------------------

export default function CommentCreate() {
  const { themeStretch } = useSettings();
  const {club_code, session_code} = useParams();

  return (
    <Page title="Comment: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Create new comment'
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
            {
              name: 'Session detail',
              href: `${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}`,
            },
            { name: 'New comment'},
          ]}
        />

        <CommentCreateForm />
      </Container>
    </Page>
  );
}
