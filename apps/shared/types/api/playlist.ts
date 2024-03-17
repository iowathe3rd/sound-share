import { Track } from './track';

export interface Playlist {
  id: string;
  title: string;
  description?: string | null;
  coverUrl: string;
  TracksOnPlaylists?: TracksOnPlaylists[];
}

export interface TracksOnPlaylists {
  track: Track;
  trackId: string;
  playlist: Playlist;
  playlistId: string;
  assignedAt: Date;
  assignedBy: string;
}
