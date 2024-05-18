import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// form
// @mui
// routes
// components
import Scrollbar from '../../../../components/Scrollbar';
import { Card, Chip, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import AbsenceReportListHead from './AbsenceReportListHead';
import { destroyAbsenceReport, getAbsenceReports, updateAbsenceReport } from '../../../../api/absence_report';
import AbsenceReportMoreMenu from './AbsenceReportMoreMenu';
import { useSnackbar } from 'notistack';
import { destroyClub } from '../../../../api/club';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'student_code', label: 'Mã học sinh', alignRight: false, sortable: true },
  { id: 'student.name', label: 'Tên học sinh', alignRight: false, sortable: false },
  { id: 'reason', label: 'Lý do', alignRight: false, sortable: false },
  { id: 'status', label: 'Trạng thái', alignRight: false, sortable: true },
  { id: '', label: '', alignRight: false, sortable: false },
];
export default function AbsenceReportFormList({editable}) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [absenceReportList, setAbsenceReportList] = useState([]);
  const [_page, setPage] = useState(0);
  const [_order, setOrder] = useState('asc');
  const [_sort, setSort] = useState('name');
  const [_limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  const { session_code } = useParams();

  useEffect(() => {
    async function fetchAbsenceReports() {
      const params = {
        _page: _page + 1,
        _limit,
        _order,
        _sort,
        session_code,
      };
      try {
        const absenceReports = await getAbsenceReports(params);
        const records = absenceReports?.data?.records || [];
        setTotal(absenceReports?.data?.total || 0);
        setAbsenceReportList(records);
      } catch (e) {
        enqueueSnackbar('Lấy danh sách báo cáo nghỉ thất bại!', { variant: 'error' });
        console.error(e);
      }
    }

    fetchAbsenceReports();
  }, [_page, _limit, _order, _sort, session_code]);

  const handleRequestSort = (event, property) => {
    const isAsc = _sort === property && _order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSort(property);
  };

  const renderStatus = (status) => {
    if (status == 1) {
      return <Chip label="Đang chờ" color="warning" />;
    }
    if (status == 2) {
      return <Chip label="Chấp nhận" color="primary" />;
    }
    if (status == 3) {
      return <Chip label="Từ chối" color="error" />;
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteAbsenceReport = async (reportId) => {
    try {
      await destroyAbsenceReport(reportId);
      navigate(0);
      enqueueSnackbar('Xóa báo cáo nghỉ thành công!')
    } catch (e) {
      enqueueSnackbar('Xóa báo cáo nghỉ thất bại!', {variant: 'error'})
      console.error(e)
    }
  };

  const handleUpdateAbsenceReport = async (status, reportId) => {
    try {
      await updateAbsenceReport(reportId, { status });
      const params = {
        _page: _page + 1,
        _limit,
        _order,
        _sort,
        session_code,
      };
      const absenceReports = await getAbsenceReports(params);
      const records = absenceReports?.data?.records || [];
      setTotal(absenceReports?.data?.total || 0);
      setAbsenceReportList(records);
      enqueueSnackbar('Cập nhật báo cáo nghỉ thành công!');
    } catch (e) {
      enqueueSnackbar('Cập nhật báo cáo nghỉ thất bại!', { variant: 'error' });
    }
  };

  const emptyRows = _page > 0 ? Math.max(0, _limit - absenceReportList.length) : 0;


  return (
    <Card>

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <AbsenceReportListHead
              order={_order}
              orderBy={_sort}
              headLabel={TABLE_HEAD}
              rowCount={absenceReportList.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {absenceReportList.map((row) => {
                const { id, student_code, student: { name }, reason, status } = row;

                return (
                  <TableRow
                    hover
                    key={student_code}
                    tabIndex={-1}
                    role="checkbox"
                  >
                    <TableCell align="left">{student_code}</TableCell>
                    <TableCell align="left">{name}</TableCell>
                    <TableCell align="left">{reason}</TableCell>
                    <TableCell align="left">
                      {renderStatus(status)}
                    </TableCell>
                    <TableCell align="right">
                      {editable &&
                        <AbsenceReportMoreMenu id={id}
                                               onDelete={handleDeleteAbsenceReport}
                                               onUpdate={handleUpdateAbsenceReport} />
                      }
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
