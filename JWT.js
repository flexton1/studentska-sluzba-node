import { sign, verify } from "jsonwebtoken";

export const createTokens = (user) => {
  const accessToken = sign(
    { id: user.id },
    "jwtsecretplschange"
  );

  return accessToken;
};

export const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, "jwtsecretplschange");
    if (validToken) {
      req.authenticated = true;
      req.payload = validToken;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
