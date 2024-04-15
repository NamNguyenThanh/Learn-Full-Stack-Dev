'use strict';
const { Schema, model } = require('mongoose');
const DOCUMENT_NAME = 'Attribute';
const COLLECTION_NAME = 'Attributes';

const attributeSchema = new Schema(
  {
    name: String, // Tên phân biệt trong db (racket-size != shoes-size)
    title: String, // Tên hiển thị (kích thước - hiện thị chung cho racket và shoes)
    values: [
      {
        name: String,
        icon: String,
      },
    ],
    show: Boolean, // Có thể nhìn thấy trên trang chi tiết sản phẩm hay không?
    variation: Boolean, // Có thể tạo biến thể từ thuộc tính này hay không
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  },
);

module.exports = model(DOCUMENT_NAME, attributeSchema);
