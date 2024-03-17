import {Track} from './track'

export interface Comment {
  id: string;
  text: string;
  Track: Track;
  trackId: string;
}
