import request from '../apis';
export const getAllCategories = async () => {
  try {
    const res = await request.get('/category');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
