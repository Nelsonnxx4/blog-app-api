import colors from "colors";
import type { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const methodColors = {
    GET: "green",
    POST: "blue",
    PUT: "yellow",
    DELETE: "red",
  } as const;

  const color =
    methodColors[req.method as keyof typeof methodColors] || "white";

  const message = `${req.method} ${req.protocol}://${req.get("host")}${
    req.originalUrl
  }`;
  console.log(colors[color](message));

  next();
};

export default logger;
