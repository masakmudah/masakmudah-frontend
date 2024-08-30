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
  email: string;
  imageURL?: string;
  password: Password;
  createdAt: string;
  updatedAt: string;
};
