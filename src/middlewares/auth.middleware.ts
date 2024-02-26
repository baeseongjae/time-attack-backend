import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import prismaClient from "../db/prisma/client.prisma";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  req.user = null;

  // 여권 없어? => 일단 보내
  const accessToken = req.headers.authorization?.split("Bearer ")[1];
  if (!accessToken) return next();

  try {
    // 여권 유효하니?
    const { sub: id } = verify(accessToken, JWT_SECRET_KEY);
    const user = await prismaClient.user.findUnique({
      where: { id: id as string },
    });

    // 유저 있어?
    if (!user) throw new Error("Deleted User");

    req.user = user;
    next();
  } catch (e) {
    return next(e);
  }
}

export default authMiddleware;
