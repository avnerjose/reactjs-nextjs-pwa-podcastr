import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { api } from "../../services/api";
import Image from "next/image";
import Link from "next/link";
import format from "date-fns/format";
import ptBr from "date-fns/locale/pt-BR";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { usePlayerContext } from "../../contexts/PlayerContext";
import {
  Container,
  Content,
  Description,
  ThumbnailContainer,
} from "../../styles/pages/episode";

interface EpisodeProps {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  published_at: string;
  thumbnail: string;
  durationAsString: string;
  duration: number;
  description: string;
  url: string;
}

interface EpisodePageProps {
  episode: EpisodeProps;
}

export default function Episode({ episode }: EpisodePageProps) {
  const { handlePlay } = usePlayerContext();
  return (
    <Container>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
      <Content>
        <ThumbnailContainer>
          <Link href="/">
            <button type="button">
              <img src="/arrow-left.svg" alt="Voltar" />
            </button>
          </Link>
          <Image
            width={700}
            height={200}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <button type="button" onClick={() => handlePlay(episode)}>
            <img src="/play.svg" alt="Tocar episódio" />
          </button>
        </ThumbnailContainer>
        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>

        <Description
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </Content>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 2,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const paths = data.map((episode: EpisodeProps) => {
    return {
      params: {
        slug: episode.id,
      },
    };
  });

  return {
    paths, //Pages that will be generated with SSG during build
    fallback: "blocking", //false = Shows only pages generated with SSG
  }; //true =  getStaticProps is executed ClientSide
}; //blocking = getStaticProps is executed ServerSide (NextJS server)

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    ...data,
    publishedAt: format(new Date(data.published_at), "d, MMM yy", {
      locale: ptBr,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    url: data.file.url,
  } as EpisodeProps;

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24,
  };
};
