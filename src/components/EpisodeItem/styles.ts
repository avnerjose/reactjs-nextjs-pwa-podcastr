import styled from "styled-components";

export const Container = styled.tr`
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--gray-100);
  }
  td {
    font-size: 0.875rem;

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.5rem;
    }

    a {
      color: var(--gray-800);
      font-family: Lexend, sans-serif;
      font-weight: 600;
      text-decoration: none;
      line-height: 1.4rem;
      font-size: 1rem;

      &:hover {
        text-decoration: underline;
      }
    }
    button {
      height: 2rem;
      width: 2rem;
      background: var(--white);
      border: 1px solid var(--gray-100);
      border-radius: 0.5rem;
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
  }
`;
