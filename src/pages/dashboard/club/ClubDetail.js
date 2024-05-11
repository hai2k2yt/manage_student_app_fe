import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { ClubSessionList } from '../../../sections/@dashboard/club-session/list';
import Iconify from '../../../components/Iconify';
import ClubEnrollmentList from '../../../sections/@dashboard/club/club-enrollment/ClubEnrollmentList';
import ClubScheduleList from '../../../sections/@dashboard/club-schedule/list/ClubScheduleList';

// ----------------------------------------------------------------------

export default function ClubDetail() {
  const { themeStretch } = useSettings();
  const { club_code } = useParams();

  return (
    <Page title="Club: Detail">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết CLB"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'CLB', href: PATH_DASHBOARD.club.root },
            { name: 'Chi tiết' },
          ]}
        />

        <Stack direction="row" justifyContent="space-between">
          <Typography>Thời khóa biểu</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`${PATH_DASHBOARD.club.root}/${club_code}/schedule/create`}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            Tạo mới
          </Button>
        </Stack>

        <ClubScheduleList />

        <Stack direction="row" justifyContent="space-between">
          <Typography>Buổi học CLB</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`${PATH_DASHBOARD.club.root}/${club_code}/session/create`}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            Tạo mới
          </Button>
        </Stack>

        <ClubSessionList clubCode={club_code} />

        <Stack direction="row" justifyContent="space-between">
          <Typography>Danh sách đăng ký CLB</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`${PATH_DASHBOARD.club.root}/${club_code}/enrollment/create`}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            Tạo mới
          </Button>
        </Stack>

        <ClubEnrollmentList />
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------