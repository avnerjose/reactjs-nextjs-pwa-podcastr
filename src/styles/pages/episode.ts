import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem 1rem;
  overflow-y: inherit;
  height: calc(100vh - 6.5rem);

  header {
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--gray-100);
    color: ${({ theme }) => theme.colors.text};
    h1 {
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    span {
      display: inline-block;
      font-size: 0.875rem;

      & + span {
        margin-left: 1rem;
        padding-left: 1rem;
        position: relative;

        &::before {
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: #ddd;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  @media (max-width: 720px) {
    & {
      position: absolute;
      top: calc(6.5rem + 12rem);
      
      header {
        h1 {
          font-size: 1.5rem;
        }
      }
    }
  }
`;

export const Content = styled.div`
  padding: 1rem 2rem;
  max-width: 45rem;
  margin: 0 auto;
`;

export const ThumbnailContainer = styled.div`
  position: relative;

  img {
    border-radius: 1rem;
  }

  button {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: 0;
    position: absolute;
    font-size: 0;
    z-index: 5;
    transition: filter 0.2;
    background: yellow;

    &:hover {
      filter: brightness(0.9);
    }

    &:first-child {
      left: 0;
      top: 50%;
      background: var(--purple-500);
      transform: translate(-50%, -50%);
    }

    &:last-child {
      right: 0;
      top: 50%;
      background: var(--green-500);
      transform: translate(50%, -50%);
    }
  }
`;

export const Description = styled.div`
  margin-top: 2rem;
  line-height: 1.675rem;
  color: ${({ theme }) => theme.colors.text};

  p {
    margin: 1.5rem 0;
  }
`;
