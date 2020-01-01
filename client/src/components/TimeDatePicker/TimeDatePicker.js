import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { DayPickerSingleDateController } from "react-dates";
import moment from "moment";

const Button = styled.button`
  margin: 0 12px 0 18px;
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
    fill: rgb(75, 200, 0);
  }
`;

const StarTimeInput = styled.input`
  padding: 10px 12px;
  outline: none;
  border: 1px solid #f3f3f3;
  border-radius: 8px;
  transition: color 0.5s;
  background-color: initial;
  box-shadow: none;
  font-size: inherit;
  color: #222;
  font-family: "Lato", sans-serif;
  width: 128px;
  height: 36px;
  line-height: 36px;
  margin-bottom: 8px;
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
  height: 66px;
`;

const ArrowContainer = styled.div`
  padding: 0 16px;
  path {
    fill: #cecece;
  }
`;

const KEY_ENTER = 13;
const KEY_TAB = 9;

const parseTime = value => moment(value, "h:mm A");
const formatTime = (m = moment()) => m.format("h:mm A");

const copyTime = (d, time) => {
  const { years, months, date } = d.toObject();
  const { hours, minutes, seconds } = time.toObject();
  return moment({
    years,
    months,
    date,
    hours,
    minutes,
    seconds
  });
};

const TimeDatePicker = ({ onTimesChange }) => {
  const [startDate, setStartDate] = useState(moment());
  const [focused, setFocused] = useState(false);
  const [startTime, setStartTime] = useState(formatTime());
  const [endTime, setEndTime] = useState(formatTime());

  let startTimeRef = React.createRef();

  const setTime = setter => e => {
    const parsed = parseTime(e.target.value);
    setter(formatTime((parsed.isValid() && parsed) || moment()));
  };

  return (
    <Container>
      <StartTime
        ref={startTimeRef}
        onClick={e => {
          e.stopPropagation();
          setFocused(true);
        }}
      >
        <StarTimeInput
          onChange={e => setStartTime(e.target.value)}
          onBlur={setTime(setStartTime)}
          onKeyDown={e => {
            if ([KEY_ENTER, KEY_TAB].includes(e.keyCode)) {
              setTime(setStartTime)(e);
            }
          }}
          value={startTime}
        />
        <StartDate>
          {startDate.isSame(moment(), "day")
            ? "Today"
            : startDate.format("MM/DD")}
        </StartDate>
        {focused && (
          <DayPickerSingleDateController
            date={startDate}
            focused={true}
            onOutsideClick={e => {
              if (!startTimeRef.current.contains(e.target)) {
                setFocused(false);
              }
            }}
            onDateChange={startDate => {
              setStartDate(startDate);
            }}
          />
        )}
      </StartTime>
      <ArrowContainer>
        <FontAwesomeIcon icon={faLongArrowAltRight} />
      </ArrowContainer>
      <EndTime
        onChange={e => setEndTime(e.target.value)}
        onBlur={setTime(setEndTime)}
        onKeyDown={e => {
          if ([KEY_ENTER, KEY_TAB].includes(e.keyCode)) {
            setTime(setEndTime)(e);
          }
        }}
        value={endTime}
      />
      <Button>
        <FontAwesomeIcon
          icon={faCheckCircle}
          onClick={e => {
            e.preventDefault();

            const startTimeMoment = parseTime(startTime);
            const endTimeMoment = parseTime(endTime);

            const start = copyTime(startDate, startTimeMoment);
            const end = copyTime(startDate, endTimeMoment);

            // add extra day if start time is after end time (i.e. worked past midnight into next day)
            if (startTimeMoment.isAfter(endTimeMoment)) {
              end.add(1, "d");
            }

            onTimesChange({
              start,
              end
            });
          }}
        />
      </Button>
    </Container>
  );
};

export default TimeDatePicker;
