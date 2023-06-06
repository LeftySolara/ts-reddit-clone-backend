interface CreateUserDTO {
  username: string;
  emailAddress: string;
  password: string;
}

interface UserDTO {
  uuid: string;
  username: string;
  emailAddress: string;
  hashedPassword: string;
  displayName: string;
  avatar: string;
  createdAt: Date;
  karma: number;
}

export { CreateUserDTO, UserDTO };
