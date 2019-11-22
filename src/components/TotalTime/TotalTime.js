import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 8px 18px;
  font-size: 18px;
  color: #7b7b7b;
`;

const TotalTime = ({ seconds }) => {
  const s = seconds % 60;
  const m = Math.floor(seconds / 60);
  const h = Math.floor(seconds / 3600);

  return (
    <Container>{`${h}:${String(m).padStart(2, "0")}:${String(s).padStart(
      2,
      "0"
    )}`}</Container>
  );
};

export default TotalTime;
