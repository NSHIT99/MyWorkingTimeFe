import React, { useEffect } from "react";
import styled from "styled-components";
import PieChart, { Series, Label, Legend } from "devextreme-react/pie-chart";

const ListStatistical: React.FC<{ confirm: any }> = ({ confirm }) => {
  let countTrue = 0;
  let countFalse = 0;
  for (const num of confirm) {
    if (num === true) {
      countTrue++;
    } else countFalse++;
  }

  const areaTrueChart = countTrue / confirm.length;
  const areaFalseChart = countFalse / confirm.length;
  const areaTrue = (countTrue * 100) / confirm.length;
  const data = [
    {
      name: "Hoàn thành",
      area: areaTrueChart,
    },
    {
      name: "Chưa hoàn hành",
      area: areaFalseChart,
    },
  ];

  const pieCharts = [
    {
      title: "Thống kê kết quả",
      dataSource: data,
    },
  ];

  const pies = pieCharts.map((options, i) => (
    <PieChart
      className="pie"
      key={i}
      title={options.title}
      sizeGroup="piesGroup"
      dataSource={options.dataSource}
    >
      <Series argumentField="name" valueField="area">
        <Label visible={true} format="percent" />
      </Series>
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="right"
        rowCount={2}
      />
    </PieChart>
  ));

  return (
    <div>
      <div className="pies-container">{pies}</div>
      <div
        style={{
          marginTop: "20px",
          fontSize: "20px",
          color: "red",
          textAlign: "center",
        }}
      >
        Công việc được giao của nhóm đã hoàn thiện {areaTrue}% và được đánh giá{" "}
        {areaTrue / 10} điểm.
      </div>
    </div>
  );
};

export default ListStatistical;
