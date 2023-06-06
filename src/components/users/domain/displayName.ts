import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";
import { Result } from "@utils/result";

interface DisplayNameProps {
  value: string;
}

class DisplayName extends ValueObject<DisplayNameProps> {
  private static readonly minLength = 3;

  private static readonly maxLength = 48;

  get value(): string {
    return this.props.value;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: DisplayNameProps) {
    super(props);
  }

  public static create(displayName: string): Result<DisplayName> {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      displayName,
      "displayName",
    );

    const displayNameLengthResult: IGuardResult = Guard.inRange(
      displayName.length,
      DisplayName.minLength,
      DisplayName.maxLength,
      "displayName.length",
    );

    const result = Guard.combine([
      nullOrUndefinedResult,
      displayNameLengthResult,
    ]);

    if (!result.succeeded) {
      return Result.fail<DisplayName>(result.message);
    }

    return Result.ok<DisplayName>(new DisplayName({ value: displayName }));
  }
}

export { DisplayName };
