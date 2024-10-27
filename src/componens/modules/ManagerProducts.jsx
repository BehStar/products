import { useModalProdcutForm } from "../../providers-contexts/ModalFormProdcut.jsx";
import { useShowRemove } from "../../providers-contexts/ShowRemoveContext.jsx";
import ManagerIcon from "./ManagerIcon";
import styles from "./ManagerProducts.module.css";

const ManagerProducts = () => {
  const { toggleModalProductForm } = useModalProdcutForm();
  const { setIsShowRemove } = useShowRemove();

  return (
    <div className={styles.row}>
      <div className={styles.managmentWrapper}>
        <h4>مدیریت کالا</h4>
        <div className={styles.icon}>
          <ManagerIcon />
        </div>
      </div>
      <div className={styles.btnsGroup}>
        <button
          onClick={() => toggleModalProductForm(true, true)}
          className={styles.addBtn}
        >
          افزودن محصول
        </button>
        <button
          onClick={() => setIsShowRemove((prev) => !prev)}
          className={styles.removeBtn}
        >
          حذف دسته جمعی
        </button>
      </div>
    </div>
  );
};

export default ManagerProducts;
