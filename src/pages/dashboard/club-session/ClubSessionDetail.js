import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
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
          heading="Session Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Club', href: PATH_DASHBOARD.club.root },
            {
              name: 'Club detail',
              href: `${PATH_DASHBOARD.club.root}/${club_code}/detail`,
            },
            { name: 'Session detail' },
          ]}
        />

        <Typography>Club session detail</Typography>

        <Stack direction="row" justifyContent="space-between">
          <Typography>Absence report</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/absence-report/create`}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            New absence report
          </Button>
        </Stack>
        <AbsenceReportFormList />

        <Stack direction="row" justifyContent="space-between">
          <Typography>Attendance</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/attendance/create`}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            New attendance
          </Button>
        </Stack>
        <AttendanceFormList />

        <Stack direction="row" justifyContent="space-between">
          <Typography>Comment</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}/comment/create`}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            New comment
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
            New photo
          </Button>
        </Stack>
        <ClubSessionPhotoList />
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------