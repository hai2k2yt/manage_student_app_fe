import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Card, Container, Link, Stack, Typography } from '@mui/material';
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
import { getStudentsByParentCode } from '../../../api/student';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function StudentMe() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [studentList, setStudentList] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    async function fetchData() {
      try {
        const students = await getStudentsByParentCode(user?.id);
        const records = students?.data?.records || [];
        setStudentList(records);
      } catch (e) {
        enqueueSnackbar('Get student failed', {variant: 'error'})
      }
    }
    fetchData();
  }, []);


  return (
    <Page title="Student: Me">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Học sinh của tôi"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Học sinh', href: PATH_DASHBOARD.student.root },
            { name: 'Học sinh của tôi' },
          ]}
        />


          {studentList?.map(student => (
            <Card sx={{padding: 2, marginBottom: 3}}>
              <Stack direction='row' spacing={2}>
                <div>
                  <Typography>Mã học sinh</Typography>
                  <Typography>Tên học sinh</Typography>
                  <Typography>Lớp học sinh</Typography>
                </div>
                <div>
                  <Typography>{student?.student_code}</Typography>
                  <Typography>{student?.name}</Typography>
                  <Typography>{student?.class?.class_name}</Typography>
                </div>
              </Stack>
              <Link href={`${PATH_DASHBOARD.student.root}/${student?.student_code}/detail`}>Xem chi tiết</Link>
            </Card>
          ))}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------