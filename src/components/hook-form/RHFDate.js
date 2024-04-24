import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFDate.propTypes = {
  name: PropTypes.string,
};

export default function RHFDate({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker {...field}
                    renderInput={(props) => {
                      return <TextField {...props} />
                    }}
                    error={!!error}
                    helperText={error?.message}
                    {...other}
        />
      )}
    />
  );
}
