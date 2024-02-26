import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { nanoid } from "nanoid";
import { JWT_SECRET_KEY } from "../../../config";
import prismaClient from "../../../db/prisma/client.prisma";
import { checkEmail } from "../../../utils/checkEmail";
import { LogInDto, SignUpDto } from "./users.type";

class UsersService {
  async signUp(signUpDto: SignUpDto) {
    const { email, password, nickname, description } = signUpDto;
    const id = nanoid();

    // 이메일 및 패스워드 유효성 검사
    if (!checkEmail(email)) throw new Error("Invalid Email format");
    if (password.length < 8)
      throw new Error("Password length must be at least 8 characters ");

    const encryptedPassword = await hash(password, 12);

    const user = await prismaClient.user.create({
      data: { id, email, encryptedPassword, nickname, description },
    });

    // 회원가입 하는 즉시 프로필 등록
    const profile = await this.registerProfile(user);
    console.log(profile);

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

  // 유저 프로필 등록 함수
  async registerProfile(user: User) {
    const { id, nickname, description } = user;
    // 닉네임 중복여부

    const profile = await prismaClient.userProfile.create({
      data: {
        userId: id,
        nickname,
        description,
      },
    });

    return profile;
  }
}

const usersService = new UsersService();

export default usersService;
