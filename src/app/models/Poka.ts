import { Status } from "@app/shared/enums/Status";
import { Group } from "./Group";

export interface Poka {
  id: number;
  title: string;
  description: string;
  status: Status;
  dateFinished: Date;
  favorite: boolean;
  groupId: number;
  Group: Group;
}
