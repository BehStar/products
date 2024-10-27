// PriceRangeSlider.jsx
import React, { useState, useEffect } from "react";
import styles from "./Test.module.css";

const Test = ({ min, max, onChange }) => {
  const [values, setValues] = useState([min, max]);

  useEffect(() => {
    onChange(values);
  }, [values]);

  const handleInputChange = (event) => {
    const newValues = event.target.value
      .replace(/[^0-9,-]/g, "")
      .split(",")
      .map(Number);

    if (newValues.length === 2 && newValues[0] >= min && newValues[1] <= max) {
      setValues(newValues);
    }
  };

  const handleRangeChange = (event, newValue) => {
    setValues(newValue);
  };

  return (
    <div className={styles.priceRangeSlider}>
      <p className={styles.rangeValue}>
        <input
          type="text"
          value={`${values[0]},${values[1]}`}
          onChange={handleInputChange}
          readOnly
        />
      </p>
      <div className={styles.rangeBar}>
        <input
          type="range"
          min={min}
          max={max}
          value={values[0]}
          onChange={(e) => handleRangeChange(e, [parseInt(e.target.value), values[1]])}
          className={styles.rangeInput}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={values[1]}
          onChange={(e) => handleRangeChange(e, [values[0], parseInt(e.target.value)])}
          className={styles.rangeInput}
        />
      </div>
    </div>
  );
};

export default Test;