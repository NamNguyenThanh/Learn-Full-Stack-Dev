import request from '../apis';
export const getAllAttributes = async () => {
  try {
    const res = await request.get('/attribute');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
