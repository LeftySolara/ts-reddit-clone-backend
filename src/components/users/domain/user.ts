import { Entity } from "@domain/entity";
import { UniqueEntityId } from "@domain/uniqueEntityId";

interface IUserProps {
  username: string; // Value Object
  emailAddress: string; // Value Object
  displayName: string; // Value Object
  avatar: string; // Value Object
  karma: number;
  createdAt: Date;
}

class User extends Entity<IUserProps> {
  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: IUserProps, id?: UniqueEntityId) {
    super(props, id);
  }
}

export { User };
