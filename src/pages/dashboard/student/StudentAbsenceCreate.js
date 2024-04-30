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
import StudentAbsenceCreateForm from '../../../sections/@dashboard/student/absence-report/StudentAbsenceCreateForm';

// ----------------------------------------------------------------------

export default function AbsenceReportCreate() {
  const { themeStretch } = useSettings();
  const {club_code, student_code} = useParams();

  return (
    <Page title="Club Session: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Create new absence report'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Student',
              href: PATH_DASHBOARD.student.root,
            },
            {
              name: 'Student detail',
              href: `${PATH_DASHBOARD.student.root}/${student_code}/detail`,
            },
            { name: 'New student absence report'},
          ]}
        />

        <StudentAbsenceCreateForm />
      </Container>
    </Page>
  );
}
