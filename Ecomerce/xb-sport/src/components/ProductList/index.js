const productsImages = require.context('../../assets/images/products', true);

export default function ProductList({ productGroup }) {
  return (
    <div className="product-group">
      <h1>{productGroup.name}</h1>
      <ul className="product-category">
        {productGroup.childs.map((category, index) => {
          return (
            <li key={index} className="item_category">
              <button href={category.href}>{category.name}</button>
            </li>
          );
        })}
      </ul>
      <ul className="row row-cols-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-2">
        {productGroup.products.map((product, index) => {
          return (
            <li key={index} className="col">
              <div className="product-card">
                <a href={product.href}>
                  <img
                    src={
                      product.thumbnail
                        ? productsImages('./noDefaultImage6_large.webp')
                        : productsImages('./noDefaultImage6_large.webp')
                    }
                    alt=""
                    className="product-card__thumb"
                  />
                  <div className="product-card__title">{product.name}</div>
                  <div className="product-card__attr">
                    {product.attributes.map((attribute, index) => {
                      return (
                        <span key={index} className="attr_item">
                          {`+${attribute.values.length} ${attribute.name}`}
                        </span>
                      );
                    })}
                  </div>
                  <div className="product-card__price">
                    <div className="price">{product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ'}</div>
                    <div className="ori_price">{product.ori_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ'}</div>
                  </div>
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="see-all-container">
        <button className="btn-see-all">Xem tất cả »</button>
      </div>
    </div>
  );
}
