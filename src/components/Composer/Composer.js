import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const TimeDatePicker = () => null;
const IconWrapper = styled.div`
  path {
    fill: rgb(75, 200, 0);
  }
`;
const Button = styled.button`
  height: 100%;
  border: none;
`;

const Timer = () => (
  <div>
    <Button>
      <IconWrapper>
        <FontAwesomeIcon icon={faPlayCircle} size="4x" />
      </IconWrapper>
    </Button>
  </div>
);

const Input = styled.input`
  height: 66px;
  font-size: 16px;
  padding: 12px;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Composer = () => {
  return (
    <Wrapper>
      <Input placeholder="What are you working on?" />
      <TimeDatePicker />
      <Timer />
    </Wrapper>
  );
};

export default Composer;
