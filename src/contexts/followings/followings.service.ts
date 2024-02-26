import prismaClient from "../../db/prisma/client.prisma";

class FollowingService {
  async addFollowing(targetUserId: string, userId: string) {
    const following = await prismaClient.user.update({
      where: { id: userId },
      data: { followings: { connect: { id: targetUserId } } },
    });

    return following;
  }
}

const followingsService = new FollowingService();

export default followingsService;
