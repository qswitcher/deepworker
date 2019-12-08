import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import TimeDatePicker from "../TimeDatePicker/TimeDatePicker";
import gql from "graphql-tag";

const Input = styled.input`
  height: 66px;
  font-size: 18px;
  padding: 12px;
  width: 100%;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 6px 0px;
`;

const KEY_ENTER = 13;

const ADD_SESSION = gql`
  mutation addSession($session: SessionInput) {
    addSession(session: $session) {
      _id
      project
      start
      end
    }
  }
`;

const Composer = () => {
  const [project, setProject] = useState("");
  const [times, setTimes] = useState({});
  const [addSession] = useMutation(ADD_SESSION);
  return (
    <Wrapper>
      <Input
        value={project}
        onKeyDown={e => {
          if (KEY_ENTER === e.keyCode && times.start && times.end && project) {
            addSession({
              variables: {
                session: {
                  project,
                  ...times
                }
              }
            });
          }
        }}
        onChange={e => setProject(e.target.value)}
        placeholder="What are you working on?"
      />
      <TimeDatePicker onTimesChange={setTimes} />
    </Wrapper>
  );
};

export default Composer;
