import { data } from "autoprefixer";

export const jsonRes = (data) => {
  return JSON.stringify(data);
};

export const stringRes = (data) => {
  return JSON.parse(data);
};
