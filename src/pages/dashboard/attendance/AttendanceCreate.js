// @mui
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { useParams } from 'react-router-dom';
import AbsenceReportCreateForm from '../../../sections/@dashboard/absence-report/create/AbsenceReportCreateForm';
import AttendanceCreateForm from '../../../sections/@dashboard/attendance/create/AttendanceCreateForm';

// ----------------------------------------------------------------------

export default function AttendanceCreate() {
  const { themeStretch } = useSettings();
  const {club_code, session_code} = useParams()

  return (
    <Page title="Club Session: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Tạo điểm danh'
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            {
              name: 'CLB',
              href: PATH_DASHBOARD.club.root,
            },
            {
              name: 'Chi tiết CLB',
              href: `${PATH_DASHBOARD.club.root}/${club_code}/detail`,
            },
            {
              name: 'Chi tiết buổi học',
              href: `${PATH_DASHBOARD.club.root}/${club_code}/session/${session_code}`,
            },
            { name: 'Tạo điểm danh'},
          ]}
        />

        <AttendanceCreateForm />
      </Container>
    </Page>
  );
}
