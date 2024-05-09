import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
// routes
// components
import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';
import { cancelClubEnrollment, destroyClubEnrollment } from '../../../../api/club_enrollment';
import { useSnackbar } from 'notistack';
import { DatePicker } from '@mui/lab';
import moment from 'moment';

// ----------------------------------------------------------------------

ClubEnrollmentMoreMenu.propTypes = {
  enrollmentId: PropTypes.number,
};

export default function ClubEnrollmentMoreMenu({ enrollmentId }) {
  const [open, setOpen] = useState(null);
  const [deleteDate, setDeleteDate] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const {club_code} = useParams();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date().toDateString();
    setDeleteDate(date);
  }, []);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleDeleteClubEnrollment = async () => {
    try {
      await destroyClubEnrollment(enrollmentId);
      navigate(0);
      enqueueSnackbar('Xóa đăng ký CLB thành công!')
    } catch (e) {
      enqueueSnackbar('Xóa đăng ký CLB thất bại!', {variant: 'error'})
      console.error(e)
    }
  };

  const handleCancelClubEnrollment = async (id, params) => {
    try {
      await cancelClubEnrollment(id, params);
      navigate(0);
      enqueueSnackbar('Hủy đăng ký CLB thành công!')
    } catch (e) {
      enqueueSnackbar('Hủy đăng ký CLB thất bại!', {variant: 'error'})
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

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const params = {
              to: moment(deleteDate).format('YYYY-DD-MM')
            };
            await handleCancelClubEnrollment(enrollmentId, params);
            handleClose();
          },
        }}
      >
        <DialogTitle>Hủy đăng ký câu lạc bộ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Chọn ngày hủy đăng ký câu lạc bộ
          </DialogContentText>
          <DatePicker
            id="to"
            name="to"
            format='yyyy-MM-dd'
            value={deleteDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
            onChange={(newValue) => setDeleteDate(newValue)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Quay lại</Button>
          <Button type="submit">Hủy đăng ký</Button>
        </DialogActions>
      </Dialog>


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
        <MenuItem onClick={() => handleDeleteClubEnrollment()} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Xóa
        </MenuItem>
        <MenuItem onClick={() => handleOpenDeleteDialog()} sx={{ color: 'warning.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Hủy đăng ký
        </MenuItem>
      </MenuPopover>
    </>
  );
}
