// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Container, Grid, Stack, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { AppWidgetSummary } from '../../sections/@dashboard/general/app';
import { useEffect, useState } from 'react';
import { statisticOverall } from '../../api/statistics';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const renderRole = (role) => {
  switch (role) {
    case 1:
      return 'Quản trị viên';
    case 2:
      return 'Phụ huynh';
    case 3:
      return 'Giáo viên';
    case 4:
      return 'Hành chính kế toán';
  }
  return '';
};

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();

  const [countUser, setCountUser] = useState(0);
  const [countTeacher, setCountTeacher] = useState(0);
  const [countStudent, setCountStudent] = useState(0);
  const [countClub, setCountClub] = useState(0);
  const [countSession, setCountSession] = useState(0);

  useEffect(() => {
    async function getOverall() {
      try {
        const res = await statisticOverall();
        const overall = res?.data;
        if(overall) {
          setCountUser(overall?.user)
          setCountTeacher(overall?.teacher)
          setCountStudent(overall?.student)
          setCountClub(overall?.club)
          setCountSession(overall?.session)
        }
      } catch (e) {
        enqueueSnackbar('Get overall data failed', { variant: 'error' });
      }
    }

    getOverall();
  }, []);

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 2, marginBottom: 2 }}>
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={2}>
              <Typography>Tên đăng nhập</Typography>
              <Typography>Tên người dùng</Typography>
              <Typography>Quyền</Typography>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Typography>{user?.username}</Typography>
              <Typography>{user?.name}</Typography>
              <Typography>{renderRole(user?.role)}</Typography>
            </Stack>
          </Stack>
        </Card>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Người dùng"
              total={countUser}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Giáo viên"
              total={countTeacher}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Học sinh"
              total={countStudent}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Câu lạc bộ"
              total={countClub}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Buổi học"
              total={countSession}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
