import { useState, useEffect, Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useShowRemove } from "../../providers-contexts/ShowRemoveContext";
import { useModal } from "../../providers-contexts/ModalContext";
import { useAlert } from "../../providers-contexts/AlertContext";
import { useRemoveProducts } from "../../configs/mutations";

import DeleteModalIcon from "./DeleteModalIcon";
import RowTable from "./RowTable";
import styles from "./TableProducts.module.css";

const TableProducts = ({ products, errorMessageProducts }) => {
  const queryClient = useQueryClient();
  const [ids, setIds] = useState([]);
  const { isShowRemove, setIsShowRemove } = useShowRemove();
  const { toggleModal } = useModal();
  const { toggleAlert } = useAlert();

  const {
    mutate: removeProducts,
    error,
    isError,
    status,
  } = useRemoveProducts();

  useEffect(() => {
    if (isError) {
      if (error.response) {
        if (error.response.status === 401) {
          toggleAlert(true, "شما مجاز به انجام این عملیات نیستید", "خطا");
        } else if (error.response.status === 404) {
          toggleAlert(true, "محصول مورد نظر یافت نشد", " خطا");
        } else {
          toggleAlert(true, error.response.data.message, " خطا ");
        }
      }
    }
    if (status === "success") {
      setIsShowRemove(false);
      queryClient.invalidateQueries("products");
      setTimeout(() => {
        toggleAlert(true, `محصولات با موفقیت حذف شدند`, " حذف محصولات");
      }, 500);
    }
  }, [error, isError, status]);

  const handleDelete = () => {
    toggleModal(
      true,
      "آیا از حذف محصولات اطمینان دارید؟",
      <DeleteModalIcon />,
      () => removeProducts({ids})
    );
    console.log('ids',{ids})
  };

  return (
    <div className={styles.wrapperTable}>
      <div className={styles.table}>
        <ul className={styles.header}>
          <span>
            <li> نام کالا</li>
            <li> موجودی</li>
            <li> قیمت</li>
            <li> شناسه کالا</li>
          </span>
          <li>
            {isShowRemove && (
              <button className={styles.btnRemove} onClick={handleDelete}>
                حذف
              </button>
            )}
          </li>
        </ul>

        <div>
          {products?.map((product) => (
            <Fragment key={product.id}>
              <RowTable
                product={product}
                ids={ids}
                setIds={setIds}
                isShowRemove={isShowRemove}
              />
            </Fragment>
          ))}
          {errorMessageProducts && <p className={styles.errorMessage}>{errorMessageProducts}</p>}
        </div>
      </div>
    </div>
  );
};

export default TableProducts;
