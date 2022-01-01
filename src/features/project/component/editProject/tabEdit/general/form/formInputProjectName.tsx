import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { IEditProject } from "../../../../../../../interfaces/project/projectType";

interface props {
  control: Control<IEditProject, object>;
}
const FormInputProjectName = ({ control }: props) => {
  return (
    <Controller
      name="name"
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          variant="outlined"
        />
      )}
    />
  );
};

export default FormInputProjectName;
