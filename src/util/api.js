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
  let image = await axios.post(`${Base}/image/getImage`, { filename });
  return image;
};

export const getColor = async (id) => {
  let color = await axios.post(`${Base}/image/getColor`, { id });
  return color;
};

export const voteImg = async (filename, id, vote) => {
  let voted = await axios.post(`${Base}/image/vote`, { filename, id, vote });
  return voted;
};
