import { Request, Response } from "express";

function UnhandledController(req: Request, res: Response) {
  res.status(503).json({
    status: 503,
    message: `${req.method} ${req.originalUrl} not implemented.`,
  });
}

export default UnhandledController;
