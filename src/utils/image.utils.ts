import { API_ROOT } from "../constants/common.constants";

export const getImagePath = (imageId: number) =>
  `${API_ROOT}/images/${imageId}/view`;
