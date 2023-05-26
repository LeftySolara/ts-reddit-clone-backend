import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";

interface UsernameProps {
  value: string;
}

class Username extends ValueObject<UsernameProps> {
  private static readonly minLength = 3;

  private static readonly maxLength = 20;

  get value(): string {
    return this.props.value;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: UsernameProps) {
    super(props);
  }

  public static create(username: string): Username {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      username,
      "username",
    );
    if (!nullOrUndefinedResult.succeeded) {
      throw new Error(nullOrUndefinedResult.message);
    }

    const usernameLengthResult: IGuardResult = Guard.inRange(
      username.length,
      Username.minLength,
      Username.maxLength,
      "username.length",
    );
    if (!usernameLengthResult.succeeded) {
      throw new Error(usernameLengthResult.message);
    }

    return new Username({ value: username });
  }
}

export { Username };
