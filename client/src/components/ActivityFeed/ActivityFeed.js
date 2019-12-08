import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";

const RECENT_SESSIONS = gql`
  {
    sessions {
      start
      end
      project
      activity
    }
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  height: 50px;
  align-items: center;
`;

const DayGroupTitle = styled(FlexRow)`
  font-weight: bold;
`;

const Session = styled(FlexRow)`
  box-shadow: rgb(232, 232, 232) 0px -1px 0px 0px inset;
  &:hover {
    background-color: rgb(250, 251, 252);
  }
`;

const FlexItem = styled.div`
  padding: 0 10px;
`;

const DayGroup = styled.div`
  background: white;
  & + * {
    margin-top: 30px;
  }
`;

const SessionActivity = styled(FlexItem)`
  flex-grow: 2;
  display: flex;
  align-items: center;
  color: rgb(137, 0, 0);
  &::before {
    margin: 0px 5px 0px 0px;
    display: inline-block;
    line-height: 1;
    content: "•";
    font-family: Arial, sans-serif;
    font-weight: 700;
    font-size: 26px;
  }
`;

const ActivityFeedContainer = styled.div`
  background: #fafbfc;
  height: 100%;
  padding: 30px 0;
`;

const formatTime = value => {
  return new Date(value).toLocaleTimeString("en-US", {
    timeStyle: "short"
  });
};

const hourDiff = (a, b) => {
  const totalSeconds = (new Date(a).getTime() - new Date(b).getTime()) / 1000;
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const ActivityFeed = () => {
  const { loading, error, data } = useQuery(RECENT_SESSIONS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  // group by day
  const dayGroups = data.sessions.reduce((acc, session) => {
    const date = new Date(session.start).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short"
    });

    acc[date] = acc[date] || [];
    acc[date].push(session);
    return acc;
  }, {});

  return (
    <ActivityFeedContainer>
      {Object.keys(dayGroups).map(date => {
        return (
          <DayGroup key={date}>
            <DayGroupTitle>
              <FlexItem>{date}</FlexItem>
            </DayGroupTitle>
            {dayGroups[date].map((session, index) => {
              return (
                <Session key={index}>
                  <FlexItem>{session.project}</FlexItem>
                  <SessionActivity>{session.activity}</SessionActivity>
                  <FlexItem>{`${formatTime(session.start)} - ${formatTime(
                    session.end
                  )}`}</FlexItem>
                  <FlexItem>{hourDiff(session.end, session.start)}</FlexItem>
                </Session>
              );
            })}
          </DayGroup>
        );
      })}
    </ActivityFeedContainer>
  );
};

export default ActivityFeed;
