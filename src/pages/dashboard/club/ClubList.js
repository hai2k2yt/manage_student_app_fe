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
import { destroyClass } from '../../../api/class';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'club_code', label: 'Club code', alignRight: false, sortable: true },
  { id: 'name', label: 'Club name', alignRight: false, sortable: true },
  { id: 'teacher.teacher_name', label: 'Teacher name', alignRight: false, sortable: false },
  { id: 'created_at', label: 'Create at', alignRight: false, sortable: true },
  { id: 'updated_at', label: 'Updated at', alignRight: false, sortable: true },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ClubList() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [clubList, setClubList] = useState([]);
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
        const clubs = await getClubs(params);
        const records = clubs?.data?.records || [];
        setTotal(clubs?.data?.total || 0);
        setClubList(records);
      } catch (e) {
        enqueueSnackbar('Get club list failed', { variant: 'error' });
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
      enqueueSnackbar('Delete club successfully')
    } catch (e) {
      enqueueSnackbar('Delete club failed', {variant: 'error'})
      console.error(e)
    }
  };

  const emptyRows = _page > 0 ? Math.max(0, _limit - clubList.length) : 0;

  const isNotFound = !clubList.length && Boolean(filterName);

  return (
    <Page title="Club: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Club List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Club', href: PATH_DASHBOARD.club.root },
            { name: 'List' },
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
                  rowCount={clubList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {clubList.map((row) => {
                    const { club_code, name, teacher: { teacher_name }, created_at, updated_at } = row;

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
                        <TableCell align="left">
                          {created_at}
                        </TableCell>
                        <TableCell align="left">
                          {updated_at}
                        </TableCell>
                        <TableCell align="right">
                          <ClubMoreMenu onDelete={() => handleDeleteClub(club_code)} clubCode={club_code} />
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