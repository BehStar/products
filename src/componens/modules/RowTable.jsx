import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { useDeleteProduct } from "../../configs/mutations.js";

import { useShowRemove } from "../../providers-contexts/ShowRemoveContext.jsx";
import { useAuth } from "../../providers-contexts/AuthContext.jsx";
import { useModal } from "../../providers-contexts/ModalContext.jsx";
import { useAlert } from "../../providers-contexts/AlertContext.jsx";
import { useModalProdcutForm } from "../../providers-contexts/ModalFormProdcut.jsx";

import { convertNumbersToPersian } from "../../utils/convert";
import TrashIcon from "./TrashIcon.jsx";
import EditIcon from "./EditIcon.jsx";
import styles from "./RowTable.module.css";

import DeleteModalIcon from "./DeleteModalIcon.jsx";

const RowTable = ({ product: { id, name, quantity, price }, ids, setIds }) => {
  const queryClient = useQueryClient();
  const { getIsLoggedAccount } = useAuth();
  const isLoggedIn = getIsLoggedAccount().isLoggedIn;

  const { isShowRemove } = useShowRemove();
  const { toggleModal } = useModal();
  const { toggleAlert } = useAlert();
  const { toggleModalProductForm } = useModalProdcutForm();
  const {
    mutate: deleteProduct,
    error,
    isError,
    status,
  } = useDeleteProduct(id);

  const handleDelete = () => {
    toggleModal(
      true,
      `آیا از حذف محصول ${name} اطمینان دارید؟`,
      <DeleteModalIcon />,
      () => deleteProduct(id)
    );
  };

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
      queryClient.invalidateQueries("products");
      setTimeout(() => {
        toggleAlert(true, `محصول مورد نظر با موفقیت حذف شد`, " حذف محصول");
      }, 500);
    }
  }, [error, isError, status]);

  const handleChange = () => {
    setIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  return (
    <ul className={styles.body}>
      <Link to={`/products/${id}`}>
        <li>{name}</li>
        <li>{convertNumbersToPersian(quantity)}</li>
        <li>{convertNumbersToPersian(price)} هزار تومان</li>
        <li>{id}</li>
      </Link>
      <li>
        {isLoggedIn && (
          <>
            {isShowRemove && (
              <div className={styles.check}>
                <input type="checkbox" value={ids} onChange={handleChange} />
              </div>
            )}
            <div onClick={handleDelete}>
              <TrashIcon />
            </div>
            <div
              onClick={() =>
                toggleModalProductForm(true, false, id, name, quantity, price)
              }
            >
              <EditIcon />
            </div>
          </>
        )}
      </li>
    </ul>
  );
};

export default RowTable;
