import React from "react";
import Composer from "../Composer/Composer";
import ActivityFeed from "../ActivityFeed/ActivityFeed";

const MainContent = () => {
  return (
    <section>
      <Composer />
      <ActivityFeed />
    </section>
  );
};

export default MainContent;
