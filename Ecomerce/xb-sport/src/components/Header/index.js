import { useState, useEffect } from 'react';

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header className={show ? 'header-active' : 'header-hidden'}>
      <div className="header-top">
        <div className="container d-flex d-flex-center">
          <div className="header__logo col-lg-3 col-md-3 col-sm-3 col-3">
            <a href="/">
              <img src={require('../../assets/images/header-logo.png')} alt="logo" />
            </a>
          </div>
          <div className="header__search col-lg-4 col-md-6 col-sm-7 col-7">
            <form className="search" action="/search">
              <input className="search__input" type="text" placeholder="Bạn đang tìm gì..." autoComplete="off" />
              <button className="search__btn" type="submit">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            <div className="search-results"></div>
          </div>
          <ul className="header__topnav col-lg-5 col-md-3 col-sm-2 col-2">
            <li className="topnav__item"></li>
            <li className="topnav__item hidden-lg">
              <a className="icon-text-box" href="tel:0964 953 286">
                <i class="fa-solid fa-phone-volume icon-box" />
                <div className="text-box">
                  <p>Hotline</p>
                  <p>0964 953 286</p>
                </div>
              </a>
            </li>
            <li className="topnav__item hidden-lg">
              <a className="icon-text-box" href="tel:0964 953 286">
                <i class="fa-solid fa-map-location-dot icon-box" />
                <div className="text-box">
                  <p>Hệ thống</p>
                  <p>
                    cửa hàng
                    <i class="fa-solid fa-angle-down"></i>
                  </p>
                </div>
              </a>
            </li>
            <li className="topnav__item">
              <a className="icon-text-box" href="/">
                <i class="fa-solid fa-user icon-box"></i>
                <div className="text-box hidden-md">
                  <p>Đăng nhập</p>
                  <p>
                    Đăng ký
                    <i class="fa-solid fa-angle-down"></i>
                  </p>
                </div>
              </a>
            </li>
            <li className="topnav__item cart-box">
              <a className="icon-text-box" href="/">
                <i class="fa-solid fa-cart-shopping icon-box">
                  <span className="cart-number">0</span>
                </i>
                <div className="cart-text-box">
                  <p>Giỏ hàng</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="header-bot">
        <div className="container d-flex d-flex-center">
          <div className="header__category">
            <i class="fa-solid fa-bars"></i>
            DANH MỤC SẢN PHẨM
          </div>
          <div className="header__services">
            <ul className="services ">
              <li className="services__item">
                <a href="/pages/dich-vu-cang-luoi-tai-xb-sports">
                  <i class="fa-solid fa-grip"></i>
                  Dịch vụ căng lưới
                </a>
              </li>
              <li className="services__item">
                <a href="/pages/dich-vu-cang-luoi-tai-xb-sports">
                  <i class="fa-solid fa-truck-fast"></i>
                  Tra cứu đơn hàng
                </a>
              </li>
              <li className="services__item">
                <a href="/pages/dich-vu-cang-luoi-tai-xb-sports">
                  <i class="fa-regular fa-circle-question"></i>
                  Hỏi đáp - FAQs
                </a>
              </li>
              <li className="services__item">
                <a href="/pages/dich-vu-cang-luoi-tai-xb-sports">
                  <i class="fa-solid fa-circle-info"></i>
                  Hướng dẫn mua hàng Online
                </a>
              </li>
              <li className="services__item">
                <a href="/pages/dich-vu-cang-luoi-tai-xb-sports">
                  <i class="fa-regular fa-handshake"></i>
                  Tuyển dụng - Cơ hội việc làm
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
