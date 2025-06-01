interface NumberList {
  massiv: number[];
  consistencyImportant: boolean;
}

interface VariantList {
  variants: string[];
  correct: number[];
}

interface NumberPair {
  pairs: [number, number][];
  consistencyImportant: boolean;
}

type Answer =
  | string
  | number
  | NumberList
  | number[][]
  | VariantList
  | NumberPair
  | [number, number][];

// interface Question {
//   id: number;
//   points: number;
//   type: string;
//   text: string;
//   answer: Answer;
// }

export interface Question {
  id: number;
  text: string;
  points: number;
}

// Інтерфейс для головного об'єкта
export interface Task {
  type: string;
  id: number;
  nazwa: string;
  nomer: number;
  totalPoints: number;
  progress: number;
  additional?: string;
  questions: Question[];
}
