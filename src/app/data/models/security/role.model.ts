import {MenuItem} from "primeng/api";

export interface Role {
  id: string;
  roleName: string;
  authorities: MenuItem[];
}
