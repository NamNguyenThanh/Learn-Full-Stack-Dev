import { useState, useRef, useEffect } from 'react';
import * as CategoryAPI from '../../../apis/category.api';

export default function Categories() {
  const [editing, setEditing] = useState([]);
  const [showCategory, setShowCategory] = useState(null);
  const backupCategories = useRef([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({});
  const newIconRef = useRef(null);
  const newThumbnailRef = useRef(null);
  const [showAddParent, setShowAddParent] = useState(false);
  const iconRefs = useRef([]);
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    const fetchApi = async () => {
      let res = await CategoryAPI.getAllCategories();
      if (res && res.status === 200) {
        setCategories(res.metadata.categories);
        backupCategories.current = JSON.parse(JSON.stringify(res.metadata.categories));
        iconRefs.current = iconRefs.current.slice(0, res.metadata.categories.length);
        thumbnailRefs.current = thumbnailRefs.current.slice(0, res.metadata.categories.length);
        setEditing(Array(res.metadata.categories.length).fill(false));
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="table-categories">
      <ul className="row row-cols-5 header-row">
        <li className="col">Tên Danh Mục</li>
        <li className="col">Danh Mục Cha</li>
        <li className="col">Icon</li>
        <li className="col">Thumbnail</li>
        <li className="col">Hành Động</li>
      </ul>
      <ul className="row row-cols-5 body-row">
        <li className="col">
          <input
            className="input-addcategory"
            type="text"
            value={newCategory.name ? newCategory.name : ''}
            onChange={(e) => {
              setNewCategory({
                ...newCategory,
                name: e.target.value,
              });
            }}
          />
        </li>
        <li
          className={`col d-flex`}
          onClick={() => {
            setShowAddParent(!showAddParent);
          }}
        >
          <div className="onEditParent">
            <div style={{ flex: 1 }}>
              {newCategory.path ? newCategory.path.substring(1, newCategory.path.length - 1).replace(',', ' / ') : '-'}
            </div>
            {showAddParent ? <i class="fa-solid fa-chevron-up"></i> : <i class="fa-solid fa-chevron-down"></i>}
            <div className={`dropdown-categories ${showAddParent ? '' : 'hidden'}`}>
              {[...new Set(backupCategories.current.map((cat) => cat.path))].map((pth, idx) => {
                return (
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setNewCategory({
                        ...newCategory,
                        path: pth,
                      });
                    }}
                  >
                    {pth ? pth.substring(1, pth.length - 1).replace(',', ' / ') : '-'}
                  </div>
                );
              })}
            </div>
          </div>
        </li>
        <li
          className="col"
          onClick={() => {
            newIconRef.current.click();
          }}
        >
          <input
            type="file"
            ref={newIconRef}
            style={{ display: 'none' }}
            onChange={(event) => {
              const newIconFile = event.target.files[0];
              setNewCategory({
                ...newCategory,
                icon: newIconFile,
              });
            }}
          />
          {newCategory.icon ? (
            <img
              src={newCategory.icon instanceof File ? URL.createObjectURL(newCategory.icon) : newCategory.icon}
              className="icon"
              alt="icon"
            />
          ) : (
            <i class="fa-solid fa-cloud-arrow-up"></i>
          )}
        </li>
        <li
          className="col"
          onClick={() => {
            newThumbnailRef.current.click();
          }}
        >
          <input
            type="file"
            ref={newThumbnailRef}
            style={{ display: 'none' }}
            onChange={(event) => {
              const newThumbnailFile = event.target.files[0];
              setNewCategory({
                ...newCategory,
                thumbnail: newThumbnailFile,
              });
            }}
          />
          {newCategory.thumbnail ? (
            <img
              src={
                newCategory.thumbnail instanceof File
                  ? URL.createObjectURL(newCategory.thumbnail)
                  : newCategory.thumbnail
              }
              className="thumbnail"
              alt="thumbnail"
            />
          ) : (
            <i class="fa-solid fa-cloud-arrow-up"></i>
          )}
        </li>
        <li className="col">
          <button className="button button-edit" onClick={() => {}}>
            THÊM MỚI
          </button>
        </li>
      </ul>
      <ul className={`row row-cols-1 body-row ${!categories.length ? '' : 'hidden'}`}>
        Danh mục sản phẩm rỗng. Vui lòng thêm danh mục sản phẩm mới!
      </ul>
      {categories.map((category, index) => {
        let parent = category.path ? category.path.substring(1, category.path.length - 1).replace(',', ' / ') : '-';
        return (
          <ul className="row row-cols-5 body-row" key={index}>
            <li className="col">
              <input
                type="text"
                value={category.name}
                readOnly={!editing[index]}
                onChange={(e) => {
                  setCategories((prevCategories) => {
                    const clone = [...prevCategories];
                    clone[index].name = e.target.value;
                    return clone;
                  });
                }}
                className={`input ${editing[index] ? 'input-edit' : ''}`}
              />
            </li>
            <li
              className="col d-flex"
              onClick={() => {
                if (!editing[index]) return;
                setShowCategory(showCategory === null ? index : null);
              }}
            >
              <div className={`${editing[index] ? 'onEditParent' : ''}`}>
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
              </div>
            </li>
            <li
              className="col"
              onClick={() => {
                if (!editing[index]) return;
                iconRefs.current[index].click();
              }}
            >
              <input
                type="file"
                ref={(el) => (iconRefs.current[index] = el)}
                style={{ display: 'none' }}
                onChange={(event) => {
                  const iconFile = event.target.files[0];
                  setCategories((prevCategories) => {
                    const clone = [...prevCategories];
                    clone[index].icon = iconFile;
                    return clone;
                  });
                }}
              />
              {category.icon ? (
                <img
                  src={category.icon instanceof File ? URL.createObjectURL(category.icon) : category.icon}
                  className="icon"
                  alt="icon"
                />
              ) : (
                <i class={`fa-solid ${editing[index] ? 'fa-cloud-arrow-up' : 'fa-xmark'}`}></i>
              )}
            </li>
            <li
              className="col"
              onClick={() => {
                if (!editing[index]) return;
                thumbnailRefs.current[index].click();
              }}
            >
              <input
                type="file"
                ref={(el) => (thumbnailRefs.current[index] = el)}
                style={{ display: 'none' }}
                onChange={(event) => {
                  const thumbnailFile = event.target.files[0];
                  setCategories((prevCategories) => {
                    const clone = [...prevCategories];
                    clone[index].thumbnail = thumbnailFile;
                    return clone;
                  });
                }}
              />
              {category.thumbnail ? (
                <img
                  src={
                    category.thumbnail instanceof File ? URL.createObjectURL(category.thumbnail) : category.thumbnail
                  }
                  className="thumbnail"
                  alt="thumbnail"
                />
              ) : (
                <i class={`fa-solid ${editing[index] ? 'fa-cloud-arrow-up' : 'fa-xmark'}`}></i>
              )}
            </li>
            <li className="col">
              <button
                className={`button button-cancel ${editing[index] ? '' : 'hidden'}`}
                onClick={() => {
                  setEditing((prevEditing) => {
                    const clone = [...prevEditing];
                    clone[index] = !clone[index];
                    return clone;
                  });
                  setCategories((prevCategories) => {
                    const clone = [...prevCategories];
                    clone[index] = JSON.parse(JSON.stringify(backupCategories.current[index]));
                    return clone;
                  });
                  setShowCategory(null);
                }}
              >
                HỦY
              </button>
              <button
                className="button button-edit"
                onClick={() => {
                  setEditing((prevEditing) => {
                    const clone = [...prevEditing];
                    clone[index] = !clone[index];
                    return clone;
                  });
                  setShowCategory(null);
                }}
              >
                {editing[index] ? 'CẬP NHẬT' : 'CHỈNH SỬA'}
              </button>

              <button
                className="button button-delete"
                onClick={() => {
                  setShowCategory(null);
                }}
              >
                XÓA
              </button>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
