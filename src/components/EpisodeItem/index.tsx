import Image from "next/image";
import Link from "next/link";
import { usePlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";

interface EpisodeProps {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  durationAsString: string;
  duration: number;
  url: string;
}

interface EpisodeItemProps {
  index: number;
  episode: EpisodeProps;
  episodeList: Array<EpisodeProps>;
}

export function EpisodeItem({ index, episode, episodeList }: EpisodeItemProps) {
  const { handlePlayList } = usePlayerContext();
  return (
    <tr className={styles.container}>
      <td style={{ width: 72 }}>
        <Image
          width={120}
          height={120}
          src={episode.thumbnail}
          alt={episode.title}
          objectFit="cover"
        />
      </td>
      <td>
        <Link href={`/episode/${episode.id}`}>
          <a>{episode.title}</a>
        </Link>
      </td>
      <td>{episode.members}</td>
      <td style={{ width: 100 }}>{episode.publishedAt}</td>
      <td>{episode.durationAsString}</td>
      <td>
        <button
          type="button"
          onClick={() => handlePlayList(episodeList, index)}
        >
          <img src="/play-green.svg" alt="Tocar episódio" />
        </button>
      </td>
    </tr>
  );
}
