import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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

const ActivityFeed = () => {
  const { loading, error, data } = useQuery(RECENT_SESSIONS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return data.sessions.map(({ start, end, project, activity }, index) => (
    <div key={index}>
      <p>{`${start} ${end} ${project} ${activity}`}</p>
    </div>
  ));
};

export default ActivityFeed;
