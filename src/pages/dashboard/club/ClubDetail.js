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
import { useEffect, useState } from 'react';
import { showClub } from '../../../api/club';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function ClubDetail() {
  const { themeStretch } = useSettings();
  const { club_code } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const user = JSON.parse(localStorage.getItem('user'));
  const [clubDetail, setClubDetail] = useState({});

  useEffect(() => {
    fetchClubDetail();
  }, []);

  const fetchClubDetail = async () => {
    try {
      const res = await showClub(club_code);
      setClubDetail(res?.data);
    } catch (e) {
      enqueueSnackbar('Lấy thông tin chi tiết CLB thất bại!', { variant: 'error' });
      if (typeof e?.errors == 'object') {
        for (let message of Object.values(e?.errors)) {
          enqueueSnackbar(message, { variant: 'error' });
        }
      }
    }
  };
  const canEditSchedule = (user.role == 1 || (user.role == 3 && user?.code == clubDetail?.teacher_code));

  const canEditEnrollment = (user.role == 1 || (user.role == 3 && user?.code == clubDetail?.teacher_code));


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
          {
            canEditSchedule &&
            <Button
              variant="contained"
              component={RouterLink}
              to={`${PATH_DASHBOARD.club.root}/${club_code}/schedule/create`}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Tạo mới
            </Button>
          }
        </Stack>

        <ClubScheduleList editable={canEditSchedule}/>

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
          {
            canEditEnrollment &&
            <Button
              variant="contained"
              component={RouterLink}
              to={`${PATH_DASHBOARD.club.root}/${club_code}/enrollment/create`}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Tạo mới
            </Button>
          }
        </Stack>

        <ClubEnrollmentList editable={canEditEnrollment} />
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------