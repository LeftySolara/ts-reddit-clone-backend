import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";

interface HashedPasswordProps {
  value: string;
}

class HashedPassword extends ValueObject<HashedPasswordProps> {
  /* bcrypt hashes are 60 characters long */
  private static hashLength = 60;

  get value(): string {
    return this.props.value;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: HashedPasswordProps) {
    super(props);
  }

  public static create(hashedPassword: string): HashedPassword {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      hashedPassword,
      "hashedPassword",
    );

    if (!nullOrUndefinedResult.succeeded) {
      throw new Error(nullOrUndefinedResult.message);
    }

    const hashedPasswordLengthResult: IGuardResult = Guard.inRange(
      hashedPassword.length,
      HashedPassword.hashLength,
      HashedPassword.hashLength,
      "hashedPassword.length",
    );

    if (!hashedPasswordLengthResult.succeeded) {
      throw new Error(hashedPasswordLengthResult.message);
    }

    return new HashedPassword({ value: hashedPassword });
  }
}

export { HashedPassword };
