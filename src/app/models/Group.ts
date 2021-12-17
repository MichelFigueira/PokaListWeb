import { Poka } from "./Poka";

export interface Group {
  id: number;
  title: string;
  pokas: Poka[];
}
