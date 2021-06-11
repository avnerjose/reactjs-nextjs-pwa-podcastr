import { useEffect, useState } from "react";
import format from "date-fns/format";
import ptBr from "date-fns/locale/pt-BR";
import Link from "next/link";
import styles from "./styles.module.scss";
import { Container } from "./styles";

export function Header() {
  const currentDate = format(new Date(), "EEEEEE, d MMM", {
    locale: ptBr,
  });

  const [mobile, setMobile] = useState(true);

  const checkMobile = () => {
    if (window.innerWidth <= 720) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    checkMobile();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Container>
      <Link href="/">
        <img src="/logo.svg" alt="Logo" />
      </Link>
      <p>O melhor para você ouvir sempre</p>

      {!mobile && <span>{currentDate}</span>}
    </Container>
  );
}
