import React, { useEffect, useState } from 'react';

import * as CategoryAPI from '../../apis/category.api';
import MainLayout from '../../layouts/MainLayout';
import Slider from '../../components/Slider';
import ProductList from '../../components/ProductList';
const levelImages = require.context('../../assets/images/level-banner', true);
const cateBannerImages = require.context('../../assets/images/category-banner', true);

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
  const [categories, setCategories] = useState([]);
  const [activeSubCat, setActiveSubCat] = useState({ show: false, parent: null });
  const [mobileTab, setMobileTab] = useState(1);
  useEffect(() => {
    const fetchApi = async () => {
      // set loading true
      const res = await CategoryAPI.getAllCategories();
      if (res && res.status === 200) {
        setCategories(res.metadata.categories);
      }
      // set loading false
    };
    fetchApi();
  }, []);
  function changeMobileTab(activeTab) {
    setMobileTab(activeTab);
  }
  return (
    <MainLayout mobileTab={mobileTab} changeMobileTab={changeMobileTab} categories={categories}>
      <main className="main container">
        <section className="slider-section d-flex">
          <div className="category col-3">
            {categories
              .filter((category) => category.path === null)
              .map((category, index) => {
                return (
                  <div
                    key={index}
                    className="category-item"
                    onMouseEnter={() => {
                      setActiveSubCat({ show: true, parent: `,${category.name},` });
                    }}
                    onMouseLeave={() => {
                      setActiveSubCat({ show: false, parent: null });
                    }}
                  >
                    <img src={category.icon} className="icon" alt={category.name} />
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
              className={`sub-category-container ${activeSubCat.show ? 'show' : 'hidden'}`}
              onMouseEnter={() => {
                setActiveSubCat({ ...activeSubCat, show: true });
              }}
              onMouseLeave={() => {
                setActiveSubCat({ show: false, parent: null });
              }}
            >
              <div className="sub-category-body">
                {}
                {categories
                  .filter((category) => category.path === activeSubCat.parent)
                  .map((subCategory, index) => {
                    return (
                      <div key={index} className="sub-category-item col-4">
                        <span className="sub-title">{subCategory.name}</span>
                        <ul>
                          {categories
                            .filter((category) => category.path === `${subCategory.path}${subCategory.name},`)
                            .map((child, index) => {
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
