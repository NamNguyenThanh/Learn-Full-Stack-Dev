import { useState } from 'react';

export default function NavbarMobile({ mobileTab, changeMobileTab }) {
  return (
    <div class="navbar-mobile">
      <ul className="navbar">
        <li
          className="navbar__item col-3"
          onClick={() => {
            changeMobileTab(1);
          }}
        >
          {mobileTab === 1 ? (
            <img src={require('../../assets/images/navbar/home-active.webp')} alt="" />
          ) : (
            <img src={require('../../assets/images/navbar/home.webp')} alt="" />
          )}
          <div class={`${mobileTab === 1 ? 'active' : 'normal'}`}>Trang Chủ</div>
        </li>
        <li
          className="navbar__item col-3"
          onClick={() => {
            changeMobileTab(2);
          }}
        >
          {mobileTab === 2 ? (
            <img src={require('../../assets/images/navbar/category-active.webp')} alt="" />
          ) : (
            <img src={require('../../assets/images/navbar/category.webp')} alt="" />
          )}
          <div class={`${mobileTab === 2 ? 'active' : 'normal'}`}>Danh Mục</div>
        </li>
        <li
          className="navbar__item col-3"
          onClick={() => {
            changeMobileTab(3);
          }}
        >
          {mobileTab === 3 ? (
            <img src={require('../../assets/images/navbar/location-active.webp')} alt="" />
          ) : (
            <img src={require('../../assets/images/navbar/location.webp')} alt="" />
          )}
          <div class={`${mobileTab === 3 ? 'active' : 'normal'}`}>Cửa Hàng</div>
        </li>
        <li
          className="navbar__item col-3"
          onClick={() => {
            changeMobileTab(4);
          }}
        >
          {mobileTab === 4 ? (
            <img src={require('../../assets/images/navbar/phone-call-active.webp')} alt="" />
          ) : (
            <img src={require('../../assets/images/navbar/phone-call.webp')} alt="" />
          )}
          <div class={`${mobileTab === 4 ? 'active' : 'normal'}`}>Hotline</div>
        </li>
      </ul>
    </div>
  );
}
