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
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function ClubDetail() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { club_code } = useParams();

  const [clubScheduleList, setClubScheduleList] = useState([]);

  useEffect(() => {
    async function fetchClubSchedule() {
      try {
        const res = await getScheduleByClub(club_code);
        const schedules = res?.data?.data;
        setClubScheduleList(schedules);
      } catch (e) {
        enqueueSnackbar('Lấy danh sách thời khóa biểu thất bại!', { variant: 'error' });
        console.error(e);
      }
    }

    fetchClubSchedule();
  }, []);

  function renderDay(day) {
    let text = '';
    switch (day) {
      case '1':
        text = 'Chủ nhật';
        break;
      case '2':
        text = 'Thứ hai';
        break;
      case '3':
        text = 'Thứ ba';
        break;
      case '4':
        text = 'Thứ tư';
        break;
      case '5':
        text = 'Thứ năm';
        break;
      case '6':
        text = 'Thứ sáu';
        break;
      case '7':
        text = 'Thứ bảy';
        break;
      default:
        break;
    }
    return text;
  }

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

        <Typography>Club schedule</Typography>
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
          {clubScheduleList?.map(item => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={renderDay(item.day_of_week)}
                  secondary={
                    <div>
                      {item.teacher.teacher_name}
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}

        </List>

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
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------