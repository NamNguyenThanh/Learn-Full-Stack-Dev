import { useState, useEffect } from 'react';
const categoryImages = require.context('../../assets/images/categories', true);

const categories = [
  {
    name: 'Vợt Cầu Lông',
    src: 'vot_icon.webp',
    childs: [
      {
        name: 'Vợt Cầu Lông Yonex',
        childs: [
          {
            name: 'Astrox',
            childs: [],
          },
          {
            name: 'Arcsaber',
            childs: [],
          },
          {
            name: 'Nanoflare',
            childs: [],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining',
        childs: [
          {
            name: 'Lining Lightning',
            childs: [],
          },
          {
            name: 'High Carbon',
            childs: [],
          },
          {
            name: 'Windstorm',
            childs: [],
          },
          {
            name: 'TurboCharging',
            childs: [],
          },
          {
            name: '3D Calibar',
            childs: [],
          },
          {
            name: 'Aeronaut',
            childs: [],
          },
          {
            name: 'Tectonic',
            childs: [],
          },
          {
            name: 'Bladex',
            childs: [],
          },
          {
            name: 'Axforce',
            childs: [],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông VS',
        childs: [
          {
            name: 'Nano Power',
            childs: [],
          },
          {
            name: 'Blade',
            childs: [],
          },
          {
            name: 'Turbo',
            childs: [],
          },
          {
            name: 'Challenger',
            childs: [],
          },
          {
            name: 'Titan',
            childs: [],
          },
          {
            name: 'Thunder',
            childs: [],
          },
          {
            name: 'Hunter',
            childs: [],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Kumpoo',
        childs: [
          {
            name: 'Blade',
            childs: [],
          },
          {
            name: 'Power',
            childs: [],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Vicleo',
        childs: [
          {
            name: 'Energy',
            childs: [],
          },
          {
            name: 'Power',
            childs: [],
          },
          {
            name: 'Turbo',
            childs: [],
          },
          {
            name: 'Nanoray',
            childs: [],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Mizuno',
        childs: [
          {
            name: 'Carbo Pro',
            childs: [],
          },
          {
            name: 'Luminasonic',
            childs: [],
          },
          {
            name: 'Swifter',
            childs: [],
          },
          {
            name: 'Fioria',
            childs: [],
          },
          {
            name: 'Carbosonic',
            childs: [],
          },
          {
            name: 'Promax',
            childs: [],
          },
          {
            name: 'Accel Arc',
            childs: [],
          },
          {
            name: 'Duralite',
            childs: [],
          },
          {
            name: 'Altrax',
            childs: [],
          },
          {
            name: 'Caliber',
            childs: [],
          },
          {
            name: 'Speedflex',
            childs: [],
          },
          {
            name: 'Prototype',
            childs: [],
          },
          {
            name: 'XYST',
            childs: [],
          },
          {
            name: 'JPX',
            childs: [],
          },
          {
            name: 'Altius',
            childs: [],
          },
          {
            name: 'Fortius',
            childs: [],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Apacs',
        childs: [
          {
            name: 'Nano',
            childs: [],
          },
          {
            name: 'One Malaysia',
            childs: [],
          },
          {
            name: 'Power',
            childs: [],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Felet',
        childs: [
          {
            name: 'Woven TJ Power',
            childs: [],
          },
          {
            name: 'Woven TJ 1000',
            childs: [],
          },
          {
            name: 'Light Tech',
            childs: [],
          },
          {
            name: 'Sport Force',
            childs: [],
          },
          {
            name: 'Hi-Tex',
            childs: [],
          },
          {
            name: 'Fortune 300',
            childs: [],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông ProKenex',
        childs: [
          {
            name: '',
            childs: [],
          },
        ],
      },
    ],
  },
  {
    name: 'Giày Cầu Lông',
    src: 'giay_icon.webp',
    childs: [
      {
        name: 'Giày Cầu Lông Yonex',
        childs: [],
      },
      {
        name: 'Giày Cầu Lông Lining',
        childs: [],
      },
      {
        name: 'Giày Cầu Lông Victor',
        childs: [],
      },
      {
        name: 'Giày Cầu Lông Mizuno',
        childs: [],
      },
      {
        name: 'Giày Cầu Lông Kawasaki',
        childs: [],
      },
      {
        name: 'Giày Cầu Lông Lefus',
        childs: [],
      },
      {
        name: 'Giày Cầu Lông Kumpoo',
        childs: [],
      },
    ],
  },
  {
    name: 'Phụ Kiện Cầu Lông',
    src: 'phu_kien_icon.webp',
    childs: [
      {
        name: 'Tất/Vớ',
        childs: [],
      },
      {
        name: 'Cước Căng Vợt',
        childs: [],
      },
      {
        name: 'Khăn',
        childs: [],
      },
      {
        name: 'Băng Chặn Mồ Hôi',
        childs: [],
      },
      {
        name: 'Quấn Cán Cầu Lông',
        childs: [],
      },
      {
        name: 'Ống Cầu Lông',
        childs: [],
      },
      {
        name: 'Móc Khóa Cầu Lông',
        childs: [],
      },
      {
        name: 'Bột Chống Trơn',
        childs: [],
      },
      {
        name: 'Phòng Tránh Chấn Thương',
        childs: [],
      },
    ],
  },
  {
    name: 'Túi Vợt Cầu Lông',
    src: 'tui_icon.webp',
    childs: [
      {
        name: 'Túi Vợt Cầu Lông Yonex',
        childs: [],
      },
      {
        name: 'Túi Vợt Cầu Lông Lining',
        childs: [],
      },
      {
        name: 'Túi Vợt Cầu Lông Victor',
        childs: [],
      },
      {
        name: 'Túi Vợt Cầu Lông Mizuno',
        childs: [],
      },
      {
        name: 'Túi Vợt Cầu Lông Kawasaki',
        childs: [],
      },
      {
        name: 'Túi Vợt Cầu Lông Kumpoo',
        childs: [],
      },
    ],
  },
  {
    name: 'Balo Cầu Lông',
    src: 'balo_icon.webp',
    childs: [
      {
        name: 'Balo Cầu Lông Yonex',
        childs: [],
      },
      {
        name: 'Balo Cầu Lông Lining',
        childs: [],
      },
      {
        name: 'Balo Cầu Lông Victor',
        childs: [],
      },
      {
        name: 'Balo Cầu Lông Mizuno',
        childs: [],
      },
      {
        name: 'Balo Cầu Lông Kawasaki',
        childs: [],
      },
      {
        name: 'Balo Cầu Lông Kumpoo',
        childs: [],
      },
    ],
  },
  {
    name: 'Áo Cầu Lông',
    src: 'ao_icon.webp',
    childs: [
      {
        name: 'Áo Cầu Lông Yonex',
        childs: [],
      },
      {
        name: 'Áo Cầu Lông Lining',
        childs: [],
      },
      {
        name: 'Áo Cầu Lông Victor',
        childs: [],
      },
      {
        name: 'Áo Cầu Lông Mizuno',
        childs: [],
      },
      {
        name: 'Áo Cầu Lông Kawasaki',
        childs: [],
      },
      {
        name: 'Áo Cầu Lông Kumpoo',
        childs: [],
      },
    ],
  },
];

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const [subCategories, setSubCategories] = useState({ show: false, data: [] });

  const controlNavbar = () => {
    console.log(show, window.scrollY, lastScrollY);
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
    setShowCategories(false);
    setSubCategories({ show: false, data: [] });
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
          <div className="header__logo col-3">
            <a href="/">
              <img src={require('../../assets/images/header-logo.png')} alt="logo" />
            </a>
          </div>
          <div className="header__search col-4 col-xl-5 col-lg-6 col-md-7">
            <form className="search" action="/search">
              <input className="search__input" type="text" placeholder="Bạn đang tìm gì..." autoComplete="off" />
              <button className="search__btn" type="submit">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            <div className="search-results"></div>
          </div>
          <ul className="header__topnav col-5 col-xl-4 col-lg-3 col-md-2">
            <li className="topnav__item"></li>
            <li className="topnav__item hidden-xl">
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
          <div className="header__category" onMouseEnter={() => setShowCategories(true)}>
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
      <div
        className={`header-category container ${showCategories ? 'show-category' : 'hide-category'}`}
        onMouseLeave={() => setShowCategories(false)}
      >
        <div className={`category col-3 `}>
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                className="category-item"
                onMouseEnter={() => {
                  setSubCategories({ show: true, data: category.childs });
                }}
                onMouseLeave={() => {
                  setSubCategories({ show: false, data: [] });
                }}
              >
                <img src={categoryImages(`./${category.src}`)} alt={category.name} className="icon" />
                <a href="/" className="title">
                  {category.name}
                </a>
                <i class="fa-solid fa-angle-right"></i>
              </div>
            );
          })}
        </div>
        <div className={`col-9 ${subCategories.show ? 'show-subcategory' : 'hide-subcategory'}`}>
          <div
            className={`sub-category-container`}
            onMouseEnter={() => {
              setSubCategories({ ...subCategories, show: true });
            }}
            onMouseLeave={() => {
              setSubCategories({ show: false, data: [] });
            }}
          >
            <div className="sub-category-body">
              {subCategories.data.map((subCategory, index) => {
                return (
                  <div key={index} className="sub-category-item col-4">
                    <span className="sub-title">{subCategory.name}</span>
                    <ul>
                      {subCategory.childs.map((child, index) => {
                        return (
                          <li key={index} className="subsub-title">
                            {child.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
