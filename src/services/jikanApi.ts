import axios from 'axios';
import { JikanAnime, JikanManga, JikanSearchResponse, JikanCharacter, AnimeCard, MangaCard } from '@/types/anime';

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

// Create axios instance with rate limiting
const jikanApi = axios.create({
  baseURL: JIKAN_BASE_URL,
  timeout: 10000,
});

// Add request interceptor for rate limiting (Jikan has a 3 requests per second limit)
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 334; // ~3 requests per second

jikanApi.interceptors.request.use(async (config) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
  }
  
  lastRequestTime = Date.now();
  return config;
});

// Helper function to convert JikanAnime to AnimeCard
const convertToAnimeCard = (anime: JikanAnime): AnimeCard => ({
  id: anime.mal_id,
  title: anime.title,
  image: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
  score: anime.score,
  episodes: anime.episodes,
  status: anime.status,
  genres: anime.genres.map(genre => genre.name),
  synopsis: anime.synopsis,
  year: anime.year,
  trailer: anime.trailer.youtube_id ? `https://www.youtube.com/watch?v=${anime.trailer.youtube_id}` : undefined,
});

// Helper function to convert JikanManga to MangaCard
const convertToMangaCard = (manga: JikanManga): MangaCard => ({
  id: manga.mal_id,
  title: manga.title,
  image: manga.images.jpg.large_image_url || manga.images.jpg.image_url,
  score: manga.score,
  chapters: manga.chapters,
  volumes: manga.volumes,
  status: manga.status,
  genres: manga.genres.map(genre => genre.name),
  synopsis: manga.synopsis,
  authors: manga.authors.map(author => author.name),
});

export const jikanService = {
  // Get top anime
  async getTopAnime(page: number = 1, type?: string): Promise<{ data: AnimeCard[], hasNextPage: boolean }> {
    try {
      const params: any = { page };
      if (type) params.type = type;
      
      const response = await jikanApi.get<JikanSearchResponse<JikanAnime>>('/top/anime', { params });
      return {
        data: response.data.data.map(convertToAnimeCard),
        hasNextPage: response.data.pagination.has_next_page,
      };
    } catch (error) {
      console.error('Error fetching top anime:', error);
      throw error;
    }
  },

  // Get seasonal anime
  async getSeasonalAnime(year?: number, season?: string): Promise<AnimeCard[]> {
    try {
      const currentYear = year || new Date().getFullYear();
      const currentSeason = season || getCurrentSeason();
      
      const response = await jikanApi.get<JikanSearchResponse<JikanAnime>>(`/seasons/${currentYear}/${currentSeason}`);
      return response.data.data.map(convertToAnimeCard);
    } catch (error) {
      console.error('Error fetching seasonal anime:', error);
      throw error;
    }
  },

  // Search anime
  async searchAnime(query: string, page: number = 1, genre?: string): Promise<{ data: AnimeCard[], hasNextPage: boolean }> {
    try {
      const params: any = { q: query, page };
      if (genre) params.genres = genre;
      
      const response = await jikanApi.get<JikanSearchResponse<JikanAnime>>('/anime', { params });
      return {
        data: response.data.data.map(convertToAnimeCard),
        hasNextPage: response.data.pagination.has_next_page,
      };
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  },

  // Get anime details
  async getAnimeDetails(id: number): Promise<JikanAnime> {
    try {
      const response = await jikanApi.get<{ data: JikanAnime }>(`/anime/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching anime details:', error);
      throw error;
    }
  },

  // Get top manga
  async getTopManga(page: number = 1, type?: string): Promise<{ data: MangaCard[], hasNextPage: boolean }> {
    try {
      const params: any = { page };
      if (type) params.type = type;
      
      const response = await jikanApi.get<JikanSearchResponse<JikanManga>>('/top/manga', { params });
      return {
        data: response.data.data.map(convertToMangaCard),
        hasNextPage: response.data.pagination.has_next_page,
      };
    } catch (error) {
      console.error('Error fetching top manga:', error);
      throw error;
    }
  },

  // Search manga
  async searchManga(query: string, page: number = 1, genre?: string): Promise<{ data: MangaCard[], hasNextPage: boolean }> {
    try {
      const params: any = { q: query, page };
      if (genre) params.genres = genre;
      
      const response = await jikanApi.get<JikanSearchResponse<JikanManga>>('/manga', { params });
      return {
        data: response.data.data.map(convertToMangaCard),
        hasNextPage: response.data.pagination.has_next_page,
      };
    } catch (error) {
      console.error('Error searching manga:', error);
      throw error;
    }
  },

  // Get manga details
  async getMangaDetails(id: number): Promise<JikanManga> {
    try {
      const response = await jikanApi.get<{ data: JikanManga }>(`/manga/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching manga details:', error);
      throw error;
    }
  },

  // Get random anime
  async getRandomAnime(): Promise<AnimeCard> {
    try {
      const response = await jikanApi.get<{ data: JikanAnime }>('/random/anime');
      return convertToAnimeCard(response.data.data);
    } catch (error) {
      console.error('Error fetching random anime:', error);
      throw error;
    }
  },

  // Get random manga
  async getRandomManga(): Promise<MangaCard> {
    try {
      const response = await jikanApi.get<{ data: JikanManga }>('/random/manga');
      return convertToMangaCard(response.data.data);
    } catch (error) {
      console.error('Error fetching random manga:', error);
      throw error;
    }
  },

  // Get anime characters
  async getAnimeCharacters(id: number): Promise<JikanCharacter[]> {
    try {
      const response = await jikanApi.get<{ data: Array<{ character: JikanCharacter }> }>(`/anime/${id}/characters`);
      return response.data.data.map(item => item.character);
    } catch (error) {
      console.error('Error fetching anime characters:', error);
      throw error;
    }
  },
};

// Helper function to get current season
function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
}