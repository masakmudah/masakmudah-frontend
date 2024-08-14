export type Password = {
  id: string;
  hash: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  username: string;
  fullname: string;
  createdAt: string;
  email: string;
  password: Password;
  updatedAt: string;
};
