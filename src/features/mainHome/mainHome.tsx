import React, { Component, useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import styled from "styled-components";
import daihocvinh1 from "../../asset/img/daihocvinh1.jpg";
import daihocvinh2 from "../../asset/img/daihocvinh2.jpg";
import daihocvinh3 from "../../asset/img/daihocvinh3.jpg";
import daihocvinh4 from "../../asset/img/daihocvinh4.jpg";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const BoxSlider = styled(Carousel)`
  .slick-prev {
    left: 50px;
    z-index: 1;
  }
  .slick-next {
    right: 80px;
    z-index: 1;
  }
  .slick-next::before {
    display: none;
  }
  .slick-prev::before {
    display: none;
  }
  .slick-dots {
    margin: 0;
    padding-bottom: 50px;
  }
  .slick-dots li.slick-active button:before {
    display: none;
  }
  .slick-dots li.slick-active {
    width: 40px;
  }
  .slick-dots li {
    width: 40px;
  }
  > .slick-dots li.slick-active button {
    background: linear-gradient(
      90deg,
      rgb(17, 153, 250) 0%,
      rgb(17, 208, 250) 100%
    );
  }
  .slick-dots li button:before {
    display: none;
  }
`;

const ViewSlide = styled.div`
  background-image: url(${daihocvinh1});
  background-size: 100% 100%;
`;

const ViewSlideTwo = styled.div`
  background-image: url(${daihocvinh2});
  background-size: 100% 100%;
`;

const ViewSlideThree = styled.div`
  background-image: url(${daihocvinh3});
  background-size: 100% 100%;
`;

const ViewSlideFour = styled.div`
  background-image: url(${daihocvinh4});
  background-size: 100% 100%;
`;

const ViewSlideFive = styled.div`
  background-image: url(${daihocvinh1});
  background-size: 100% 100%;
`;

const ViewSlideSix = styled.div`
  background-image: url(${daihocvinh2});
  background-size: 100% 100%;
`;

const ButtonHeader = styled(Button)`
  margin-top: 160px;
  margin-bottom: 32px;
  font-size: 16px;
  color: #fff;
  font-weight: 700;
  line-height: 1.6em;
  border-radius: 30px;
  padding: 8px 16px;
  border: 0;
  display: flex;
  gap: 8px;
  align-items: center;
  text-transform: uppercase;
  background: linear-gradient(
    90deg,
    rgb(17, 153, 250) 0%,
    rgb(17, 208, 250) 100%
  );
`;

const TitleDate = styled.div`
  font-size: 29px;
  color: rgb(253, 32, 16);
  font-weight: 600;
  font-style: italic;
  line-height: 1.3em;
  margin-bottom: 16px;
  text-align: center;
`;

const TitleContent = styled.div`
  font-size: 67px;
  color: rgb(223, 247, 7);
  font-weight: 600;
  line-height: 1.3em;
  margin-bottom: 16px;
  text-align: center;
`;

const TitleName = styled.div`
  font-size: 29px;
  color: rgb(253, 32, 16);
  font-weight: 600;
  line-height: 1.3em;
  margin-bottom: 32px;
  text-align: center;
`;

const ButtonFooter = styled(Button)`
  margin-bottom: 160px;
  font-size: 16px;
  color: #fff;
  font-weight: 700;
  height: 48px;
  line-height: 1.3em;
  border-radius: 4px;
  padding: 0 48px;
  border: 0;
  background: linear-gradient(
    90deg,
    rgb(17, 153, 250) 0%,
    rgb(17, 208, 250) 100%
  );
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
`;

const IconArrow = styled.div`
  .anticon svg {
    width: 50px;
    height: 50px;
    color: #fff;
  }
`;

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <IconArrow className={className} onClick={onClick}>
      <RightOutlined />
    </IconArrow>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <IconArrow className={className} onClick={onClick}>
      <LeftOutlined />
    </IconArrow>
  );
}

