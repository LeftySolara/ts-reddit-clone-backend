import { Entity } from "@domain/entity";
import { UniqueEntityId } from "@domain/uniqueEntityId";
import { Guard, IGuardResult } from "@utils/guard";
import { Result } from "@utils/result";
import { Username } from "@components/users/domain/username";
import { EmailAddress } from "@components/users/domain/emailAddress";
import { DisplayName } from "@components/users/domain/displayName";
import { Avatar } from "@components/users/domain/avatar";
import { HashedPassword } from "@components/users/domain/hashedPassword";

interface IUserProps {
  username: Username;
  emailAddress: EmailAddress;
  displayName: DisplayName;
  hashedPassword: HashedPassword;
  avatar: Avatar;
  createdAt: Date;
  karma: number;
}

class User extends Entity<IUserProps> {
  get uuid(): UniqueEntityId {
    return this.uuid;
  }

  get username(): Username {
    return this.props.username;
  }

  get emailAddress(): EmailAddress {
    return this.props.emailAddress;
  }

  get displayName(): DisplayName {
    return this.props.displayName;
  }

  get hashedPassword(): HashedPassword {
    return this.props.hashedPassword;
  }

  get avatar(): Avatar {
    return this.props.avatar;
  }

  get createdAt(): Date {
    return this.createdAt;
  }

  get karma(): number {
    return this.karma;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: IUserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static createUser(
    props: IUserProps,
    id?: UniqueEntityId,
  ): Result<User> {
    const userPropsResult: IGuardResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: "username", argument: props.username },
      { argumentName: "emailAddress", argument: props.emailAddress },
      { argumentName: "displayName", argument: props.displayName },
      { argumentName: "hashedPassword", argument: props.hashedPassword },
      { argumentName: "avatar", argument: props.avatar },
      { argumentName: "createdAt", argument: props.createdAt },
    ]);

    if (userPropsResult.succeeded) {
      return Result.ok<User>(new User(props, id));
    }
    return Result.fail<User>(userPropsResult.message as string);
  }
}

type UserCollection = User[];

export { User, UserCollection };
