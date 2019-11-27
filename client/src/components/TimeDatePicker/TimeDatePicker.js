import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import TotalTime from "../TotalTime/TotalTime";
import "react-dates/initialize"; // weird initialization for AirBnB's datepicker
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";

const StarTimeInput = styled.input`
  padding: 10px 12px;
  outline: none;
  border: 1px solid #f3f3f3;
  border-radius: 8px;
  transition: color 0.5s;
  background-color: initial;
  box-shadow: none;
  font-size: inherit;
  font-color: #222;
  font-family: "Lato", sans-serif;
  width: 128px;
  height: 36px;
  line-height: 36px;
  &:focus {
    outline: none;
  }
`;

const StartTime = styled.div`
  height: 36px;
  line-height: 36px;
  width: 128px;
  position: relative;
`;

const EndTime = styled.input`
  width: 85px;
  height: 36px;
  padding: 10px 12px;
  outline: none;
  border: 1px solid #f3f3f3;
  border-radius: 8px;
  transition: color 0.5s;
  background-color: initial;
  box-shadow: none;
  font-size: inherit;
  font-color: #222;
  font-family: "Lato", sans-serif;
  line-height: 36px;
  &:focus {
    outline: none;
  }
`;

const StartDate = styled.span`
  position: absolute;
  right: 12px;
  height: 36px;
  color: #a3a3a3;
  line-height: 36px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: initial;
`;

const ArrowContainer = styled.div`
  padding: 0 16px;
  path {
    fill: #cecece;
  }
`;
const TimeDatePicker = () => {
  const [seconds, setSeconds] = useState(0);
  const [date, setDate] = useState(null);
  const [datepickerFocus, setDatePickerFocus] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <Container>
      <StartTime>
        <StarTimeInput value="12:57 PM" />
        <StartDate>Today</StartDate>
      </StartTime>
      <ArrowContainer>
        <FontAwesomeIcon icon={faLongArrowAltRight} />
      </ArrowContainer>
      <EndTime value="12:57 PM" />
    </Container>
  );
};

export default TimeDatePicker;
