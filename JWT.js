import { sign, verify } from "jsonwebtoken";


export const createTokens = (user) => {
  const accessToken = sign(
    { id: user.id },
      process.env.SECRET
  );

  return accessToken;
};

export const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, process.env.SECRET);
    if (validToken) {
      req.authenticated = true;
      req.payload = validToken;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
