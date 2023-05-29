import { User, UserCollection } from "@components/users/domain/user";
import { database } from "@infra/database/database";
import { UserMap } from "@components/users/users.map";
/* eslint-disable @typescript-eslint/no-explicit-any */

interface IUserRepo {
  exists(userId: string): Promise<boolean>;
  getUsers(): Promise<UserCollection>;
  getUserById(userId: string): Promise<any>;
  save(user: User): Promise<User>;
}

class UserRepo implements IUserRepo {
  /* eslint-disable class-methods-use-this */
  async exists(userId: string): Promise<boolean> {
    const user = await database.user.findUnique({ where: { uuid: userId } });
    return !!user;
  }

  async getAllUsers(): Promise<UserCollection> {
    const fetchedUsers = await database.user.findMany();
    const users: UserCollection = [];

    let userEntity: User;
    fetchedUsers.forEach((user) => {
      userEntity = UserMap.toDomain({
        username: user.username,
        emailAddress: user.emailAddress,
        hashedPassword: user.hashedPassword,
        displayName: user.displayName,
        avatar: user.avatar,
        createdAt: user.createdAt,
        karma: user.karma,
      });

      users.push(userEntity);
    });

    return users;
  }
}

export default new UserRepo();
