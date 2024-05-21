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
import CommentUpdateForm from '../../../sections/@dashboard/comment/update/CommentUpdateForm';

// ----------------------------------------------------------------------

export default function CommentUpdate() {
  const { themeStretch } = useSettings();
  const {club_code, session_code} = useParams();

  return (
    <Page title="Comment: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Cập nhật đánh giá'
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
            { name: 'Cập nhật đánh giá'},
          ]}
        />

        <CommentUpdateForm />
      </Container>
    </Page>
  );
}
