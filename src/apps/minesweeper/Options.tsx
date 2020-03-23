import { Difficulty, DifficultyPreset } from './DifficultyPresets';
export interface Options {
  unknownMarkEnabled: boolean;
  colorEnabled: boolean;
  soundEnabled: boolean;
  difficulty: Difficulty;
  customDifficulty: DifficultyPreset;
}
