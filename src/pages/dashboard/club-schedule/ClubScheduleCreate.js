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
import ClubScheduleCreateForm from '../../../sections/@dashboard/club-schedule/create/ClubScheduleCreateForm';

// ----------------------------------------------------------------------

export default function ClubScheduleCreate() {
  const { themeStretch } = useSettings();
  const {club_code} = useParams();

  return (
    <Page title="Club Schedule: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Tạo thời khóa biểu CLB'
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
            { name: 'Tạo thời khóa biểu'},
          ]}
        />

        <ClubScheduleCreateForm />
      </Container>
    </Page>
  );
}
