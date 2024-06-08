import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("you are not authorized");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json("token is not valid");
    } else {
      req.user = user;
      next();
    }
  });
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(res, req, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed for this action");
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  //first verify token
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed for this action");
    }
  });
};
