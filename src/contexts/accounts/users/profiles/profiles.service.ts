import prismaClient from "../../../../db/prisma/client.prisma";
import { UpdateProfileDto } from "./profiles.type";

class ProfilesService {
  async getProfile(userId: string) {
    const profile = await prismaClient.userProfile.findUnique({
      where: { userId },
    });

    return profile;
  }

  async updateProfile(updateProfileDto: UpdateProfileDto) {
    const { userId, nickname, description } = updateProfileDto;
    const profile = await prismaClient.userProfile.update({
      where: { userId },
      data: {
        nickname,
        description,
      },
    });

    return profile;
  }
}

const profilesService = new ProfilesService();

export default profilesService;
