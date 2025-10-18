import type { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`not found`);
  (error as any).status = 404;
  return next(error);
};

export default notFound;
