export interface CommonResponse {
  message: string
}

export interface SigninResponse extends CommonResponse {
  payload: {
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
