import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";

interface EmailAddressProps {
  value: string;
}

class EmailAddress extends ValueObject<EmailAddressProps> {
  private static emailFormat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  get value(): string {
    return this.props.value;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: EmailAddressProps) {
    super(props);
  }

  public static create(emailAddress: string): EmailAddress {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      emailAddress,
      "emailAddress",
    );
    if (!nullOrUndefinedResult.succeeded) {
      throw new Error(nullOrUndefinedResult.message);
    }

    const re = new RegExp(EmailAddress.emailFormat);
    if (re.exec(emailAddress) === null) {
      throw new Error("Invalid email format.");
    }

    return new EmailAddress({ value: emailAddress });
  }
}

export { EmailAddress };
