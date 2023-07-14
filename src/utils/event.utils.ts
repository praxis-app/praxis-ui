import { NavigationPaths } from "../constants/common.constants";

export const getEventPath = (id: number) => `${NavigationPaths.Events}/${id}`;
