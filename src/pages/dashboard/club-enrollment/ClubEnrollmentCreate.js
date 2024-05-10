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
import ClubEnrollmentCreateForm from '../../../sections/@dashboard/club/club-enrollment/ClubEnrollmentCreateForm';

// ----------------------------------------------------------------------

export default function ClubSessionCreate() {
  const { themeStretch } = useSettings();
  const {club_code} = useParams();

  return (
    <Page title="Club Enrollment: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Tạo đăng ký CLB'
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            {
              name: 'CLB',
              href: PATH_DASHBOARD.club.root,
            },
            {
              name: 'Chi tiết CLB',
              href: `${PATH_DASHBOARD.club.root}/${club_code}/detail`,
            },
            { name: 'Tạo đăng ký'},
          ]}
        />

        <ClubEnrollmentCreateForm />
      </Container>
    </Page>
  );
}
