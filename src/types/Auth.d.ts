import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ILogin {
  email: string;
  password: string;
}

interface IRegister {
  name: string;
  email: string;
  npm: string;
  password: string;
  passwordConfirmation: string;
}

interface UserExtended extends User {
  idToken?: string;
  refreshToken?: string;
  data?: UserToken;
}

interface UserToken {
  id: number;
  name: string;
  email: string;
  role: number;
  lab: number;
  isAdmin: boolean;
  isDisabled: boolean;
  dateCreated: string;
}

interface SessionExtended extends Session {
  idToken?: string;
  refreshToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

export type { ILogin, IRegister, JWTExtended, SessionExtended, UserExtended };
