import { User, UserCollection } from "@components/users/domain/user";
import { database } from "@infra/database/database";
import { UserMap } from "@components/users/users.map";
/* eslint-disable @typescript-eslint/no-explicit-any */

interface IUserRepo {
  exists(userId: string): Promise<boolean>;
  getAllUsers(): Promise<UserCollection>;
  getUserById(uuid: string): Promise<User | null>;
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
        uuid: user.uuid,
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

  async getUserById(uuid: string): Promise<User | null> {
    const fetchedUser = await database.user.findUnique({ where: { uuid } });

    if (!fetchedUser) {
      return null;
    }

    const user: User = UserMap.toDomain({
      uuid: fetchedUser.uuid,
      username: fetchedUser.username,
      emailAddress: fetchedUser.emailAddress,
      displayName: fetchedUser.displayName,
      hashedPassword: fetchedUser.hashedPassword,
      avatar: fetchedUser.avatar,
      createdAt: fetchedUser.createdAt,
      karma: fetchedUser.karma,
    });

    return user;
  }

  async save(user: User): Promise<User> {
    const rawUser = UserMap.toPersistence(user);

    const createdUser = await database.user.create({
      data: rawUser,
    });

    const userEntity = UserMap.toDomain({
      uuid: createdUser.uuid,
      username: createdUser.username,
      emailAddress: createdUser.emailAddress,
      displayName: createdUser.displayName,
      hashedPassword: createdUser.hashedPassword,
      avatar: createdUser.avatar,
      createdAt: createdUser.createdAt,
      karma: createdUser.karma,
    });

    return userEntity;
  }
}

export default new UserRepo();
