import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Card, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
// routes

// components
import Scrollbar from '../../../../components/Scrollbar';
// sections
import { destroyClubSession, getSessionByClub } from '../../../../api/club_session';
import ClubSessionListHead from './ClubSessionListHead';
import ClubSessionMoreMenu from './ClubSessionMoreMenu';
import PropTypes from 'prop-types';
import { destroyComment } from '../../../../api/comment';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'session_code', label: 'Mã buổi học', alignRight: false, sortable: false },
  { id: 'session_name', label: 'Tên buổi học', alignRight: false, sortable: false },
  { id: 'schedule.teacher.name', label: 'Giáo viên', alignRight: false, sortable: false },
  { id: 'schedule.day_of_week', label: 'Thứ trong tuần', alignRight: false, sortable: false },
  { id: 'date', label: 'Ngày', alignRight: false, sortable: false },
  { id: '' },
];

// ----------------------------------------------------------------------
ClubSessionList.propTypes = {
  clubCode: PropTypes.string,
};
export default function ClubSessionList({ clubCode }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [clubSessionList, setClubSessionList] = useState([]);
  const [_page, setPage] = useState(0);
  const [_order, setOrder] = useState('asc');
  const [_sort, setSort] = useState('name');
  const [_limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const params = {
        _page: _page + 1,
        _limit,
        _order,
        _sort,
      };

      const clubSessions = await getSessionByClub(clubCode, params);
      const records = clubSessions?.data?.records || [];
      setTotal(clubSessions?.data?.total || 0);
      setClubSessionList(records);

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

  const handleDeleteSession = async (session_code) => {
    try {
      await destroyClubSession(session_code);
      navigate(0);
      enqueueSnackbar('Xóa buổi học thành công!')
    } catch (e) {
      enqueueSnackbar('Xóa buổi học thất bại!', {variant: 'error'})
      console.error(e)
    }
  };

  const emptyRows = _page > 0 ? Math.max(0, _limit - clubSessionList.length) : 0;


  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ClubSessionListHead
              order={_order}
              orderBy={_sort}
              headLabel={TABLE_HEAD}
              rowCount={clubSessionList.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {clubSessionList.map((row) => {
                const {
                  session_code,
                  session_name,
                  schedule: { teacher: { teacher_name }, day_of_week },
                  date,
                } = row;

                return (
                  <TableRow
                    hover
                    key={session_code}
                    tabIndex={-1}
                    role="checkbox"

                  >
                    <TableCell align="left">{session_code}</TableCell>
                    <TableCell align="left">{session_name}</TableCell>
                    <TableCell align="left">{teacher_name}</TableCell>
                    <TableCell align="left">
                      {day_of_week}
                    </TableCell>
                    <TableCell align="left">
                      {date}
                    </TableCell>
                    <TableCell align="right">
                      <ClubSessionMoreMenu onDelete={() => handleDeleteSession(session_code)} sessionCode={session_code} />
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