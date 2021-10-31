import { User } from './object';

export interface CommonResponse {
  message: string
}

export interface SigninResponse extends CommonResponse {
  payload: {
    id: string,
    name: string,
    email: string,
    token: string
  }
}

export interface SignupResponse extends CommonResponse {
  payload: {
    name: string,
    email: string
  }
}

export interface GetUserResponse extends CommonResponse {
  payload: User
}