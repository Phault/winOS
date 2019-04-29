import smileys from './assets/smileys_colorless.png';
import digits from './assets/digits_colorless.png';
import cells from './assets/cells_colorless.png';
import { Theme } from './Theme';
import { DefaultTheme } from './DefaultTheme';

export const ColorlessTheme: Theme = {
    ...DefaultTheme,
    smileys,
    cells,
    digits,
    border: {
        ...DefaultTheme.border,
        dark: 'black'
    },
};
