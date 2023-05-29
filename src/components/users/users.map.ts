import { User } from "@components/users/domain/user";
import { UserDTO } from "@components/users/domain/userDTO";
import { Username } from "@components/users/domain/username";
import { EmailAddress } from "@components/users/domain/emailAddress";
import { HashedPassword } from "@components/users/domain/hashedPassword";
import { DisplayName } from "@components/users/domain/displayName";
import { Avatar } from "@components/users/domain/avatar";

class UserMap {
  public static toDTO(user: User): UserDTO {
    return {
      uuid: user.uuid.props.value,
      username: user.username.value,
      emailAddress: user.emailAddress.value,
      displayName: user.displayName.value,
      avatar: user.avatar.value,
      createdAt: user.createdAt,
    };
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public static toPersistence(user: User): any {
    return {
      uuid: user.uuid.props.value,
      username: user.username.value,
      emailAddress: user.emailAddress.value,
      hashedPassword: user.hashedPassword.value,
      displayName: user.displayName.value,
      avatar: user.avatar.value,
      karma: user.karma,
    };
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public static toDomain(raw: any): User {
    const username = Username.create(raw.username);
    const emailAddress = EmailAddress.create(raw.emailAddress);
    const hashedPassword = HashedPassword.create(raw.hashedPassword);
    const displayName = DisplayName.create(raw.displayName);
    const avatar = Avatar.create(raw.avatar);
    const { createdAt, karma } = raw;

    const createUserResult = User.createUser({
      username,
      emailAddress,
      hashedPassword,
      displayName,
      avatar,
      createdAt,
      karma,
    });

    if (createUserResult.isFailure) {
      throw new Error(createUserResult.error?.toString());
    }

    return createUserResult.getValue();
  }
}

export { UserMap };
