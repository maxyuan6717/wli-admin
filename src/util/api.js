import axios from "axios";
import { Base } from "./base";

export const casCheck = async () => {
  let auth = await axios.get(`${Base}/auth/check`);

  if (auth) {
    return auth;
  }
};

export const getAll = async (status) => {
  let filenames = await axios.post(`${Base}/image/all`, { status });
  return filenames;
};

export const getImage = async (filename) => {
  let image = await axios.post(`${Base}/image/get`, { filename });
  return image;
};

export const voteImg = async (filename, vote) => {
  let voted = await axios.post(`${Base}/image/vote`, { filename, vote });
  return voted;
};
