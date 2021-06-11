import { useEffect, useRef, useState } from "react";
import { usePlayerContext } from "../../contexts/PlayerContext";
import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FiRepeat } from "react-icons/fi";
import { BsShuffle } from "react-icons/bs";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import {
  Container,
  Buttons,
  CurrentEpisode,
  EmptyPlayer,
  Progress,
} from "./styles";

interface EpisodeProps {
  thumbnail: string;
  title: string;
  members: string;
  durationAsString: string;
  url: string;
}

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    hasNext,
    hasPrevious,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    playNext,
    playPrevious,
    clearPlayerState,
  } = usePlayerContext();
  const [disabled, setDisabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mobile, setMobile] = useState(true);

  const checkMobile = () => {
    if (window.innerWidth <= 720) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  const episode = episodeList[currentEpisodeIndex];

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener("timeupdate", () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  };

  const handleSlide = (amount: number) => {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  };

  const handleAudioEnd = () => {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
      audioRef.current.currentTime = 0;
      setProgress(0);
    }
  };

  useEffect(() => {
    if (episode) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    checkMobile();
  }, []);

  useEffect(() => {
    if (episode) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [episode]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Container>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        {!mobile ? (
          <strong>Tocando agora</strong>
        ) : (
          <>
            {
              <strong style={{ maxWidth: "90%" }}>
                {episode ? episode.title : "Tocando agora"}
              </strong>
            }
          </>
        )}
      </header>
      {!mobile && (
        <>
          {episode ? (
            <CurrentEpisode>
              <Image
                width={592}
                height={592}
                src={episode.thumbnail}
                objectFit="cover"
              />
              <strong>{episode.title}</strong>
              <span>{episode.members}</span>
            </CurrentEpisode>
          ) : (
            <EmptyPlayer>
              <strong>Selecione um podcast para ouvir</strong>
            </EmptyPlayer>
          )}
        </>
      )}

      <footer className={!episode ? "empty" : ""}>
        <Progress>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className="slider">
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSlide}
                trackStyle={{ backgroundColor: "#04D361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04D361", borderWidth: 4 }}
              />
            ) : (
              <div className="emptySlider" />
            )}
          </div>
          <span>{episode ? episode.durationAsString : "00:00:00"}</span>
        </Progress>

        {episode && (
          <audio
            src={episode.url}
            autoPlay
            ref={audioRef}
            loop={isLooping}
            onLoadedMetadata={setupProgressListener}
            onEnded={handleAudioEnd}
          />
        )}

        <Buttons>
          <button
            type="button"
            onClick={toggleShuffle}
            disabled={disabled || episodeList.length === 1}
          >
            <BsShuffle
              color={isShuffling ? "#04D361" : "#FFF"}
              style={{ width: 20, height: 20 }}
            />
          </button>
          <button
            type="button"
            disabled={disabled || !hasPrevious}
            onClick={playPrevious}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            disabled={disabled}
            className="playButton"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button
            type="button"
            disabled={disabled || !hasNext}
            onClick={playNext}
          >
            <img src="/play-next.svg" alt="Tocar próximo" />
          </button>
          <button type="button" disabled={disabled} onClick={toggleLoop}>
            <FiRepeat
              color={isLooping ? "#04D361" : "#FFF"}
              style={{ width: 20, height: 20 }}
            />
          </button>
        </Buttons>
      </footer>
    </Container>
  );
}
