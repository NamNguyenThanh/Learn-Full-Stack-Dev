import { useState, useEffect } from 'react';
import * as CategoryAPI from '../../../apis/category.api';
import * as AttributeAPI from '../../../apis/attribute.api';

export default function HomeAdmin() {
  const [active, setActive] = useState('categories');
  const [editing, setEditing] = useState([]);
  const [showCategory, setShowCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      let res;
      // set loading true
      switch (active) {
        case 'products':
          break;
        case 'attributes':
          res = await AttributeAPI.getAllAttributes();
          if (res && res.status === 200) {
            setAttributes(res.metadata.attributes);
          }
          break;
        case 'categories':
          res = await CategoryAPI.getAllCategories();
          if (res && res.status === 200) {
            setCategories(res.metadata.categories);
            setEditing(Array(res.metadata.categories.length).fill(false));
          }
          break;
        default:
          break;
      }
      // set loading false
    };
    fetchApi();
  }, [active]);
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
          <div className="table-categories">
            <ul className="row row-cols-5 header-row">
              <li className="col">Name</li>
              <li className="col">Parent</li>
              <li className="col">Icon</li>
              <li className="col">Thumbnail</li>
              <li className="col">Actions</li>
            </ul>
            {categories.map((category, index) => {
              let parent = category.path
                ? category.path.substring(1, category.path.length - 1).replace(',', ' / ')
                : '-';
              return (
                <ul className="row row-cols-5 body-row" key={index}>
                  <li className="col">{category.name}</li>
                  <li
                    className={`col d-flex ${editing[index] ? 'onEditParent' : ''}`}
                    onClick={() => {
                      if (!editing[index]) return;
                      setShowCategory(showCategory === null ? index : null);
                    }}
                  >
                    <div style={{ flex: 1 }}>{parent}</div>
                    <div className={`${editing[index] ? '' : 'hidden'}`}>
                      {showCategory === index ? (
                        <i class="fa-solid fa-chevron-up"></i>
                      ) : (
                        <i class="fa-solid fa-chevron-down"></i>
                      )}
                    </div>
                    <div className={`dropdown-categories ${showCategory === index ? '' : 'hidden'}`}>
                      {[...new Set(categories.map((cat) => cat.path))].map((pth, idx) => {
                        return (
                          <div
                            className="dropdown-item"
                            onClick={() => {
                              setCategories((prevCategories) => {
                                const clone = [...prevCategories];
                                clone[index].path = pth;
                                return clone;
                              });
                            }}
                          >
                            {pth ? pth.substring(1, pth.length - 1).replace(',', ' / ') : '-'}
                          </div>
                        );
                      })}
                    </div>
                  </li>
                  <li className="col">
                    {category.icon ? (
                      <img src={category.icon} />
                    ) : editing[index] ? (
                      <i class="fa-solid fa-cloud-arrow-up"></i>
                    ) : (
                      <i class="fa-solid fa-xmark"></i>
                    )}
                  </li>
                  <li className="col">
                    {category.thumbnail ? (
                      <img src={category.thumbnail} />
                    ) : editing[index] ? (
                      <i class="fa-solid fa-cloud-arrow-up"></i>
                    ) : (
                      <i class="fa-solid fa-xmark"></i>
                    )}
                  </li>
                  <li className="col">
                    <button
                      className={`button ${editing[index] ? '' : 'hidden'}`}
                      onClick={() => {
                        setEditing((prevEditing) => {
                          const clone = [...prevEditing];
                          clone[index] = !clone[index];
                          return clone;
                        });
                        setShowCategory(null);
                      }}
                    >
                      CANCEL
                    </button>
                    <button
                      className="button"
                      onClick={() => {
                        setEditing((prevEditing) => {
                          const clone = [...prevEditing];
                          clone[index] = !clone[index];
                          return clone;
                        });
                        setShowCategory(null);
                      }}
                    >
                      {editing[index] ? 'UPDATE' : 'EDIT'}
                    </button>

                    <button
                      className="button"
                      onClick={() => {
                        setShowCategory(null);
                      }}
                    >
                      DELETE
                    </button>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
        <div className={`${active === 'inventories' ? 'active' : 'hidden'}`}>This is Inventories Tab</div>
        <div className={`${active === 'customers' ? 'active' : 'hidden'}`}>This is Customers Tab</div>
      </div>
    </div>
  );
}
