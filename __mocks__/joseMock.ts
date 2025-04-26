export const SignJWT = jest.fn(() => ({
  setProtectedHeader: jest.fn().mockReturnThis(),
  setIssuedAt: jest.fn().mockReturnThis(),
  setExpirationTime: jest.fn().mockReturnThis(),
  sign: jest.fn().mockResolvedValue("mocked.jwt.token"),
}));

export const jwtVerify = jest.fn(() => ({
  payload: { userId: 1 },
}));
