import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { useThemeContext } from "../../contexts/ThemeContext";
import Switch from "react-switch";
import { Container } from "./styles";
import { useTheme } from "styled-components";

export function Header() {
  const [mobile, setMobile] = useState(true);
  const { toggleTheme } = useThemeContext();
  const { title, colors } = useTheme();
  const [switchChecked, setSwitchChecked] = useState(true);

  const toggleSwitch = () => {
    setSwitchChecked(!switchChecked);
    toggleTheme();
  };

  const checkMobile = () => {
    if (window.innerWidth <= 720) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    setSwitchChecked(title === "light" ? true : false);
  }, [title]);

  useEffect(() => {
    checkMobile();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const logo = title === "light" ? "logo" : "logoWhite";

  return (
    <Container>
      <Link href="/">
        <img src={`/${logo}.svg`} alt="Logo" />
      </Link>
      {!mobile && <p>O melhor para você ouvir sempre</p>}
      <div className="switch">
        <Switch
          checked={switchChecked}
          onChange={toggleSwitch}
          onColor={colors.switch}
          offColor={colors.switch}
          checkedIcon={
            <div
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaSun color="yellow" />
            </div>
          }
          uncheckedIcon={
            <div
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaMoon color="yellow" />
            </div>
          }
        />
      </div>
    </Container>
  );
}
