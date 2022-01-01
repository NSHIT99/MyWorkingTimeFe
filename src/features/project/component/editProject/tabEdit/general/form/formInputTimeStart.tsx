import { Control, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import { IEditProject } from "../../../../../../../interfaces/project/projectType";

interface props {
  control: Control<IEditProject, object>;
}
const FormInputTimeStart = ({ control }: props) => {
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <Controller
        name="timeStart"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            inputFormat={"dd/MM/yyyy"}
            renderInput={(props) => (
              <TextField
                {...props}
                size="small"
                helperText={error ? error.message : null}
                sx={{ marginLeft: 13 }}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default FormInputTimeStart;
