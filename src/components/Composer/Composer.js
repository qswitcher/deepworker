import React from "react";
import styled from "styled-components";

const TimeDatePicker = () => null;

const Input = styled.input`
  height: 66px;
  font-size: 16px;
  padding: 12px;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Composer = () => {
  return (
    <Wrapper>
      <Input placeholder="What are you working on?" />
      <TimeDatePicker />
    </Wrapper>
  );
};

export default Composer;
