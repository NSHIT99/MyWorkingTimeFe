import React, { useState } from "react";
import { TabPanel } from "@mui/lab";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import styled from "styled-components";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import FormInputProjectName from "./form/formInputProjectName";
import FormInputProjectCode from "./form/formInputProjectCode";
import FormInputTimeStart from "./form/formInputTimeStart";
import FormInputTimeEnd from "./form/formInputTimeEnd";
import FormInputNote from "./form/formInputNote";
import FormCheckBox from "./form/formCheckBox";
import { IEditProject } from "../../../../../../interfaces/project/projectType";

const Text = styled.div`
  font-weight: 550;
  font-size: 15px;
`;

const StyleContentTwo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  margin-top: 10px;
`;
const StyleContentThree = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
const StyleContentFour = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const ListButton = styled.div`
  margin-left: 56px;
  display: flex;
  gap: 20px;
`;

const StyledCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 75px;
`;

interface props {
  control: Control<IEditProject, object>;
  setValue: UseFormSetValue<IEditProject>;
  register: UseFormRegister<IEditProject>;
}

const General = ({ control, setValue }: props) => {
  const [activeButton, setActiveButton] = useState<number>();
  return (
    <TabPanel value="1" sx={{ paddingTop: "20px", paddingLeft: "0" }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <StyleContentTwo>
                <Text>Project Name*</Text>
                <FormInputProjectName control={control} />
              </StyleContentTwo>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <StyleContentTwo>
                <Text>Project Code*</Text>
                <FormInputProjectCode control={control} />
              </StyleContentTwo>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <StyleContentThree>
                <Text>Date*</Text>
                <FormInputTimeStart control={control} />
                <>to</>
                <FormInputTimeEnd control={control} />
              </StyleContentThree>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <StyleContentFour>
                <Text>Note</Text>
                <FormInputNote control={control} />
              </StyleContentFour>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <StyleContentFour>
                <Text>All User</Text>
                <StyledCheckBox>
                  <FormCheckBox control={control} />
                  <Text>
                    Auto add user as a member of this project when creating new
                    user
                  </Text>
                </StyledCheckBox>
              </StyleContentFour>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <StyleContentFour>
                <Text>Project Type*</Text>
                <ListButton>
                  <Controller
                    name="projectType"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Button
                        type="button"
                        defaultValue={value}
                        onChange={onChange}
                        style={{
                          marginRight: "10px",
                          width: "130px",
                          height: "50px",
                          color:
                            activeButton === 0 || value === 0
                              ? "#ffffff"
                              : "black",
                          textTransform: "none",
                          borderRadius: "8px",
                          border: "1px solid#c1c1c1",
                          whiteSpace: "nowrap",
                          background:
                            activeButton === 0 || value === 0
                              ? "#f36c00"
                              : "#ffffff",
                        }}
                        variant="contained"
                        onClick={() => {
                          setActiveButton(0);
                          setValue("projectType", 0);
                        }}
                      >
                        Đồ án thực tập
                      </Button>
                    )}
                  />
                  <Controller
                    name="projectType"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Button
                        type="button"
                        defaultValue={value}
                        onChange={onChange}
                        style={{
                          marginRight: "10px",
                          width: "130px",
                          height: "50px",
                          color:
                            activeButton === 1 || value === 1
                              ? "#ffffff"
                              : "black",
                          textTransform: "none",
                          borderRadius: "8px",
                          border: "1px solid#c1c1c1",
                          whiteSpace: "nowrap",
                          background:
                            activeButton === 1 || value === 1
                              ? "#f36c00"
                              : "#ffffff",
                        }}
                        variant="contained"
                        onClick={() => {
                          setActiveButton(1);
                          setValue("projectType", 1);
                        }}
                      >
                        Đồ án chuyên ngành
                      </Button>
                    )}
                  />
                  <Controller
                    name="projectType"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Button
                        type="button"
                        defaultValue={value}
                        onChange={onChange}
                        style={{
                          marginRight: "10px",
                          width: "130px",
                          height: "50px",
                          color:
                            activeButton === 2 || value === 2
                              ? "#ffffff"
                              : "black",
                          textTransform: "none",
                          borderRadius: "8px",
                          border: "1px solid#c1c1c1",
                          whiteSpace: "nowrap",
                          background:
                            activeButton === 2 || value === 2
                              ? "#f36c00"
                              : "#ffffff",
                        }}
                        variant="contained"
                        onClick={() => {
                          setActiveButton(2);
                          setValue("projectType", 2);
                        }}
                      >
                        Đồ án tốt nghiệp
                      </Button>
                    )}
                  />
                </ListButton>
              </StyleContentFour>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TabPanel>
  );
};

export default General;