const settings = {
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const MainHome: React.FC = () => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <div>
      {role === "Admin" ? (
        <BoxSlider arrows {...settings}>
          <ViewSlide>
            <Btn>
              <ButtonHeader
                type="primary"
                shape="round"
                icon={<CalendarOutlined />}
              >
                Vietnamese calendar
              </ButtonHeader>
            </Btn>
            <TitleDate>Vinh, {date}</TitleDate>
            <TitleContent>Vinh University</TitleContent>
            <TitleName>Sinh viên: Nguyễn Sinh Hải</TitleName>
            <Btn>
              <ButtonFooter type="primary">
                <Link to="/app/main/user">Xem người dùng</Link>
              </ButtonFooter>
            </Btn>
          </ViewSlide>
          <ViewSlideTwo>
            <Btn>
              <ButtonHeader
                type="primary"
                shape="round"
                icon={<CalendarOutlined />}
              >
                Vietnamese calendar
              </ButtonHeader>
            </Btn>
            <TitleDate>Vinh, {date}</TitleDate>
            <TitleContent>Vinh University</TitleContent>
            <TitleName>Sinh viên: Nguyễn Sinh Hải</TitleName>
            <Btn>
              <ButtonFooter type="primary">
                <Link to="/app/main/role">Xem Vai trò</Link>
              </ButtonFooter>
            </Btn>
          </ViewSlideTwo>
          <ViewSlideThree>
            <Btn>
              <ButtonHeader
                type="primary"
                shape="round"
                icon={<CalendarOutlined />}
              >
                Vietnamese calendar
              </ButtonHeader>
            </Btn>
            <TitleDate>Vinh, {date}</TitleDate>
            <TitleContent>Vinh University</TitleContent>
            <TitleName>Sinh viên: Nguyễn Sinh Hải</TitleName>
            <Btn>
              <ButtonFooter type="primary">
                <Link to="/app/main/task">Xem công việc</Link>
              </ButtonFooter>
            </Btn>
          </ViewSlideThree>
          <ViewSlideFour>
            <Btn>
              <ButtonHeader
                type="primary"
                shape="round"
                icon={<CalendarOutlined />}
              >
                Vietnamese calendar
              </ButtonHeader>
            </Btn>
            <TitleDate>Vinh, {date}</TitleDate>
            <TitleContent>Vinh University</TitleContent>
            <TitleName>Sinh viên: Nguyễn Sinh Hải</TitleName>
            <Btn>
              <ButtonFooter type="primary">
                <Link to="/app/main/project">Xem đồ án</Link>
              </ButtonFooter>
            </Btn>
          </ViewSlideFour>
          <ViewSlideFive>
            <Btn>
              <ButtonHeader
                type="primary"
                shape="round"
                icon={<CalendarOutlined />}
              >
                Vietnamese calendar
              </ButtonHeader>
            </Btn>
            <TitleDate>Vinh, {date}</TitleDate>
            <TitleContent>Vinh University</TitleContent>
            <TitleName>Sinh viên: Nguyễn Sinh Hải</TitleName>
            <Btn>
              <ButtonFooter type="primary">
                <Link to="/app/main/myworkingtime">Quản lý thời gian</Link>
              </ButtonFooter>
            </Btn>
          </ViewSlideFive>
          <ViewSlideSix>
            <Btn>
              <ButtonHeader
                type="primary"
                shape="round"
                icon={<CalendarOutlined />}
              >
                Vietnamese calendar
              </ButtonHeader>
            </Btn>
            <TitleDate>Vinh, {date}</TitleDate>
            <TitleContent>Vinh University</TitleContent>
            <TitleName>Sinh viên: Nguyễn Sinh Hải</TitleName>
            <Btn>
              <ButtonFooter type="primary">
                <Link to="/app/main/workingtime">Xác thực thời gian</Link>
              </ButtonFooter>
            </Btn>
          </ViewSlideSix>
        </BoxSlider>
      ) : (
        <BoxSlider arrows {...settings}>
          <ViewSlideFive>
            <Btn>
              <ButtonHeader
                type="primary"
                shape="round"
                icon={<CalendarOutlined />}
              >
                Vietnamese calendar
              </ButtonHeader>
            </Btn>
            <TitleDate>Vinh, {date}</TitleDate>
            <TitleContent>Vinh University</TitleContent>
            <TitleName>Sinh viên: Nguyễn Sinh Hải</TitleName>
            <Btn>
              <ButtonFooter type="primary">
                <Link to="/app/main/myworkingtime">Quản lý thời gian</Link>
              </ButtonFooter>
            </Btn>
          </ViewSlideFive>
        </BoxSlider>
      )}
    </div>
  );
};

export default MainHome;
