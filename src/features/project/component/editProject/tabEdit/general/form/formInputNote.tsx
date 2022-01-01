import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { IEditProject } from "../../../../../../../interfaces/project/projectType";

interface props {
  control: Control<IEditProject, object>;
}

const FormInputNote = ({ control }: props) => {
  return (
    <Controller
      name="code"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          fullWidth
          error={!!error}
          onChange={onChange}
          value={value}
          variant="outlined"
          sx={{ marginLeft: 14 }}
        />
      )}
    />
  );
};

export default FormInputNote;
