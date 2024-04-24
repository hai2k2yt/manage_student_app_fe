import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Container, Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { getScheduleByClub } from '../../../api/club_schedule';
import { ClubSessionList } from '../../../sections/@dashboard/club-session/list';
import Iconify from '../../../components/Iconify';
import { getAbsenceReportBySession } from '../../../api/absence_report';
import { getAttendanceBySession } from '../../../api/attendance';
import { showClubSession } from '../../../api/club_session';
import AbsenceReportFormList from '../../../sections/@dashboard/absence-report/list/AbsenceReportFormList';
import AttendanceFormList from '../../../sections/@dashboard/attendance/list/AttendanceFormList';

// ----------------------------------------------------------------------

export default function ClubSessionDetail() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { club_code,session_code } = useParams();

  const [sessionDetail, setSessionDetail] = useState({});

  useEffect(() => {
    async function fetchClubSessionDetail() {
      const session = await showClubSession(session_code);
      setSessionDetail(session);
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

        <Stack direction='row' justifyContent='space-between'>
          <Typography>Absence report</Typography>
        </Stack>

        <AbsenceReportFormList />
        <Typography>Attendance</Typography>

        <AttendanceFormList />
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------