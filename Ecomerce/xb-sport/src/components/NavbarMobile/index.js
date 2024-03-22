export default function NavbarMobile() {
  return (
    <div class="navbar-mobile">
      <ul className="navbar">
        <li className="navbar__item col-3">
          <a href="/">
            <div>
              <img src={require('../../assets/images/navbar/home-active.webp')} alt="" />
              {/* <img src={require('../../assets/images/navbar/home.webp')} alt="" /> */}
            </div>
            <span>Trang Chủ</span>
          </a>
        </li>
        <li className="navbar__item col-3">
          <a href="/">
            <div>
              <img src={require('../../assets/images/navbar/category.webp')} alt="" />
              {/* <img src={require('../../assets/images/navbar/category-active.webp')} alt="" /> */}
            </div>
            <span>Danh Mục</span>
          </a>
        </li>
        <li className="navbar__item col-3">
          <a href="/">
            <div>
              <img src={require('../../assets/images/navbar/location.webp')} alt="" />
              {/* <img src={require('../../assets/images/navbar/location-active.webp')} alt="" /> */}
            </div>
            <span>Cửa Hàng</span>
          </a>
        </li>
        <li className="navbar__item col-3">
          <a href="/">
            <div>
              <img src={require('../../assets/images/navbar/phone-call.webp')} alt="" />
              {/* <img src={require('../../assets/images/navbar/phone-call-active.webp')} alt="" /> */}
            </div>
            <span>Hotline</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
