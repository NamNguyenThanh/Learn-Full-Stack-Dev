import request from '../apis';
export const getAllCategories = async () => {
  try {
    const res = await request.get('/category');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addNewCategory = async (data) => {
  try {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    const res = await request.post('/category/create', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  } 
};

export const deleteCategory = async (id) => {
  try {
    const res = await request.delete(`/category/delete/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
