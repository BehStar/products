import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModalProdcutForm } from "../../providers-contexts/ModalFormProdcut";
import { useCreateProduct, useEditProduct } from "../../configs/mutations";
import { useAlert } from "../../providers-contexts/AlertContext";
import { useAuth } from "../../providers-contexts/AuthContext";
import { useGetNamesMinMaxPrice } from "../../configs/queries";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./ModalProductForm.module.css";
import Loading from "./Loading";

const ModalProductForm = () => {
  const navigate = useNavigate();
  const { toggleAccount } = useAuth();
  const queryClient = useQueryClient();
  const { data: getAllNames } = useGetNamesMinMaxPrice();
  const { toggleAlert } = useAlert();
  const { modalProductForm, toggleModalProductForm } = useModalProdcutForm();
  const modalRef = useRef(null);

  const isCreateMode = modalProductForm.isCreate;
  const header = isCreateMode ? "ایجاد محصول جدید" : "ویرایش اطلاعات";

  const initialProductInfo = {
    name: isCreateMode ? "" : modalProductForm.name,
    quantity: isCreateMode ? 0 : modalProductForm.quantity,
    price: isCreateMode ? 0 : modalProductForm.price,
  };

  const [productInfo, setProductInfo] = useState(initialProductInfo);
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(true); 

  const { mutate: createMutate, isFetching: isFetchingCreateMutate } =
    useCreateProduct();
  const { mutate: editMutate, isFetching: isFetchingEditMutate } = useEditProduct(
    modalProductForm.id
  );
  if (isFetchingCreateMutate || isFetchingEditMutate) return <Loading />;

  // Handle Input Change
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProductInfo({
      ...productInfo,
      [name]: name === "name" ? value : Number(value),
    });
  };

  // Close Modal with Animation

const closeModal = () => {
  if (modalRef.current) { 
    setShowSuccessMessage(false);
    modalRef.current.classList.add(styles.out);
    setTimeout(() => {
      toggleModalProductForm(false);
      if (modalRef.current) { 
        modalRef.current.classList.remove(styles.out);
      }
    }, 500);
  }
};

  // Handle Click Outside Modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.modal}`)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrorMessages = {};

    if (productInfo.name.length === 0) {
      newErrorMessages.name = "فیلد اجباری است";
    }
    if (productInfo.quantity <= 0) {
      newErrorMessages.quantity = "حداقل تعداد یک می باشد.";
    }
    if (productInfo.price <= 0) {
      newErrorMessages.price = "حداقل قیمت 1 می باشد";
    }

    setErrorMessages(newErrorMessages);

    if (Object.keys(newErrorMessages).length > 0) {
      return;
    }

    if (isCreateMode) {
      handleCreateProduct();
    } else {
      handleEditProduct();
    }
  };

  // Handle Create Product
  const handleCreateProduct = () => {
    const isDuplicate = getAllNames?.names.find(
      (name) => productInfo.name === name
    );
    if (isDuplicate) {
      toggleAlert(
        true,
        `${productInfo.name} در پایگاه داده ذخیره شده است`,
        "تکراری "
      );
      return;
    }

    createMutate(
      {
        name: productInfo.name.trim(),
        quantity: productInfo.quantity.trim(),
        price: productInfo.price.trim(),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
          toggleAlert(
            true,
            `${productInfo.name} در پایگاه داده ذخیره شد `,
            "ثیت محصول"
          );
          closeModal();
        },
        onError: (error) => {
          handleError(error, "عدم ثبت محصول");
        },
      }
    );
  };

  // Handle Edit Product
  const handleEditProduct = () => {
    setShowSuccessMessage(true); // در هنگام ثبت ویرایش، نمایش پیغام را فعال می‌کنیم
    editMutate(
      {
        name: productInfo.name,
        quantity: productInfo.quantity,
        price: productInfo.price,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
          if (showSuccessMessage) { // بررسی نمایش پیغام
            toggleAlert(true, `محصول با موفقیت ویرایش شد `, "ویرایش محصول");
          }
          closeModal();
        },
        onError: (error) => {
          handleError(error, "عدم ویرایش محصول");
        },
      }
    );
  };

  // Handle API Error
  const handleError = (error, defaultMessage) => {
    if (error.status === 401 || error.status === 403) {
      toggleAlert(true, "لطفا وارد حساب کاربری خود شوید", "عدم احراز هویت");
      closeModal();
      toggleAccount(false, "", "");
      navigate("/login");
    } else {
      toggleAlert(true, error.message, defaultMessage);
    }
  };

  return (
    <div className={styles.modalContainer} ref={modalRef}>
      <div className={styles.modalBackground}>
        <div className={styles.modal}>
          <div className={styles.header}>{header}</div>
          <form onSubmit={handleSubmit}>
            {/* name roduct */}
            <div className={styles.row}>
              <label>نام کالا</label>
              <div>
                <input
                  type="text"
                  placeholder="نام کالا"
                  name="name"
                  value={productInfo.name}
                  onChange={handleChangeInput}
                />
                <p
                  className={`${styles.errorMessage} ${
                    errorMessages.name
                      ? styles.hiddenToShowErrorMessage
                      : styles.showToHiddenErrorMessage
                  }`}
                >
                  {errorMessages.name}
                </p>
              </div>
            </div>
            {/* Quantity */}
            <div className={styles.row}>
              <label>تعداد موجودی</label>
              <div>
                <input
                  type="number"
                  placeholder="تعداد موجودی"
                  name="quantity"
                  value={productInfo.quantity}
                  onChange={handleChangeInput}
                />
                <p
                  className={`${styles.errorMessage} ${
                    errorMessages.quantity
                      ? styles.hiddenToShowErrorMessage
                      : styles.showToHiddenErrorMessage
                  }`}
                >
                  {errorMessages.quantity}
                </p>
              </div>
            </div>
            {/* Price */}
            <div className={styles.row}>
              <label> قیمت</label>
              <div>
                <input
                  type="number"
                  placeholder=" قیمت"
                  name="price"
                  value={productInfo.price}
                  onChange={handleChangeInput}
                />
                <p
                  className={`${styles.errorMessage} ${
                    errorMessages.price
                      ? styles.hiddenToShowErrorMessage
                      : styles.showToHiddenErrorMessage
                  }`}
                >
                  {errorMessages.price}
                </p>
              </div>
            </div>
            <div className={styles.btnsWrapper}>
              <button type="submit">
                {isCreateMode ? "ایجاد" : "ثبت اطلاعات جدید"}
              </button>
              <button onClick={closeModal}>انصراف</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalProductForm;