import bcrypt from "bcrypt";
import { Username } from "@components/users/domain/username";
import { EmailAddress } from "@components/users/domain/emailAddress";
import { CreateUserDTO, UserDTO } from "@components/users/domain/userDTO";
import { IUserRepo } from "@components/users/users.repository";
import { UseCase } from "@domain/useCase";
import { Either, Result, left, right } from "@utils/result";
import { DisplayName } from "@components/users/domain/displayName";
import { HashedPassword } from "@components/users/domain/hashedPassword";
import { Avatar } from "@components/users/domain/avatar";
import { User } from "@components/users/domain/user";
import { UserMap } from "@components/users/users.map";
import { CreateUserErrors } from "@components/users/useCases//createUser/createUserErrors";

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/indent */
type Response = Either<
  | CreateUserErrors.EmailAddressInUse
  | CreateUserErrors.UsernameInUse
  | Result<any>,
  Result<UserDTO>
>;

class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<Response>> {
  private repo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.repo = userRepo;
  }

  async execute(request: CreateUserDTO): Promise<Response> {
    const hash: string = await bcrypt.hash(request.password, 13);

    const usernameOrError = Username.create(request.username);
    const emailAddressOrError = EmailAddress.create(request.emailAddress);
    const displayNameOrError = DisplayName.create(request.username);
    const hashedPasswordOrError = HashedPassword.create(hash);
    const avatarOrError = Avatar.create("https://www.example.com");

    const combinedResult = Result.combine([
      usernameOrError,
      emailAddressOrError,
      displayNameOrError,
      hashedPasswordOrError,
      avatarOrError,
    ]);

    if (combinedResult.isFailure) {
      return left(Result.fail<void>(combinedResult.error)) as Response;
    }

    const userOrError = User.createUser({
      username: usernameOrError.getValue(),
      emailAddress: emailAddressOrError.getValue(),
      displayName: displayNameOrError.getValue(),
      hashedPassword: hashedPasswordOrError.getValue(),
      avatar: avatarOrError.getValue(),
      createdAt: new Date(),
      karma: 0,
    });

    if (userOrError.isFailure) {
      return left(Result.fail<void>(combinedResult.error)) as Response;
    }

    const user: User = userOrError.getValue();

    const emailInUse = await this.repo.exists(user.emailAddress.value);
    if (emailInUse) {
      return left(
        new CreateUserErrors.EmailAddressInUse(user.emailAddress.value),
      ) as Response;
    }

    const usernameInUse = await this.repo.usernameExists(user.username.value);
    if (usernameInUse) {
      return left(
        new CreateUserErrors.UsernameInUse(user.username.value),
      ) as Response;
    }

    try {
      await this.repo.save(user);
    } catch (err: unknown) {
      return left(Result.fail<void>((err as Error).stack));
    }

    return right(Result.ok<UserDTO>(UserMap.toDTO(user))) as Response;
  }
}

export { CreateUserUseCase };
