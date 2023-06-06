import { User } from "@components/users/domain/user";
import { UserDTO } from "@components/users/domain/userDTO";
import { Username } from "@components/users/domain/username";
import { EmailAddress } from "@components/users/domain/emailAddress";
import { HashedPassword } from "@components/users/domain/hashedPassword";
import { DisplayName } from "@components/users/domain/displayName";
import { Avatar } from "@components/users/domain/avatar";
import { UniqueEntityId } from "@domain/uniqueEntityId";
import { Result } from "@utils/result";

interface RawUserProps {
  uuid: string;
  username: string;
  emailAddress: string;
  hashedPassword: string;
  displayName: string;
  avatar: string;
  createdAt: Date;
  karma: number;
}

class UserMap {
  public static toDTO(user: User): UserDTO {
    return {
      uuid: user.uuid.props.value,
      username: user.username.value,
      emailAddress: user.emailAddress.value,
      hashedPassword: user.hashedPassword.value,
      displayName: user.displayName.value,
      avatar: user.avatar.value,
      createdAt: user.createdAt,
      karma: user.karma,
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
  public static toDomain(raw: RawUserProps): User {
    const uuid = new UniqueEntityId({ value: raw.uuid });
    const username = Username.create(raw.username);
    const emailAddress = EmailAddress.create(raw.emailAddress);
    const hashedPassword = HashedPassword.create(raw.hashedPassword);
    const displayName = DisplayName.create(raw.displayName);
    const avatar = Avatar.create(raw.avatar);
    const { createdAt, karma } = raw;

    const valueObjectResult = Result.combine([
      username,
      emailAddress,
      hashedPassword,
      displayName,
      avatar,
    ]);

    if (valueObjectResult.isFailure) {
      throw new Error(valueObjectResult.errorValue.toString());
    }

    const createUserResult = User.createUser(
      {
        username: username.getValue(),
        emailAddress: emailAddress.getValue(),
        hashedPassword: hashedPassword.getValue(),
        displayName: displayName.getValue(),
        avatar: avatar.getValue(),
        createdAt,
        karma,
      },
      uuid,
    );

    if (createUserResult.isFailure) {
      throw new Error(createUserResult.error?.toString());
    }

    return createUserResult.getValue();
  }
}

export { UserMap };
