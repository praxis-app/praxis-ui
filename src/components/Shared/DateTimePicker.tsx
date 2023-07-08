import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface Props {
  label: string;
}

const DateTimePicker = ({ label }: Props) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MuiDateTimePicker
      label={label}
      slotProps={{ textField: { variant: "standard" } }}
      sx={{ marginBottom: 1.5 }}
    />
  </LocalizationProvider>
);

export default DateTimePicker;
