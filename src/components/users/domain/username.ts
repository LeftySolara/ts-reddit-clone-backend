import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";
import { Result } from "@utils/result";

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

  public static create(username: string): Result<Username> {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      username,
      "username",
    );

    const usernameLengthResult: IGuardResult = Guard.inRange(
      username.length,
      Username.minLength,
      Username.maxLength,
      "username.length",
    );

    const result = Guard.combine([nullOrUndefinedResult, usernameLengthResult]);
    if (!result.succeeded) {
      return Result.fail<Username>(result.message);
    }

    return Result.ok<Username>(new Username({ value: username }));
  }
}

export { Username };
