import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PlayerContextProvider } from "../contexts/PlayerContext";
import { ThemeContextProvider } from "../contexts/ThemeContext";
import { GlobalStyles } from "../styles/global";
import { Container } from "../styles/app";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <PlayerContextProvider>
        <GlobalStyles />
        <Container>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </Container>
      </PlayerContextProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
