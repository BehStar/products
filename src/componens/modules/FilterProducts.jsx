import styles from "./FilterProducts.module.css";

const FilterProducts = ({
  name,
  limit,
  minPrice,
  maxPrice,
  setQuery,
  minMaxData: { max },
}) => {
  // Handle Search by names
  const searchHandler = (e) => {
    const newSearch = e.target.value.trimStart();
    setQuery((prevQuery) => ({ ...prevQuery, name: newSearch }));
  };

  // Handle Max Price
  const handleMaxPriceChange = (e) => {
    const newMaxPrice = parseInt(e.target.value, 10);
    setQuery((prev) => ({ ...prev, maxPrice: newMaxPrice }));
  };

  // Handle min Price
  const handleMinPriceChange = (e) => {
    const newMinPrice = parseInt(e.target.value, 10);
    setQuery((prev) => ({ ...prev, minPrice: newMinPrice }));
  };

  return (
    <div>
      <div className={styles.wrapper}>
        {/* Min Price */}
        <div>
          <label>
            حداقل قیمت:
            <input
              type="range"
              min="1"
              max={max}
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <span>{isNaN(minPrice) ? 0 : minPrice}هزار تومان</span>
          </label>
        </div>
        {/* Search */}
        <input
          type="text"
          placeholder="جستجو کالا"
          value={name}
          onChange={searchHandler}
          autoFocus
        />
        {/* Max Price */}
        <div>
          <label>
            حداکثر قیمت:
            <input
              type="range"
              min={minPrice + 1}
              max={max}
              value={maxPrice || max}
              onChange={handleMaxPriceChange}
            />
            <span>{isNaN(maxPrice) ? 0 : maxPrice} هزار تومان</span>
          </label>
        </div>
        {/* Limit */}
        <div>
          <label>
            تعداد محصول / صفحه:
            <input
              type="number"
              value={limit}
              onChange={(e) => {
                const newLimit = Math.max(1, parseInt(e.target.value, 10) || 1);
                setQuery((prev) => ({ ...prev, limit: newLimit }));
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
