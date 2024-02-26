import prismaClient from "../../../../db/prisma/client.prisma";

class ProfilesService {
  async getProfile(userId: string) {
    const profile = await prismaClient.userProfile.findUnique({
      where: { userId },
    });

    return profile;
  }
}

const profilesService = new ProfilesService();

export default profilesService;
