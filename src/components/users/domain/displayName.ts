import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";

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

  public static create(displayName: string): DisplayName {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      displayName,
      "displayName",
    );
    if (!nullOrUndefinedResult.succeeded) {
      throw new Error(nullOrUndefinedResult.message);
    }

    const displayNameLengthResult: IGuardResult = Guard.inRange(
      displayName.length,
      DisplayName.minLength,
      DisplayName.maxLength,
      "displayName.length",
    );
    if (!displayNameLengthResult.succeeded) {
      throw new Error(displayNameLengthResult.message);
    }

    return new DisplayName({ value: displayName });
  }
}

export { DisplayName };
