import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Box,
  Card, Collapse,
  Container, IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableHead,
  TablePagination,
  TableRow, Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { destroyClub, getClubs } from '../../../api/club';
import { ClubListHead, ClubListToolbar, ClubMoreMenu } from '../../../sections/@dashboard/club/list';
import { useSnackbar } from 'notistack';
import { destroyClubEnrollment, getClubEnrollments } from '../../../api/club_enrollment';
import ClubEnrollmentListHead from '../../../sections/@dashboard/club/club-enrollment/ClubEnrollmentListHead';
import ClubEnrollmentMoreMenu from '../../../sections/@dashboard/club/club-enrollment/ClubEnrollmentMoreMenu';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'student_code', label: 'Mã học sinh', alignRight: false, sortable: true },
  { id: 'student_name', label: 'Tên học sinh', alignRight: false, sortable: true },
  { id: 'register_time', label: 'Thời gian đăng ký', alignRight: false, sortable: true },
  { id: 'status', label: 'Trạng thái', alignRight: false, sortable: true },
  { id: '' },
];

const TABLE_ENROLLMENT_HEAD = [
  { id: 'id', label: 'ID' },
  { id: 'start_date', label: 'Bắt đầu' },
  { id: 'end_date', label: 'Kết thúc' },
  { id: 'status', label: 'Trạng thái' },

];

// ----------------------------------------------------------------------

function KeyboardArrowUpIcon() {
  return null;
}

function KeyboardArrowDownIcon() {
  return null;
}

function Row({ data }) {
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);


  return (
    <>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {TABLE_ENROLLMENT_HEAD.map(item =>
                      <TableCell key={item.id}>{item.name}</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.start_date}</TableCell>
                      <TableCell align="right">{historyRow.end_date}</TableCell>
                      <TableCell align="right">
                        {historyRow.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ClubEnrollment() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [clubEnrollmentList, setClubEnrollmentList] = useState([]);
  const [_page, setPage] = useState(0);
  const [_order, setOrder] = useState('asc');
  const [_sort, setSort] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [_limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const {club_code} = useParams();

  useEffect(() => {
    async function fetchData() {
      const params = {
        club_code,
        _page: _page + 1,
        _limit,
        _order,
        _sort,
        name_like: filterName,
      };
      try {
        const clubEnrollments = await getClubEnrollments(params);
        const records = clubEnrollments?.data?.records || [];
        setTotal(clubEnrollments?.data?.total || 0);
        setClubEnrollmentList(records);
      } catch (e) {
        enqueueSnackbar('Lấy danh sách đăng ký CLB thất bại!', { variant: 'error' });
        console.error(e);
      }
    }

    fetchData();
  }, [_page, _limit, _order, _sort, filterName]);

  const handleRequestSort = (event, property) => {
    const isAsc = _sort === property && _order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSort(property);
  };


  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };



  const emptyRows = _page > 0 ? Math.max(0, _limit - clubEnrollmentList.length) : 0;

  const isNotFound = !clubEnrollmentList.length && Boolean(filterName);

  return (
    <Page title="Club Enrollment: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách đăng ký CLB"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'CLB', href: PATH_DASHBOARD.club.root },
            { name: 'Danh sách đăng ký' },
          ]}
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ClubEnrollmentListHead
                  order={_order}
                  orderBy={_sort}
                  headLabel={TABLE_HEAD}
                  rowCount={clubEnrollmentList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {clubEnrollmentList.map((row) => {
                    const { id, student: { student_code, student_name }, register_time, status } = row;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{student_code}</TableCell>
                        <TableCell align="left">{student_name}</TableCell>
                        <TableCell align="left">{register_time}</TableCell>
                        <TableCell align="left">
                          {status}
                        </TableCell>
                        <TableCell align="right">
                          <ClubEnrollmentMoreMenu enrollmentId={id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={_limit}
            page={_page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------