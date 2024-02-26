import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { nanoid } from "nanoid";
import { JWT_SECRET_KEY } from "../../../config";
import prismaClient from "../../../db/prisma/client.prisma";
import { LogInDto, SignUpDto } from "./users.dto";

class UsersService {
  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const id = nanoid();
    const encryptedPassword = await hash(password, 12);

    const user = await prismaClient.user.create({
      data: { id, email, encryptedPassword },
    });

    const accessToken = this.generateToken(user);

    return accessToken;
  }

  async logIn(logInDto: LogInDto) {
    const { email, password } = logInDto;

    //이메일에 해당하는 유저찾기
    const user = await prismaClient.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error("No User");

    // 비밀번호 검증
    const isValid = await compare(password, user.encryptedPassword);
    if (!isValid) throw new Error("Invalid password");

    const accessToken = this.generateToken(user);
    return accessToken;
  }

  generateToken(user: User) {
    const { id: subject, email } = user;
    const accessToken = sign({ email }, JWT_SECRET_KEY, {
      subject,
      expiresIn: "2h",
    });

    return accessToken;
  }
}

const usersService = new UsersService();

export default usersService;
