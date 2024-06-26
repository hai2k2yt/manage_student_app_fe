// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ClassUpdateForm from '../../../sections/@dashboard/class/update/ClassUpdateForm';

// ----------------------------------------------------------------------

export default function ClassUpdate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Class: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Cập nhật lớp học'
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            {
              name: 'Lớp học',
              href: PATH_DASHBOARD.class.root,
            },
            { name: 'Chỉnh sửa' },
          ]}
        />

        <ClassUpdateForm />
      </Container>
    </Page>
  );
}
