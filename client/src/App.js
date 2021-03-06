import React from "react";
import "./App.css";
import Composer from "./components/Composer/Composer";
import ActivityFeed from "./components/ActivityFeed/ActivityFeed";
import styled from "styled-components";

const HeaderSection = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  background: white;
`;

const ContentSection = styled.nav`
  margin-top: 66px;
`;

function App() {
  return (
    <div>
      <HeaderSection>
        <Composer />
      </HeaderSection>
      <ContentSection>
        <ActivityFeed />
      </ContentSection>
    </div>
  );
}

export default App;
