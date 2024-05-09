import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
import Iconify from '../../../components/Iconify';
import { showClubSession } from '../../../api/club_session';
import AbsenceReportFormList from '../../../sections/@dashboard/absence-report/list/AbsenceReportFormList';
import AttendanceFormList from '../../../sections/@dashboard/attendance/list/AttendanceFormList';
import CommentFormList from '../../../sections/@dashboard/comment/list/CommentFormList';
import { useSnackbar } from 'notistack';
import ClubSessionPhotoList from '../../../sections/@dashboard/club-session-photo/list/ClubSessionPhotoList';

// ----------------------------------------------------------------------

export default function ClubSessionDetail() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { club_code,session_code } = useParams();

  const [sessionDetail, setSessionDetail] = useState({});

  useEffect(() => {
    async function fetchClubSessionDetail() {
      try {
        const session = await showClubSession(session_code);
        setSessionDetail(session);
      } catch (e) {
        enqueueSnackbar('Get session detail failed', {variant: 'error'});
        console.error(e)
      }
    }

    fetchClubSessionDetail();
  }, []);

  return (
    <Page title="Club: Session Detail">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết buổi học CLB"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'CLB', href: PATH_DASHBOARD.club.root },
            {
              name: 'Chi tiết CLB',
              href: `${PATH_DASHBOARD.club.root}/${club_code}/detail`,
            },
            { name: 'Chi tiết buổi học' },
          ]}
        />

        <Typography>Chi tiết buổi học</Typography>

        <Stack direction="row" justifyContent="space-between">
          <Typography>Báo cáo nghỉ</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/absence-report/create`}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            Tạo mới
          </Button>
        </Stack>
        <AbsenceReportFormList />

        <Stack direction="row" justifyContent="space-between">
          <Typography>Điểm danh</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/attendance/create`}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            Tạo mới
          </Button>
        </Stack>
        <AttendanceFormList />

        <Stack direction="row" justifyContent="space-between">
          <Typography>Đánh giá</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/comment/create`}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            Tạo mới
          </Button>
        </Stack>
        <CommentFormList />

        <Stack direction="row" justifyContent="space-between">
          <Typography>Photo</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/photo/create`}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            Tạo mới
          </Button>
        </Stack>
        <ClubSessionPhotoList />
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------