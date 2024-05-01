
// @mui
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ClassNewForm from '../../../sections/@dashboard/e-commerce/ClassNewForm';

// ----------------------------------------------------------------------

export default function ClassCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Class: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Tạo lớp học'
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            {
              name: 'Lớp học',
              href: PATH_DASHBOARD.class.root,
            },
            { name: 'Tạo mới'},
          ]}
        />

        <ClassNewForm />
      </Container>
    </Page>
  );
}
