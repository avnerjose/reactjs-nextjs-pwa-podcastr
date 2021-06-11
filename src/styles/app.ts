import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow-y: inherit;
  main {
    flex: 1;
  }

  @media (max-width: 720px) {
    & {
      position: relative;

      overflow-x: hidden;
    }
  }
`;
