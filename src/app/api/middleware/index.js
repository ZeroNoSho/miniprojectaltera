import jwt from "jsonwebtoken";

export function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}
