export type TEvent = {
  label: any;
  value: string | number | readonly string[] | undefined;
  idevent: number;
  name: string | null;
  iduser: number;
  users: string | null;
};

export type TUserEvent = {
  label: any;
  value: string | number | readonly string[] | undefined;
  iduser: number;
  fullname: string | null;
  name: string | null;
  event: string | null;
  email: string | null;
  birthdate: string | null;
};

export type TUser = {
  iduser: number;
  fullname: string | null;
  event: string | null;
  idevent: number;
  email: string | null;
  age: number;
  birthdate: string | null;
};
