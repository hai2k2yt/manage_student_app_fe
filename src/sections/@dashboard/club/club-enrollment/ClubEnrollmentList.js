import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
// routes
// hooks
// _mock_
// components
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
// sections
import { useSnackbar } from 'notistack';
import { getClubEnrollments } from '../../../../api/club_enrollment';
import ClubEnrollmentListHead from './ClubEnrollmentListHead';
import ClubEnrollmentMoreMenu from './ClubEnrollmentMoreMenu';
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '' },
  { id: 'student_code', label: 'Mã học sinh', alignRight: false, sortable: true },
  { id: 'student_name', label: 'Tên học sinh', alignRight: false, sortable: true },
  { id: 'status', label: 'Trạng thái', alignRight: false, sortable: true },
  { id: '' },
];

const TABLE_ENROLLMENT_HEAD = [
  { id: 'id', label: 'ID' },
  { id: 'from', label: 'Bắt đầu' },
  { id: 'to', label: 'Kết thúc' },
  { id: 'status', label: 'Trạng thái' },

];

// ----------------------------------------------------------------------

function Row({ data, editable }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        hover
        key={data?.id}
        tabIndex={-1}
        role="checkbox"
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <Iconify icon={'mdi:arrow-up'} /> : <Iconify icon={'mdi:arrow-down'} />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{data?.student_code}</TableCell>
        <TableCell align="left">{data?.student?.name}</TableCell>
        <TableCell align="left">
          {data?.status == 1 ? 'Đang học' : 'Đã hủy'}
        </TableCell>
        <TableCell align="right">
          {editable && <ClubEnrollmentMoreMenu enrollmentId={data?.id} />}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Lịch sử đăng ký
              </Typography>
              <Table size="small" aria-label="enrollment_histories">
                <TableHead>
                  <TableRow>
                    {TABLE_ENROLLMENT_HEAD.map(item =>
                      <TableCell key={item.id}>{item.label}</TableCell>,
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.enrollment_histories?.map((historyRow) => (
                    <TableRow key={historyRow?.id}>
                      <TableCell component="th" scope="row">
                        {historyRow?.date}
                      </TableCell>
                      <TableCell>{historyRow?.from}</TableCell>
                      <TableCell>{historyRow?.to ?? '---'}</TableCell>
                      <TableCell>
                        {historyRow?.status == 1 ? 'Đang học' : 'Đã hủy'}
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

export default function ClubEnrollmentList({ editable }) {
  const { enqueueSnackbar } = useSnackbar();
  const { club_code } = useParams();

  const [clubEnrollmentList, setClubEnrollmentList] = useState([]);
  const [_page, setPage] = useState(0);
  const [_order, setOrder] = useState('asc');
  const [_sort, setSort] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [_limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

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
        if (typeof e?.errors == 'object') {
          for (let message of Object.values(e?.errors)) {
            enqueueSnackbar(message, { variant: 'error' });
          }
        }
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
                return (
                  <Row
                    editable={editable}
                    key={row?.id}
                    data={row}
                  />
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

  );
}

// ----------------------------------------------------------------------