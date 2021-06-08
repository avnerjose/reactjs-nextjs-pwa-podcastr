import { GetStaticProps } from "next";
import Head from "next/head";
import format from "date-fns/format";
import ptBr from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import { LatestEpisodeItem } from "../components/LatestEpisodeItem";
import { EpisodeItem } from "../components/EpisodeItem";
import styles from "./styles/home.module.scss";

interface Episode {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  published_at: string;
  thumbnail: string;
  durationAsString: string;
  duration: number;
  url: string;
}

interface HomeProps {
  latestEpisodes: Array<Episode>;
  allEpisodes: Array<Episode>;
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={styles.homePageContainer}>
      <Head>
        <title>Home | Podcastr</title>
      </Head>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode, index) => (
            <LatestEpisodeItem
              key={episode.id}
              episode={episode}
              index={index}
              episodeList={episodeList}
            />
          ))}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => (
              <EpisodeItem
                key={episode.id}
                episode={episode}
                index={index + latestEpisodes.length}
                episodeList={episodeList}
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 10,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes: Array<Episode> = data.map((episode) => {
    return {
      ...episode,
      publishedAt: format(new Date(episode.published_at), "d, MMM yy", {
        locale: ptBr,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
