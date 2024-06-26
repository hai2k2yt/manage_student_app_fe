import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { useSnackbar } from 'notistack';
import { statisticTeacherFee } from '../../../api/statistics';
import { formatNumber } from '../../../utils/formatNumber';


// ----------------------------------------------------------------------

export default function StatisticStudent() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [teacherFeeList, setTeacherFeeList] = useState([]);
  const [clubList, setClubList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [from, setFrom] = useState('1970-01-01');
  const [to, setTo] = useState('2030-01-01')


  useEffect(() => {
    async function fetchStudentFeeList() {
      try {
        const res = await statisticTeacherFee({from, to});
        const records = res?.data || {};
        const teacherFeeMap = [];
        const clubCodes = Object.keys(records);
        const teacherCodes = Object.keys(Object.values(records)[0]);
        for (let i = 0; i < teacherCodes.length; i++) {
          teacherFeeMap.push(new Array(clubCodes.length));
        }
        for (let i = 0; i < clubCodes.length; i++) {
          for (let j = 0; j < teacherCodes.length; j++) {
            teacherFeeMap[j][i] = records[clubCodes[i]][teacherCodes[j]];
          }
        }
        setTeacherList(teacherCodes);
        setClubList(clubCodes);
        setTeacherFeeList(teacherFeeMap);
      } catch (e) {
        enqueueSnackbar('Thống kê lương giáo viên thất bại!', {variant: 'error'})
      }
    }
    fetchStudentFeeList();
  }, [from, to]);

  return (
    <Page title="Statistic: Teacher">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Thống kê lương cho giáo viên"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Thống kê', href: PATH_DASHBOARD.statistic.root },
            { name: 'Giáo viên' },
          ]}
        />
        <Typography align='right'>Đơn vị: VND</Typography>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {clubList?.map((club) => <TableCell align="left">{club}</TableCell>)}
                    <TableCell>Tổng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teacherList?.map((row, index) => {
                    const teacherClubs = teacherFeeList[index];
                    return (
                      <TableRow
                        hover
                        key={index}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell align="left">{row}</TableCell>
                        {teacherClubs?.map(item => <TableCell align="left">{formatNumber(item)}</TableCell>)}
                        <TableCell align="left">{formatNumber(teacherClubs?.reduce((arr, a) => arr + a, 0))}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------