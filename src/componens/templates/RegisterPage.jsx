import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BotoStartIcon
 from "../modules/BotoStartIcon.jsx";
import { useRegister } from "../../configs/mutations";
import { useAlert } from "../../providers-contexts/AlertContext.jsx";
import { usePersonAccount } from "../../providers-contexts/PersonContext.jsx";
import styles from "./RegisterPage.module.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";


const RegisterPage = () => {
  const [person, setPerson] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { setPersonAccount } = usePersonAccount();
  const navigate = useNavigate();
  const { toggleAlert } = useAlert();
  const { mutate: registerMutate } = useRegister();
  const [isShowPasswords, setIsShowPasswords] = useState({
    isShowPassword: false,
    isShowConfirmPassword: false,
  });

  // Handle Input
  const handleChangeInput = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrorMessages = {};

    if (person.username.length === 0) {
      newErrorMessages.username = "فیلد اجباری است";
    } else if (person.username.length < 3) {
      newErrorMessages.username = "نام کاربری باید حداقل 3 کاراکتر باشد";
    }
    if (person.password.length === 0) {
      newErrorMessages.password = "فیلد اجباری است";
    } else if (person.password.length < 5) {
      newErrorMessages.password = "رمز عبور باید حداقل 5 کاراکتر باشد";
    }

    if (person.confirmPassword.length === 0) {
      newErrorMessages.confirmPassword = "فیلد اجباری است";
    } else if (person.confirmPassword !== person.password) {
      newErrorMessages.confirmPassword =
        "رمز عبور با تکرار رمز عبور مغایرت دارد";
    }

    setErrorMessages(newErrorMessages);

    if (Object.keys(newErrorMessages).length > 0) {
      return;
    }
    registerMutate(
      { username: person.username, password: person.password },
      {
        onSuccess: () => {
          toggleAlert(
            true,
            "ثبت نام شما با موفقیت به اتمام رسید.",
            "ثبت نام موفق"
          );
          setPersonAccount({
            username: person.username,
            password: person.password,
          });
          navigate("/login");
        },
        onError: (error) => {
          if (error.status === 400) {
            toggleAlert(
              true,
              "این نام کاربری قبلا ثبت نام کرده است.",
              "عدم ثبت نام"
            );
          } else {
            toggleAlert(true, error.message, "عدم ثبت نام");
          }
        },
      }
    );
  };
  return (
    <div className={styles.wrapper}>
      <h2>بوت کمپ بوتواستارت</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.logoBox}>
          <BotoStartIcon />
        </div>
        <h3>فرم ثبت نام</h3>
        <div className={styles.boxInputs}>
            {/* username */}
          <div className={styles.row}>
            <input
              type="text"
              placeholder="نام کاربری"
              name="username"
              value={person.username}
              onChange={handleChangeInput}
            />
            <p
              className={`${styles.errorMessage} ${
                errorMessages.username
                  ? styles.hiddenToShowErrorMessage
                  : styles.showToHiddenErrorMessage
              }`}
            >
              {errorMessages.username}
            </p>
          </div>
          {/* Password */}
          <div className={styles.row}>
            <input
              type={isShowPasswords.isShowPassword ? "text" : "password"}
              placeholder="رمز عبور"
              name="password"
              value={person.password}
              onChange={handleChangeInput}
            />
            {isShowPasswords.isShowPassword ? (
              <FaEyeSlash
                className={`${styles.eye}`}
                onClick={() =>
                  setIsShowPasswords((prevPass) => ({
                    ...prevPass,
                    isShowPassword: false,
                  }))
                }
              />
            ) : (
              <FaEye
                className={`${styles.eye}`}
                onClick={() =>
                  setIsShowPasswords((prevPass) => ({
                    ...prevPass,
                    isShowPassword: true,
                  }))
                }
              />
            )}
            <p
              className={`${styles.errorMessage} ${
                errorMessages.password
                  ? styles.hiddenToShowErrorMessage
                  : styles.showToHiddenErrorMessage
              }`}
            >
              {errorMessages.password}
            </p>
          </div>
          {/* Confirm Password */}
          <div className={styles.row}>
            <input
              type={isShowPasswords.isShowConfirmPassword ? "text" : "password"}
              placeholder="تکرار رمز عبور"
              name="confirmPassword"
              value={person.confirmPassword}
              onChange={handleChangeInput}
            />
            {isShowPasswords.isShowConfirmPassword ? (
              <FaEyeSlash
                className={`${styles.eye}`}
                onClick={() =>
                  setIsShowPasswords((prevPass) => ({
                    ...prevPass,
                    isShowConfirmPassword: false,
                  }))
                }
              />
            ) : (
              <FaEye
                className={`${styles.eye}`}
                onClick={() =>
                  setIsShowPasswords((prevPass) => ({
                    ...prevPass,
                    isShowConfirmPassword: true,
                  }))
                }
              />
            )}
            <p
              className={`${styles.errorMessage} ${
                errorMessages.confirmPassword
                  ? styles.hiddenToShowErrorMessage
                  : styles.showToHiddenErrorMessage
              }`}
            >
              {errorMessages.confirmPassword}
            </p>
          </div>
        </div>
        <button type="submit">ثبت نام</button>
        <p className={styles.haveAcoount} onClick={() => navigate("/login")}>
          حساب کاربری دارید؟
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
