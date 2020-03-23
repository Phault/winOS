import { DifficultyPresets, Difficulty } from './DifficultyPresets';
import { Options } from './Options';

export const DefaultOptions: Options = {
  colorEnabled: true,
  unknownMarkEnabled: true,
  soundEnabled: false,
  difficulty: Difficulty.Beginner,
  customDifficulty: DifficultyPresets.get(Difficulty.Beginner)!,
};
