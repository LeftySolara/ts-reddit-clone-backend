/* eslint-disable max-classes-per-file */
import { UseCaseError } from "@domain/useCaseError";
import { Result } from "@utils/result";

export namespace CreateUserErrors {
  export class EmailAddressInUse extends Result<UseCaseError> {
    constructor(emailAddress: string) {
      super(false, {
        message: `The email address ${emailAddress} is already in use.`,
      } as UseCaseError);
    }
  }

  export class UsernameInUse extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `The username ${username} is already in use.`,
      } as UseCaseError);
    }
  }
}
