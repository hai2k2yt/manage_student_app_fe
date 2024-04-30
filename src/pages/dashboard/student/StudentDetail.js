import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Card, Container, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { useSnackbar } from 'notistack';
import { showStudent } from '../../../api/student';
import StudentClubAbsenceReport from '../../../sections/@dashboard/student/detail/StudentClubAbsenceReport';
import StudentClubAttendance from '../../../sections/@dashboard/student/detail/StudentClubAttendance';
import StudentClubComment from '../../../sections/@dashboard/student/detail/StudentClubComment';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function StudentMe() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [studentDetail, setStudentDetail] = useState([]);
  const { student_code } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const students = await showStudent(student_code);
        const records = students?.data;
        setStudentDetail(records);
      } catch (e) {
        enqueueSnackbar('Get student failed', { variant: 'error' });
      }
    }

    fetchData();
  }, []);


  return (
    <Page title="Student: Detail">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Student Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Student', href: PATH_DASHBOARD.student.root },
            { name: 'Detail' },
          ]}
        />

        <Card sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h4">Student info</Typography>
          <Stack direction="row" spacing={2}>
            <div>
              <Typography>Student code</Typography>
              <Typography>Student name</Typography>
              <Typography>Class code</Typography>
            </div>
            <div>
              <Typography>{studentDetail?.student_code}</Typography>
              <Typography>{studentDetail?.name}</Typography>
              <Typography>{studentDetail?.class_code}</Typography>
            </div>
          </Stack>
        </Card>

        <Typography sx={{ marginY: 2 }} variant="h5">Club</Typography>


        {studentDetail?.clubs?.map(club => (
          <Card sx={{ padding: 2, marginBottom: 1 }}>
            <Stack direction="row" spacing={5}>
              <div>
                <Typography>Club code</Typography>
                <Typography>Club name</Typography>
              </div>
              <div>
                <Typography>{club?.club_code}</Typography>
                <Typography>{club?.name}</Typography>
              </div>
            </Stack>

            <Stack  sx={{ marginY: 1 }} direction='row' justifyContent='space-between'>
              <Typography variant="h6">Absence report</Typography>
              <Button variant='outlined' onClick={() => navigate(`${PATH_DASHBOARD.student.root}/${student_code}/club/${club?.club_code}/absence-report/create`)}>Create absence</Button>
            </Stack>
            <StudentClubAbsenceReport clubCode={club?.club_code} studentCode={student_code} />

            <Typography variant="h6" sx={{ marginY: 1 }}>Attendance</Typography>
            <StudentClubAttendance clubCode={club?.club_code} studentCode={student_code} />

            <Typography variant="h6" sx={{ marginY: 1 }}>Comment</Typography>
            <StudentClubComment clubCode={club?.club_code} studentCode={student_code} />
          </Card>
        ))}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------