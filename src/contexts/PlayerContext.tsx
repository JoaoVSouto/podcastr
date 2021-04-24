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
  hasPrevious: boolean;
  hasNext: boolean;
  play(episode: Episode): void;
  playList(list: Episode[], index: number): void;
  playNext(): void;
  playPrevious(): void;
  togglePlay(): void;
  setPlayingState(state: boolean): void;
};

type PlayerContextProviderProps = {
  children: React.ReactNode;
};

export const PlayerContext = React.createContext<PlayerContextData>(
  {} as PlayerContextData
);

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = React.useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(state => !state);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;

  const hasNext = currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    const nextEpisodeIndex = currentEpisodeIndex + 1;

    if (hasNext) {
      setCurrentEpisodeIndex(nextEpisodeIndex);
    }
  }

  function playPrevious() {
    const previousEpisodeIndex = currentEpisodeIndex - 1;

    if (hasPrevious) {
      setCurrentEpisodeIndex(previousEpisodeIndex);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playList,
        playNext,
        playPrevious,
        isPlaying,
        togglePlay,
        setPlayingState,
        hasPrevious,
        hasNext,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = React.useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }

  return context;
};
