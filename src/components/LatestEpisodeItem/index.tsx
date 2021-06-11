import Image from "next/image";
import Link from "next/link";
import { usePlayerContext } from "../../contexts/PlayerContext";
import { Container, EpisodeDetails } from "./styles";

interface EpisodeProps {
  id: string;
  thumbnail: string;
  title: string;
  publishedAt: string;
  members: string;
  durationAsString: string;
  duration: number;
  url: string;
}

interface LatestEpisodeItemProps {
  index: number;
  episode: EpisodeProps;
  episodeList: Array<EpisodeProps>;
}

export function LatestEpisodeItem({
  index,
  episode,
  episodeList,
}: LatestEpisodeItemProps) {
  const { handlePlayList } = usePlayerContext();
  return (
    <Container>
      <Image
        width={192}
        height={192}
        src={episode.thumbnail}
        alt={episode.title}
        objectFit="cover"
      />

      <EpisodeDetails>
        <Link href={`/episode/${episode.id}`} passHref>
          <a>{episode.title}</a>
        </Link>
        <p>{episode.members}</p>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </EpisodeDetails>

      <button type="button" onClick={() => handlePlayList(episodeList, index)}>
        <img src="/play-green.svg" alt="Tocar episódio" />
      </button>
    </Container>
  );
}
