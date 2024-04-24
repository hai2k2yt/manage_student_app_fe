import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// form
// @mui
// routes
// components
import Scrollbar from '../../../../components/Scrollbar';
import {
  Button,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import AttendanceListHead from './AttendanceListHead';
import { getAttendances, updateAttendance } from '../../../../api/attendance';
import AttendanceMoreMenu from './AttendanceMoreMenu';
import { destroyClass } from '../../../../api/class';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'student_code', label: 'Student code', alignRight: false, sortable: true },
  { id: 'student.name', label: 'Student name', alignRight: false, sortable: false },
  { id: 'present', label: 'Present', alignRight: false, sortable: false },
  { id: '', label: '', alignRight: false, sortable: false },
];

export default function AttendanceFormList() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [attendanceList, setAttendanceList] = useState([]);
  const [_page, setPage] = useState(0);
  const [_order, setOrder] = useState('asc');
  const [_sort, setSort] = useState('name');
  const [_limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const { session_code } = useParams();

  useEffect(() => {
    async function fetchAttendances() {
      const params = {
        _page: _page + 1,
        _limit,
        _order,
        _sort,
        session_code
      };
      const attendances = await getAttendances(params);
      const records = attendances?.data?.records || [];
      setTotal(attendances?.data?.total || 0);
      setAttendanceList(records);
    }

    fetchAttendances();
  }, [_page, _limit, _order, _sort, session_code]);

  const handleRequestSort = (event, property) => {
    const isAsc = _sort === property && _order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSort(property);
  };


  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleDeleteAttendance = async (attendanceId) => {
  };

  const handleUpdate = async (status, id) => {
    try {
      await updateAttendance(id, { present: status });
      const params = {
        _page: _page + 1,
        _limit,
        _order,
        _sort,
        session_code
      };
      const attendances = await getAttendances(params);
      const records = attendances?.data?.records || [];
      setTotal(attendances?.data?.total || 0);
      setAttendanceList(records);
      enqueueSnackbar('Update attendance successfully')
    } catch (e) {
      enqueueSnackbar(e?.message || 'Update attendance failed', {variant: 'error'})
    }
  }

  const emptyRows = _page > 0 ? Math.max(0, _limit - attendanceList.length) : 0;

  const renderPresent = (absence) => {
    if(absence == 1) {
      return <Chip label="Có mặt" color="primary" />
    }
    if(absence == 2) {
      return <Chip label="Nghỉ phép" color="warning" />
    }if(absence == 3) {
      return <Chip label="Vắng mặt" color="error" />
    }
  }

  return (
    <Card>

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <AttendanceListHead
              order={_order}
              orderBy={_sort}
              headLabel={TABLE_HEAD}
              rowCount={attendanceList.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {attendanceList.map((row) => {
                const {id, student_code, student: { name }, present } = row;

                return (
                  <TableRow
                    hover
                    key={student_code}
                    tabIndex={-1}
                    role="checkbox"
                  >
                    <TableCell align="left">{student_code}</TableCell>
                    <TableCell align="left">{name}</TableCell>
                    <TableCell align="left">
                      {renderPresent(present)}
                    </TableCell>
                    <TableCell align="right">
                      <AttendanceMoreMenu id={id} onUpdate={handleUpdate} onDelete={handleDeleteAttendance}/>
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
