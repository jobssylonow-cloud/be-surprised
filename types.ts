
export enum View {
  HERO = 'HERO',
  SCANNER = 'SCANNER',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}

export interface ScanData {
  exName: string;
  selectedLine: string;
  expected: string;
  actual: string;
  score: number;
}

export const EXPECTATION_OPTIONS = [
  'Thoughtful gift',
  'Planned quality time',
  'Meaningful message',
  'Celebration effort',
  'Consistent commitment'
];
