import { Dimensions } from 'react-native';

// Guideline sizes are based on the unit being used in the Figma file
const GUIDELINE_BASE_WIDTH = 375;

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export function normalize(fontSize: number): number {
  return Math.floor((SCREEN_WIDTH / GUIDELINE_BASE_WIDTH) * fontSize);
}
