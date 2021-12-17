import { Group } from "./Group";

export interface Poka {
  id: number;
  title: string;
  description: string;
  groupId: number;
  Group: Group;
}
