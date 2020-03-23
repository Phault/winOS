import { Size } from '../../misc/Size';

export interface DifficultyPreset extends Size {
  mines: number;
}

export enum Difficulty {
  Beginner,
  Intermediate,
  Expert,
  Custom,
}

export const DifficultyPresets = new Map<Difficulty, DifficultyPreset>([
  [
    Difficulty.Beginner,
    {
      width: 9,
      height: 9,
      mines: 10,
    },
  ],
  [
    Difficulty.Intermediate,
    {
      width: 16,
      height: 16,
      mines: 40,
    },
  ],
  [
    Difficulty.Expert,
    {
      width: 30,
      height: 16,
      mines: 99,
    },
  ],
]);
