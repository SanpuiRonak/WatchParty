import { REPOSITORY_NAME } from "../constants";


export const getPathWithPrefix = (path: string) => `/${REPOSITORY_NAME}${path}`