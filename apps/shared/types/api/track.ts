import { User } from './user';
import {Comment} from './comment';
import {TracksOnPlaylists} from './playlist'

export interface Track {
  id: string;
  title: string;
  description?: string | null;
  awsUrl: string;
  coverUrl: string;
  authorId: string;
  author: User;
  comments?: Comment[];
  TracksOnPlaylists?: TracksOnPlaylists[];
}
