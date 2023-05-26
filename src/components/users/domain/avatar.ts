import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";

interface AvatarProps {
  value: string;
}

class Avatar extends ValueObject<AvatarProps> {
  private static urlFormat =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  get value(): string {
    return this.props.value;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: AvatarProps) {
    super(props);
  }

  public static create(avatar: string): Avatar {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      avatar,
      "avatar",
    );
    if (!nullOrUndefinedResult.succeeded) {
      throw new Error(nullOrUndefinedResult.message);
    }

    const re = new RegExp(Avatar.urlFormat);
    if (re.exec(avatar) === null) {
      throw new Error("Invalid URL.");
    }

    return new Avatar({ value: avatar });
  }
}

export { Avatar };
