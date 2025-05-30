import { User } from "@app/shared/entities";


export interface IAuthResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}
