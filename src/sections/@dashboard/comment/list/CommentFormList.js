import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// form
// @mui
// routes
// components
import Scrollbar from '../../../../components/Scrollbar';
import { Card, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import CommentListHead from './CommentListHead';
import CommentMoreMenu from './CommentMoreMenu';
import { useSnackbar } from 'notistack';
import { destroyComment, getCommentBySession } from '../../../../api/comment';
import { destroyAttendance } from '../../../../api/attendance';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'student_code', label: 'Mã học sinh', alignRight: false, sortable: true },
  { id: 'student.name', label: 'Tên học sinh', alignRight: false, sortable: false },
  { id: 'content', label: 'Nội dung', alignRight: false, sortable: false },
  { id: '', label: '', alignRight: false, sortable: false },
];
export default function CommentFormList({editable}) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [commentList, setCommentList] = useState([]);
  const [_page, setPage] = useState(0);
  const [_order, setOrder] = useState('asc');
  const [_sort, setSort] = useState('name');
  const [_limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  const { session_code } = useParams();

  useEffect(() => {
    async function fetchComments() {
      const params = {
        _page: _page + 1,
        _limit,
        _order,
        _sort,
      };
      try {
        const absenceReports = await getCommentBySession(session_code, params);
        const records = absenceReports?.data?.records || [];
        setTotal(absenceReports?.data?.total || 0);
        setCommentList(records);
      } catch (e) {
        enqueueSnackbar('Lấy danh sách đánh giá thất bại!', {variant: 'error'});
        console.error(e)
      }
    }

    fetchComments();
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

  const handleDeleteComment = async (id) => {
    try {
      await destroyComment(id);
      navigate(0);
      enqueueSnackbar('Xóa đánh giá thành công!')
    } catch (e) {
      enqueueSnackbar('Xóa đánh giá thất bại!', {variant: 'error'})
      console.error(e)
    }
  };

  const emptyRows = _page > 0 ? Math.max(0, _limit - commentList.length) : 0;


  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <CommentListHead
              order={_order}
              orderBy={_sort}
              headLabel={TABLE_HEAD}
              rowCount={commentList.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {commentList.map((row) => {
                const {id, student_code, student: { name }, content } = row;

                return (
                  <TableRow
                    hover
                    key={student_code}
                    tabIndex={-1}
                    role="checkbox"
                  >
                    <TableCell align="left">{student_code}</TableCell>
                    <TableCell align="left">{name}</TableCell>
                    <TableCell align="left">{content}</TableCell>
                    <TableCell align="right">
                      {
                        editable &&
                        <CommentMoreMenu id={id} onDelete={handleDeleteComment} />
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
