import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Slider from '../../components/Slider';
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

export default function Home() {
  const [subCategories, setSubCategories] = useState({ show: false, data: [] });
  return (
    <MainLayout>
      <main className="main container">
        <section className="slider-section d-flex">
          <div className="category col-lg-3">
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
          <div className="slider-subcategory col-lg-9 col-12">
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
                    <div key={index} className="sub-category-item col-lg-4">
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
            <Slider data={slides} />
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
