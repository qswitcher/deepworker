import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { DayPickerSingleDateController } from "react-dates";
import moment from "moment";

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

const TimeDatePicker = () => {
  const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(false);
  const [startTime, setStartTime] = useState(formatTime());
  const [endTime, setEndTime] = useState(formatTime());

  let startTimeRef = React.createRef();
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
          onBlur={e => {
            const parsed = parseTime(e.target.value);
            setStartTime(formatTime((parsed.isValid() && parsed) || moment()));
            if (parsed.isAfter(parseTime(endTime))) {
              setEndTime("");
            }
          }}
          onKeyDown={e => {
            if ([KEY_ENTER, KEY_TAB].includes(e.keyCode)) {
              const parsed = parseTime(e.target.value);
              setStartTime(
                formatTime((parsed.isValid() && parsed) || moment())
              );
              if (parsed.isAfter(parseTime(endTime))) {
                setEndTime("");
              }
            }
          }}
          value={startTime}
        />
        <StartDate>{date ? date.format("MM/DD") : "Today"}</StartDate>
        {focused && (
          <DayPickerSingleDateController
            date={date}
            focused={true}
            onOutsideClick={e => {
              if (!startTimeRef.current.contains(e.target)) {
                setFocused(false);
              }
            }}
            onDateChange={date => {
              setDate(date);
            }}
          />
        )}
      </StartTime>
      <ArrowContainer>
        <FontAwesomeIcon icon={faLongArrowAltRight} />
      </ArrowContainer>
      <EndTime
        onChange={e => setEndTime(e.target.value)}
        onBlur={e => {
          const parsed = parseTime(e.target.value);
          setEndTime(formatTime((parsed.isValid() && parsed) || moment()));
          if (parsed.isBefore(parseTime(startTime))) {
            setStartTime("");
          }
        }}
        onKeyDown={e => {
          if ([KEY_ENTER, KEY_TAB].includes(e.keyCode)) {
            const parsed = parseTime(e.target.value);
            setEndTime(formatTime((parsed.isValid() && parsed) || moment()));
            if (parsed.isBefore(parseTime(startTime))) {
              setStartTime("");
            }
          }
        }}
        value={endTime}
      />
    </Container>
  );
};

export default TimeDatePicker;
