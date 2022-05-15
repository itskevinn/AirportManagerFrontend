import {Role} from "./role.model";

export interface User {
  id: string;
  roles: Role[];
  name: string;
  username: string;
  token: string;
}
