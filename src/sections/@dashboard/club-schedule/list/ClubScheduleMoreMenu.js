import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// @mui
import { IconButton, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';
import { destroyClubSchedule } from '../../../../api/club_schedule';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

ClubScheduleMoreMenu.propTypes = {
  scheduleCode: PropTypes.string
};

export default function ClubScheduleMoreMenu({ scheduleCode }) {
  const [open, setOpen] = useState(null);
  const { club_code } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleDeleteSchedule = async () => {
    try {
      await destroyClubSchedule(scheduleCode);
      enqueueSnackbar('Xóa thời khóa biểu thành công!')
      navigate(0);
    } catch (e) {
      enqueueSnackbar('Xóa thời khóa biểu thất bại!', {variant: 'error'})
      console.error(e)
    }
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={handleDeleteSchedule} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Xóa
        </MenuItem>

        <MenuItem component={RouterLink} to={`${PATH_DASHBOARD.club.root}/${club_code}/schedule/${scheduleCode}/edit`}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          Cập nhật
        </MenuItem>
      </MenuPopover>
    </>
  );
}
