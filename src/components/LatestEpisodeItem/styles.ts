import styled from "styled-components";

export const Container = styled.li`
  background: ${({ theme }) => theme.colors.itemBackground};
  padding: 1.25rem;
  border-radius: 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.2);

  img {
    width: 6rem;
    height: 6rem;
    border-radius: 1rem;
  }

  button {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    height: 2.5rem;
    width: 2.5rem;
    background: var(--white);
    border: 1px solid var(--gray-100);
    border-radius: 0.675rem;
    font-size: 0;
    transition: filter 0.2s;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }

    &:hover {
      filter: brightness(0.95);
    }
  }

  @media (max-width: 720px) {
    & {
      & + & {
        margin-top: 1rem;
      }
    }
  }
`;

export const EpisodeDetails = styled.div`
  flex: 1;
  margin-left: 1rem;

  a {
    display: block;
    color: ${({ theme }) => theme.colors.heading};
    font-family: Lexend, sans-serif;
    font-weight: 600;
    text-decoration: none;
    line-height: 1.4rem;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    max-width: 70%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 0.875rem;

    &:last-child {
      margin-left: 0.5rem;
      padding-left: 0.5rem;
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
`;
