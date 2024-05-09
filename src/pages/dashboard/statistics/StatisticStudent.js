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
import { statisticStudentFee } from '../../../api/statistics';
import { formatNumber } from '../../../utils/formatNumber';


// ----------------------------------------------------------------------

export default function StatisticStudent() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [studentFeeList, setStudentFeeList] = useState([]);
  const [clubList, setClubList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [from, setFrom] = useState('1970-01-01');
  const [to, setTo] = useState('2030-01-01')


  useEffect(() => {
    async function fetchStudentFeeList() {
      try {
        const res = await statisticStudentFee({from, to});
        const records = res?.data || {};
        const studentFeeMap = [];
        const clubCodes = Object.keys(records);
        const studentCodes = Object.keys(Object.values(records)[0]);
        for (let i = 0; i < studentCodes.length; i++) {
          studentFeeMap.push(new Array(clubCodes.length));
        }
        for (let i = 0; i < clubCodes.length; i++) {
          for (let j = 0; j < studentCodes.length; j++) {
            studentFeeMap[j][i] = records[clubCodes[i]][studentCodes[j]];
          }
        }
        console.log(studentFeeMap);

        setStudentList(studentCodes);
        setClubList(clubCodes);
        setStudentFeeList(studentFeeMap);
      } catch (e) {
        enqueueSnackbar('Lấy thống kê học phí học sinh thất bại!', {variant: 'error'})
      }
    }
    fetchStudentFeeList();
  }, [from, to]);

  return (
    <Page title="Statistic: Student">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Thống kê học phí của học sinh"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Thống kê', href: PATH_DASHBOARD.statistic.root },
            { name: 'Học sinh' },
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
                  {studentList?.map((row, index) => {
                    const studentClubs = studentFeeList[index];
                    return (
                      <TableRow
                        hover
                        key={index}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell align="left">{row}</TableCell>
                        {studentClubs?.map(item => <TableCell align="left">{formatNumber(item)}</TableCell>)}
                        <TableCell align="left">{formatNumber(studentClubs?.reduce((arr, a) => arr + a, 0))}</TableCell>
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