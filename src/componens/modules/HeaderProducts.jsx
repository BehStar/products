import { useState } from "react";

// import { useIfLoggedIn } from "../../providers/IfLoggedIn";
import { useAuth } from "../../providers-contexts/AuthContext";

import FilterProducts from "./FilterProducts";

import SearchIcon from "./SearchIcon";
import styles from "./HeaderProducts.module.css";

const HeaderProducts = ({ query, setQuery, minMaxData }) => {
  const { getIsLoggedAccount } = useAuth();
  const [isShowFilterProducts, setIsShowFilterProducts] = useState(false);

  return (
    <>
      <div className={styles.wrapperSearch}>
        <div
          className={styles.searchBox}
          onClick={() => setIsShowFilterProducts(!isShowFilterProducts)}
        >
          <div className={styles.iconSearch}>
            <SearchIcon />
          </div>
          <p>جستجو کالا</p>
          <div className={styles.forHover}>برای فیلتر کردن کلیک کنید</div>
        </div>
        <div className={styles.headerAdmin}>
          <div className={styles.textBox}>
            {getIsLoggedAccount().isLoggedIn ? (
              <>
                <p>{getIsLoggedAccount().username}</p>
                <p>مدیر</p>
              </>
            ) : (
              <p>کاربر</p>
            )}
          </div>
          <div className={styles.img}></div>
        </div>
      </div>
      {isShowFilterProducts && (
        <FilterProducts
          name={query.name}
          limit={query.limit}
          minPrice={query.minPrice}
          maxPrice={query.maxPrice}
          setQuery={setQuery}
          minMaxData={minMaxData}
        />
      )}
    </>
  );
};

export default HeaderProducts;
