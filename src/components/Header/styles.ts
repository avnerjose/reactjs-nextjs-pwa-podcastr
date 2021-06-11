import styled from "styled-components";

export const Container = styled.header`
  background: ${({ theme }) => theme.colors.itemBackground};
  height: 6.5rem;
  display: flex;
  align-items: center;
  padding: 2rem 4rem;
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.colors.text};
  
  img {
    cursor: pointer;
  }

  p {
    margin-left: 2rem;
    padding: 0.25rem 0 0.25rem 2rem;
    border-left: 1px solid var(--gray-100);
  }

  .switch {
    margin-left: auto;
    text-transform: capitalize;
  }

  @media (max-width: 720px) {
    & {
      width: 100vw;
      padding: 1rem;
      img {
        width: 10rem;
      }
    }
  }
`;
