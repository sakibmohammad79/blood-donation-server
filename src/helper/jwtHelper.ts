import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken = (jwtPayload: JwtPayload, secret: Secret, exp: string) => {
  const token = jwt.sign(jwtPayload, secret as string, {
    algorithm: "HS256",
    expiresIn: exp,
  });
  return token;
};

const verifyToken = (token: string | undefined, secret: Secret) => {
  return jwt.verify(token as string, secret);
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
