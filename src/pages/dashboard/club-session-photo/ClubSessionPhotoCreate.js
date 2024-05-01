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
import ClubSessionPhotoCreateForm
  from '../../../sections/@dashboard/club-session-photo/create/ClubSessionPhotoCreateForm';

// ----------------------------------------------------------------------

export default function ClubSessionPhotoCreate() {
  const { themeStretch } = useSettings();
  const {club_code, session_code} = useParams();

  return (
    <Page title="Photo: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Thêm ảnh buổi học CLB'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'CLB',
              href: PATH_DASHBOARD.club.root,
            },
            {
              name: 'Chi tiết CLB',
              href: `${PATH_DASHBOARD.club.root}/${club_code}/detail`,
            },
            {
              name: 'Chi tiết buổi học',
              href: `${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}`,
            },
            { name: 'Thêm ảnh'},
          ]}
        />

        <ClubSessionPhotoCreateForm />
      </Container>
    </Page>
  );
}
