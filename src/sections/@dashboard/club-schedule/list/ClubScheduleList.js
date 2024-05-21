import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Card, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
// routes
// components
import Scrollbar from '../../../../components/Scrollbar';
// sections
import ClubScheduleListHead from './ClubScheduleListHead';
import { getClubSchedules } from '../../../../api/club_schedule';
import { useSnackbar } from 'notistack';
import ClubScheduleMoreMenu from './ClubScheduleMoreMenu';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'schedule_code', label: 'Mã thời khóa biểu', alignRight: false, sortable: false },
  { id: 'schedule_name', label: 'Tên thời khóa biểu', alignRight: false, sortable: false },
  { id: 'teacher.name', label: 'Giáo viên', alignRight: false, sortable: false },
  { id: 'day_of_week', label: 'Thứ trong tuần', alignRight: false, sortable: false },
  { id: '' },
];

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

// ----------------------------------------------------------------------
export default function ClubScheduleList({ editable }) {
  const { enqueueSnackbar } = useSnackbar();
  const [clubScheduleList, setClubScheduleList] = useState([]);
  const [_page, setPage] = useState(0);
  const [_order, setOrder] = useState('asc');
  const [_sort, setSort] = useState('name');
  const [_limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const { club_code } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const params = {
          club_code,
          _page: _page + 1,
          _limit,
          _order,
          _sort,
        };

        const clubSessions = await getClubSchedules(params);
        const records = clubSessions?.data?.records || [];
        setTotal(clubSessions?.data?.total || 0);
        setClubScheduleList(records);
      } catch (e) {
        enqueueSnackbar('Lấy danh sách thời khóa biểu thất bại!', { variant: 'error' });
        if (typeof e?.errors == 'object') {
          for (let message of Object.values(e?.errors)) {
            enqueueSnackbar(message, { variant: 'error' });
          }
        }
      }
    }

    fetchData();
  }, [_page, _limit, _order, _sort]);

  const handleRequestSort = (event, property) => {
    const isAsc = _sort === property && _order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSort(property);
  };


  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = _page > 0 ? Math.max(0, _limit - clubScheduleList.length) : 0;


  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ClubScheduleListHead
              order={_order}
              orderBy={_sort}
              headLabel={TABLE_HEAD}
              rowCount={clubScheduleList.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {clubScheduleList.map((row) => {
                const {
                  schedule_code,
                  schedule_name,
                  teacher: { teacher_name },
                  day_of_week,
                } = row;

                return (
                  <TableRow
                    hover
                    key={schedule_code}
                    tabIndex={-1}
                    role="checkbox"

                  >
                    <TableCell align="left">{schedule_code}</TableCell>
                    <TableCell align="left">{schedule_name}</TableCell>
                    <TableCell align="left">{teacher_name}</TableCell>
                    <TableCell align="left">
                      {renderDay(day_of_week)}
                    </TableCell>
                    <TableCell align="right">
                      {editable && <ClubScheduleMoreMenu scheduleCode={schedule_code} />}
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