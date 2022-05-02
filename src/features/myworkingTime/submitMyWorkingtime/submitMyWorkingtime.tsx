import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { submitToPendingActions } from "../../../redux/actions/myworkingtime";

const Accept = styled.div``;

export interface IDateValue {
  value: Date | null;
}

const SubmitMyWorkingTime: React.FC<IDateValue> = ({ value }) => {
  const dispatch = useDispatch();

  const handlesubmitToPending = () => {
    if (value) {
      const curr = new Date(value);
      const firstday = new Date(
        curr.setDate(curr.getDate() - curr.getDay() + 1)
      );
      const formatFirstDay =
        firstday.getFullYear() +
        "-" +
        (firstday.getMonth() > 8
          ? firstday.getMonth() + 1
          : "0" + (firstday.getMonth() + 1)) +
        "-" +
        (firstday.getDate() > 9
          ? firstday.getDate()
          : "0" + firstday.getDate());

      const lastday = new Date(
        curr.setDate(curr.getDate() - curr.getDay() + 7)
      );
      const formatLastDay =
        lastday.getFullYear() +
        "-" +
        (lastday.getMonth() > 8
          ? lastday.getMonth() + 1
          : "0" + (lastday.getMonth() + 1)) +
        "-" +
        (lastday.getDate() > 9 ? lastday.getDate() : "0" + lastday.getDate());

      dispatch(
        submitToPendingActions({
          startDate: formatFirstDay,
          endDate: formatLastDay,
        })
      );
    }
  };

  return (
    <Accept>
      <Button
        type="submit"
        variant="contained"
        color="error"
        sx={{ background: "#f24b50", color: "#fff" }}
        onClick={handlesubmitToPending}
      >
        Gửi yêu cầu xác nhận
      </Button>
    </Accept>
  );
};

export default SubmitMyWorkingTime;
