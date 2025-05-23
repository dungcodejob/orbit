export interface AuthProviderOptions {
  clientId?: string;
  clientSecret?: string;
  issuer?: string;
  audience?: string;
  jwtSecret?: string;
  jwtExpiresIn?: string;
  refreshTokenExpiresIn?: string;
}

export interface TokenPayload {
  sub: string;
  email: string;
  tenantId: string;
  role: string;
  [key: string]: any;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
  idToken?: string;
}

export interface AuthProvider {

  
  validateUser(email: string, password: string): Promise<any>;
  login(user: any): Promise<TokenResponse>;
  refreshToken(token: string): Promise<TokenResponse>;
  verifyToken(token: string): Promise<TokenPayload>;
  revokeToken(token: string): Promise<boolean>;
}