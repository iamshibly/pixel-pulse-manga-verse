import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';

// AniList GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'https://graphql.anilist.co',
});

// Create Apollo Client
export const anilistClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// GraphQL Queries
export const TRENDING_ANIME_QUERY = gql`
  query TrendingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        averageScore
        episodes
        status
        genres
        description
        startDate {
          year
        }
        trailer {
          id
          site
        }
        studios {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export const TRENDING_MANGA_QUERY = gql`
  query TrendingManga($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(type: MANGA, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        averageScore
        chapters
        volumes
        status
        genres
        description
        startDate {
          year
        }
        staff {
          nodes {
            name {
              full
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_ANIME_QUERY = gql`
  query SearchAnime($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(type: ANIME, search: $search) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        averageScore
        episodes
        status
        genres
        description
        startDate {
          year
        }
        trailer {
          id
          site
        }
        studios {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export const SEARCH_MANGA_QUERY = gql`
  query SearchManga($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(type: MANGA, search: $search) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        averageScore
        chapters
        volumes
        status
        genres
        description
        startDate {
          year
        }
        staff {
          nodes {
            name {
              full
            }
          }
        }
      }
    }
  }
`;

export const ANIME_DETAILS_QUERY = gql`
  query AnimeDetails($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        large
        medium
      }
      bannerImage
      averageScore
      meanScore
      popularity
      favourites
      episodes
      duration
      status
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      genres
      studios {
        nodes {
          name
        }
      }
      trailer {
        id
        site
      }
      characters {
        nodes {
          id
          name {
            full
          }
          image {
            large
          }
        }
      }
      recommendations {
        nodes {
          mediaRecommendation {
            id
            title {
              romaji
              english
            }
            coverImage {
              medium
            }
          }
        }
      }
    }
  }
`;

// Types for AniList responses
export interface AniListMedia {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string;
  };
  coverImage: {
    large: string;
    medium: string;
  };
  averageScore: number | null;
  episodes: number | null;
  chapters: number | null;
  volumes: number | null;
  status: string;
  genres: string[];
  description: string | null;
  startDate: {
    year: number | null;
  };
  trailer?: {
    id: string;
    site: string;
  };
  studios?: {
    nodes: Array<{ name: string }>;
  };
  staff?: {
    nodes: Array<{
      name: {
        full: string;
      };
    }>;
  };
}

export interface AniListResponse {
  Page: {
    pageInfo: {
      hasNextPage: boolean;
      currentPage: number;
    };
    media: AniListMedia[];
  };
}

// Service functions
export const anilistService = {
  async getTrendingAnime(page: number = 1, perPage: number = 20) {
    try {
      const result = await anilistClient.query({
        query: TRENDING_ANIME_QUERY,
        variables: { page, perPage },
      });
      return result.data as AniListResponse;
    } catch (error) {
      console.error('Error fetching trending anime from AniList:', error);
      throw error;
    }
  },

  async getTrendingManga(page: number = 1, perPage: number = 20) {
    try {
      const result = await anilistClient.query({
        query: TRENDING_MANGA_QUERY,
        variables: { page, perPage },
      });
      return result.data as AniListResponse;
    } catch (error) {
      console.error('Error fetching trending manga from AniList:', error);
      throw error;
    }
  },

  async searchAnime(search: string, page: number = 1, perPage: number = 20) {
    try {
      const result = await anilistClient.query({
        query: SEARCH_ANIME_QUERY,
        variables: { search, page, perPage },
      });
      return result.data as AniListResponse;
    } catch (error) {
      console.error('Error searching anime on AniList:', error);
      throw error;
    }
  },

  async searchManga(search: string, page: number = 1, perPage: number = 20) {
    try {
      const result = await anilistClient.query({
        query: SEARCH_MANGA_QUERY,
        variables: { search, page, perPage },
      });
      return result.data as AniListResponse;
    } catch (error) {
      console.error('Error searching manga on AniList:', error);
      throw error;
    }
  },

  async getAnimeDetails(id: number) {
    try {
      const result = await anilistClient.query({
        query: ANIME_DETAILS_QUERY,
        variables: { id },
      });
      return result.data.Media;
    } catch (error) {
      console.error('Error fetching anime details from AniList:', error);
      throw error;
    }
  },
};