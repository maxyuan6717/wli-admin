import axios from "axios";
import { Base } from "./base";

export const casCheck = async () => {
  let auth = await axios.get(`${Base}/auth/check`);

  if (auth) {
    return auth;
  }
};

export const getImages = async (status) => {
  let images = await axios.post(`${Base}/image/get`, { status: status });
  return images;
};

export const voteImg = async (id, vote) => {
  let voted = await axios.post(`${Base}/image/vote`, { id, vote });
  return voted;
};
