import { Checkbox } from "@mui/material";
import { red } from "@mui/material/colors";
import { Control, Controller } from "react-hook-form";
import { IEditProject } from "../../../../../../../interfaces/project/projectType";

interface props {
  control: Control<IEditProject, object>;
}
const FormCheckBox = ({ control }: props) => {
  return (
    <Controller
      name="isAllUserBelongTo"
      control={control}
      render={({ field: { onChange, value } }) => (
        <Checkbox
          onChange={onChange}
          checked={value}
          sx={{
            color: red[800],
            "&.Mui-checked": {
              color: red[600],
            },
          }}
        />
      )}
    />
  );
};

export default FormCheckBox;
