import { Color } from "./Color"
import { DivisionPoints, Colors } from "./Palette"

export enum Themes {
  GRAY_SCALE,
  CYCLIC_GRAY_SCALE,
  RED_CYAN,
  BLUE_GOLD,
  EARTH_AND_SKY,
  HOT_AND_COLD,
  FIRE,
  TREE_COLORS,
  SEA_SHORE,
  RANDOM,
}

export const THEMES_MAP: {
  [key: string]: () => {
    divisionPoints: DivisionPoints
    colors: Colors
  }
} = {
  [Themes.GRAY_SCALE]: () => ({
    divisionPoints: [0, 1],
    colors: [new Color(1, 1, 1), new Color(0, 0, 0)],
  }),
  [Themes.CYCLIC_GRAY_SCALE]: () => ({
    divisionPoints: [0, 0.5, 1],
    colors: [new Color(0, 0, 0), new Color(1, 1, 1), new Color(0, 0, 0)],
  }),
  [Themes.RED_CYAN]: () => ({
    divisionPoints: [0, 0.5, 1],
    colors: [new Color(1, 0, 0), new Color(0, 1, 1), new Color(1, 0, 0)],
  }),
  [Themes.BLUE_GOLD]: () => ({
    divisionPoints: [0, 0.5, 1],
    colors: [new Color(0.1, 0.1, 1), new Color(1, 0.6, 0), new Color(0.3, 0.3, 1)],
  }),
  [Themes.EARTH_AND_SKY]: () => ({
    divisionPoints: [0, 0.15, 0.33, 0.67, 0.85, 1],
    colors: [
      new Color(1, 1, 1),
      new Color(1, 0.8, 0),
      new Color(0.53, 0.12, 0.075),
      new Color(0, 0, 0.6),
      new Color(0, 0.4, 1),
      new Color(1, 1, 1),
    ],
  }),
  [Themes.HOT_AND_COLD]: () => ({
    divisionPoints: [0, 0.16, 0.5, 0.84, 1],
    colors: [
      new Color(1, 1, 1),
      new Color(0, 0.4, 1),
      new Color(0.2, 0.2, 0.2),
      new Color(1, 0, 0.8),
      new Color(1, 1, 1),
    ],
  }),
  [Themes.FIRE]: () => ({
    divisionPoints: [0, 0.17, 0.83, 1],
    colors: [new Color(0, 0, 0), new Color(1, 0, 0), new Color(1, 1, 0), new Color(1, 1, 1)],
  }),
  [Themes.SEA_SHORE]: () => ({
    divisionPoints: [0, 0.1667, 0.3333, 0.5, 0.6667, 0.8333, 1],
    colors: [
      new Color(0.7909, 0.9961, 0.763),
      new Color(0.8974, 0.8953, 0.6565),
      new Color(0.9465, 0.3161, 0.1267),
      new Color(0.5184, 0.1109, 0.0917),
      new Color(0.0198, 0.4563, 0.6839),
      new Color(0.5385, 0.8259, 0.8177),
      new Color(0.7909, 0.9961, 0.76),
    ],
  }),
}
