import { useState } from 'react';
import Categories from '../../../components/Admin/Categories';

export default function HomeAdmin() {
  const [active, setActive] = useState('categories');

  return (
    <div className="admin-container">
      <div className="nav-container col-2">
        <div className="header"></div>
        <div className="general-group">
          GENERAL
          <div className="general-block">
            <div className="nav-item">
              <i class="fa-solid fa-bag-shopping"></i>
              Product
              <div className="drop-down">
                <i class="fa-solid fa-chevron-down"></i>
              </div>
            </div>
            <div className="nav-subitem-container">
              <div
                className={`nav-subitem ${active === 'products' ? 'active' : ''}`}
                onClick={() => {
                  setActive('products');
                }}
              >
                Products
              </div>
              <div
                className={`nav-subitem ${active === 'attributes' ? 'active' : ''}`}
                onClick={() => {
                  setActive('attributes');
                }}
              >
                Attributes
              </div>
              <div
                className={`nav-subitem ${active === 'categories' ? 'active' : ''}`}
                onClick={() => {
                  setActive('categories');
                }}
              >
                Categories
              </div>
            </div>
          </div>
          <div className="general-block">
            <div className="nav-item">
              <i class="fa-solid fa-warehouse"></i>
              Inventory
              <div className="drop-down">
                <i class="fa-solid fa-chevron-down"></i>
              </div>
            </div>
            <div className="nav-subitem-container">
              <div
                className={`nav-subitem ${active === 'inventories' ? 'active' : ''}`}
                onClick={() => {
                  setActive('inventories');
                }}
              >
                Inventories
              </div>
            </div>
          </div>
          <div className="general-block">
            <div className="nav-item">
              <i class="fa-solid fa-users"></i>
              Customer
              <div className="drop-down">
                <i class="fa-solid fa-chevron-down"></i>
              </div>
            </div>
            <div className="nav-subitem-container">
              <div
                className={`nav-subitem ${active === 'customers' ? 'active' : ''}`}
                onClick={() => {
                  setActive('customers');
                }}
              >
                Customers
              </div>
            </div>
          </div>
        </div>
        <div className="account-group">
          ACCOUNT
          <div className="nav-item">
            <i class="fa-solid fa-gear"></i>Settings
          </div>
          <div className="nav-item">
            <i class="fa-solid fa-circle-info"></i>Help
          </div>
        </div>
        <div className="logout">
          <i class="fa-solid fa-right-from-bracket"></i>Logout
        </div>
      </div>
      <div className="main-container col-10">
        <div className={`${active === 'products' ? 'active' : 'hidden'}`}>This is Products Tab</div>
        <div className={`${active === 'attributes' ? 'active' : 'hidden'}`}>This is Attributes Tab</div>
        <div className={`${active === 'categories' ? 'active' : 'hidden'}`}>
          <Categories />
        </div>
        <div className={`${active === 'inventories' ? 'active' : 'hidden'}`}>This is Inventories Tab</div>
        <div className={`${active === 'customers' ? 'active' : 'hidden'}`}>This is Customers Tab</div>
      </div>
    </div>
  );
}
