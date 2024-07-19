export interface TPepeImage {
    id: string;
    url: string;
    category: string | null;
  }
  export type T_RESPONSE_RANDOM = {
    result: TPepeImage[];
  };
  