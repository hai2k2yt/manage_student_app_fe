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
  TablePagination,
  TableRow,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { destroyClub, getClubs, getMyClubs } from '../../../api/club';
import { ClubListHead, ClubListToolbar, ClubMoreMenu } from '../../../sections/@dashboard/club/list';
import { useSnackbar } from 'notistack';
import ClubMeMoreMenu from '../../../sections/@dashboard/club/me/ClubMeMoreMenu';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'club_code', label: 'Mã CLB', alignRight: false, sortable: true },
  { id: 'name', label: 'Tên CLB', alignRight: false, sortable: true },
  { id: 'teacher.teacher_name', label: 'Tên giáo viên', alignRight: false, sortable: false },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ClubList() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [myClubList, setMyClubList] = useState([]);
  const [_page, setPage] = useState(0);
  const [_order, setOrder] = useState('asc');
  const [_sort, setSort] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [_limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const params = {
        _page: _page + 1,
        _limit,
        _order,
        _sort,
        name_like: filterName,
      };
      try {
        const clubs = await getMyClubs(params);
        const records = clubs?.data?.records || [];
        setTotal(clubs?.data?.total || 0);
        setMyClubList(records);
      } catch (e) {
        enqueueSnackbar('Lấy danh sách của tôi CLB thất bại!', { variant: 'error' });
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

  const handleDeleteClub = async (club_code) => {
    try {
      await destroyClub(club_code);
      navigate(0);
      enqueueSnackbar('Xóa CLB thành công!')
    } catch (e) {
      enqueueSnackbar('Xóa CLB thất bại!', {variant: 'error'})
      console.error(e)
    }
  };

  const emptyRows = _page > 0 ? Math.max(0, _limit - myClubList.length) : 0;

  const isNotFound = !myClubList.length && Boolean(filterName);

  return (
    <Page title="Club: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách CLB"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'CLB', href: PATH_DASHBOARD.club.root },
            { name: 'Danh sách' },
          ]}
        />

        <Card>
          <ClubListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ClubListHead
                  order={_order}
                  orderBy={_sort}
                  headLabel={TABLE_HEAD}
                  rowCount={myClubList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {myClubList.map((row) => {
                    const { club_code, name, teacher: { teacher_name } } = row;

                    return (
                      <TableRow
                        hover
                        key={club_code}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell align="left">{club_code}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{teacher_name}</TableCell>
                        <TableCell align="right">
                          <ClubMeMoreMenu club={row} />
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