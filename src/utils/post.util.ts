import { PostTypeId } from '@constants/postTypes';

const getTypeName = (typeId: PostTypeId) => {
  const indexOfS = Object.values(PostTypeId).indexOf(typeId);
  return Object.keys(PostTypeId)[indexOfS].toLowerCase();
};

const getTypeId = (typeName: string) => {
  const indexOfS = Object.keys(PostTypeId).indexOf(typeName);
  return Number(Object.values(PostTypeId)[indexOfS]);
};

export const PostUtil = {
  getTypeName: getTypeName,
  getTypeId: getTypeId,
};
