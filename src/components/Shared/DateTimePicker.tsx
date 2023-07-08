import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { Dayjs } from "dayjs";

interface Props {
  label: string;
  defaultValue?: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
}

const DateTimePicker = ({ label, onChange, defaultValue }: Props) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MuiDateTimePicker
      label={label}
      onChange={onChange}
      defaultValue={defaultValue}
      slotProps={{ textField: { variant: "standard" } }}
      sx={{ marginBottom: 1.5 }}
    />
  </LocalizationProvider>
);

export default DateTimePicker;
