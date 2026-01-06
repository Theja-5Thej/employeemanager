import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type Props = {
  label: string;
  name: string;
  value: string;
  setFieldValue: (field: string, value: any) => void;
  error?: string;
};

export const FormDatePicker = ({
  label,
  name,
  value,
  setFieldValue,
  error,
}: Props) => {
  return (
    <div className="mb-2">
      <label className="block mb-1 font-medium">{label}</label>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value ? dayjs(value) : null}
          onChange={(val) =>
            setFieldValue(name, val ? val.format("YYYY-MM-DD") : "")
          }
          slotProps={{
            textField: {
              fullWidth: true,
              error: Boolean(error),
              helperText: error,
              sx: {
                "& .css-1hgcujo-MuiPickersInputBase-root-MuiPickersOutlinedInput-root": {
                  height: '42px',
                  borderRadius: "6px",
                  border:'1px solid oklch(0.278 0.033 256.848)'
                },
                "& input": {
                  padding: "10px 12px",
                },
                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "oklch(0.637 0.237 25.331)",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};
