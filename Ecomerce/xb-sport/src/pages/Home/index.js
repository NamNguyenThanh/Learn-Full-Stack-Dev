import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Slider from '../../components/Slider';
import ProductList from '../../components/ProductList';
const categoryImages = require.context('../../assets/images/categories', true);
const levelImages = require.context('../../assets/images/level-banner', true);
const cateBannerImages = require.context('../../assets/images/category-banner', true);

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

const slides = [
  {
    src: 'banner_web_tuyen_dung__1024x1024.webp',
    alt: 'Tuyển Dụng',
  },
  {
    src: 'chi_nhanh_banner___web___1024x1024.webp',
    alt: 'Chi Nhánh',
  },
];

const product_groups = [
  {
    name: 'VỢT CẦU LÔNG',
    href: './',
    childs: [
      {
        name: 'Vợt Cầu Lông Yonex',
        href: './',
      },
      {
        name: 'Vợt Cầu Lông Lining',
        href: './',
      },
      {
        name: 'Vợt Cầu Lông VS',
        href: './',
      },
      {
        name: 'Vợt Cầu Lông Kumpoo',
        href: './',
      },
      {
        name: 'Vợt Cầu Lông Vicleo',
        href: './',
      },
      {
        name: 'Vợt Cầu Lông Mizuno',
        href: './',
      },
      {
        name: 'Vợt Cầu Lông Apacs',
        href: './',
      },
      {
        name: 'Vợt Cầu Lông Prokenex',
        href: './',
      },
    ],
    products: [
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung) aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        href: './',
        thumbnail: null,
        ori_price: '1500000000',
        price: '1040000000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
          {
            name: 'Kích thước',
            values: ['40', '41', '40', '41', '40', '41'],
          },
          {
            name: 'Loại đế',
            values: ['A', 'B', 'C'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500',
        price: '1040',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
    ],
  },
  {
    name: 'GIÀY CẦU LÔNG',
    href: './',
    childs: [
      {
        name: 'Giày Cầu Lông Yonex',
        href: './',
      },
      {
        name: 'Giày Cầu Lông Lining',
        href: './',
      },
      {
        name: 'Giày Cầu Lông Victor',
        href: './',
      },
      {
        name: 'Giày Cầu Lông Kawasaki',
        href: './',
      },
      {
        name: 'Giày Cầu Lông Lefus',
        href: './',
      },
      {
        name: 'Giày Cầu Lông Mizuno',
        href: './',
      },
    ],
    products: [
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
      {
        name: 'Vợt Cầu Lông Lining Axforce Cannon (Nội Địa Trung)',
        href: './',
        thumbnail: null,
        ori_price: '1500000',
        price: '1040000',
        discount: '30%',
        attributes: [
          {
            name: 'Màu sắc',
            values: ['Trắng', 'Đen'],
          },
        ],
      },
    ],
  },
];
export default function Home() {
  const [subCategories, setSubCategories] = useState({ show: false, data: [] });
  return (
    <MainLayout>
      <main className="main container">
        <section className="slider-section d-flex">
          <div className="category col-3">
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
          <div className="slider-subcategory col-9 col-lg-12">
            <Slider data={slides} />
            <div
              className={`sub-category-container ${subCategories.show ? 'show' : 'hidden'}`}
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
        </section>
        <section className="level-section d-flex">
          <div className="item-banner col-4 col-lg-8">
            <a href="/">
              <img src={levelImages(`./beginner__1.webp`)} alt="" />
            </a>
          </div>
          <div className="item-banner col-4 col-lg-8">
            <a href="/">
              <img src={levelImages(`./intermediate__1.webp`)} alt="" />
            </a>
          </div>
          <div className="item-banner col-4 col-lg-8">
            <a href="/">
              <img src={levelImages(`./advance__1.webp`)} alt="" />
            </a>
          </div>
        </section>
        <section className="categories-section d-flex">
          <div className="item-banner col-3 col-lg-6">
            <a href="/">
              <img src={cateBannerImages(`./nguoi_moi_choi__1_large.webp`)} alt="" />
            </a>
          </div>
          <div className="item-banner col-3 col-lg-6">
            <a href="/">
              <img src={cateBannerImages(`./chuyen_cong_2_large.webp`)} alt="" />
            </a>
          </div>
          <div className="item-banner col-3 col-lg-6">
            <a href="/">
              <img src={cateBannerImages(`./cong_thu_toan_dien___1_large.webp`)} alt="" />
            </a>
          </div>
          <div className="item-banner col-3 col-lg-6">
            <a href="/">
              <img src={cateBannerImages(`./chuyen_thu_2_large.webp`)} alt="" />
            </a>
          </div>
        </section>
        <section>
          {product_groups.map((productGroup, index) => (
            <ProductList productGroup={productGroup} key={index} />
          ))}
        </section>
      </main>
    </MainLayout>
  );
}
