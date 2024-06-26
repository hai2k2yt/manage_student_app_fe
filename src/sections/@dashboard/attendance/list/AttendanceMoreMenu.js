import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { MenuItem, IconButton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';

// ----------------------------------------------------------------------

AttendanceMoreMenu.propTypes = {
  id: PropTypes.any,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
};

export default function AttendanceMoreMenu({ id, onUpdate, onDelete }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const onAccept = () => {

  };

  const onReject = () => {

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
        <MenuItem onClick={() => onDelete(id)} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Xóa
        </MenuItem>

        <MenuItem onClick={() => onUpdate(1, id)}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          Có mặt
        </MenuItem>

        <MenuItem onClick={() => onUpdate(2, id)}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          Nghỉ phép
        </MenuItem>
        <MenuItem onClick={() => onUpdate(3, id)}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          Vắng mặt
        </MenuItem>
      </MenuPopover>
    </>
  );
}
