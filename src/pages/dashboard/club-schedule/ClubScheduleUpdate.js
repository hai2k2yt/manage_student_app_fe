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
import ClubScheduleUpdateForm from '../../../sections/@dashboard/club-schedule/update/ClubScheduleUpdateForm';

// ----------------------------------------------------------------------

export default function ClubScheduleUpdate() {
  const { themeStretch } = useSettings();
  const {club_code} = useParams();
  return (
    <Page title="Club Schedule: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Cập nhật thời khóa biểu CLB'
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
            { name: 'Cập nhật thời khóa biểu' },
          ]}
        />

        <ClubScheduleUpdateForm />
      </Container>
    </Page>
  );
}
