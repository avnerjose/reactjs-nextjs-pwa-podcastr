import styled from "styled-components";

export const Container = styled.div`
  padding: 0 1rem 2rem;
  height: calc(100vh - 6.5rem);
  overflow-y: scroll;
  h2 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 720px) {
    & {
      position: absolute;
      width: 100vw;
      top: calc(6.5rem + 12rem);
      overflow-y: inherit;
      h2 {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
    }
  }
`;

export const LatestEpisodes = styled.section`
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 720px) {
    & {
      ul {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }
  }
`;

export const AllEpisodes = styled.section`
  width: 100%;

  th {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--gray-100);
  }

  th {
    color: var(--gray-200);
    text-transform: uppercase;
    font: 500 0.75rem Lexed, sans-serif;
    text-align: left;
  }
`;
