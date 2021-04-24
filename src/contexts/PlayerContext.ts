import * as React from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play(episode: Episode): void;
  togglePlay(): void;
};

export const PlayerContext = React.createContext<PlayerContextData>(
  {} as PlayerContextData
);
