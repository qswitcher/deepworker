import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faStopCircle } from "@fortawesome/free-solid-svg-icons";
import TotalTime from "../TotalTime/TotalTime";

const Button = styled.button`
  padding: 0;
  border-radius: 21px;
  border-color: transparent;
  border-width: 3px;
  border-style: solid;

  &:focus {
    border-color: rgba(177, 177, 177, 0.27);
    outline: none;
  }
  svg {
    font-size: 36px;
  }
  path {
    fill: ${props => (props.isActive ? "#e20505" : "rgb(75, 200, 0)")};
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TimerWrapper = styled(Row)`
  padding-right: 12px;
`;

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [date, setDate] = useState(null);
  const [datepickerFocus, setDatePickerFocus] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <TimerWrapper>
      <TotalTime seconds={seconds} />
      <Row>
        <Button isActive={isActive} onClick={() => setIsActive(!isActive)}>
          <FontAwesomeIcon icon={(isActive && faStopCircle) || faPlayCircle} />
        </Button>
      </Row>
    </TimerWrapper>
  );
};

export default Timer;
