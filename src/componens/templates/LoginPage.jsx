import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import BotoStartIcon from "../modules/BotoStartIcon.jsx";
import { useLogin } from "../../configs/mutations.js";
import { useAlert } from "../../providers-contexts/AlertContext.jsx";
import { useAuth } from "../../providers-contexts/AuthContext.jsx";
import { usePersonAccount } from "../../providers-contexts/PersonContext.jsx";
import styles from "./LoginPage.module.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const { pesronAccount, setPersonAccount } = usePersonAccount();
  const { toggleAccount } = useAuth();
  const navigate = useNavigate();
  const { toggleAlert } = useAlert();
  const { mutate: loginMutate } = useLogin();
  const [person, setPerson] = useState({
    username: pesronAccount.username || "",
    password: pesronAccount.password || "",
  });
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);

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
    }
    if (person.password.length === 0) {
      newErrorMessages.password = "فیلد اجباری است";
    }

    setErrorMessages(newErrorMessages);

    if (Object.keys(newErrorMessages).length > 0) {
      return;
    }
    loginMutate(
      { username: person.username.trim(), password: person.password },
      {
        onSuccess: (data) => {
          toggleAlert(true, `${person.username} عزیز خوش آمدید`, "ورود موفق");
          toggleAccount(true, data.token, person.username);
          setPerson({ username: "", password: "" });
          setPersonAccount({
            username: "",
            password: "",
          });
          navigate("/");
        },
        onError: (error) => {
          if (error.status === 400) {
            toggleAlert(true, "نام کاربری یا رمز ورود اشتباه است.", "عدم ورود");
          } else {
            toggleAlert(true, error.message, "عدم ورود");
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
        <h3>فرم ورود</h3>
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
          {/* password */}
          <div className={styles.row}>
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="رمز عبور"
              name="password"
              value={person.password}
              onChange={handleChangeInput}
            />
            {isShowPassword ? (
              <FaEyeSlash
                className={`${styles.eye}`}
                onClick={() => setIsShowPassword(false)}
              />
            ) : (
              <FaEye
                className={`${styles.eye}`}
                onClick={() => setIsShowPassword(true)}
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
        </div>
        <button type="submit"> ورود</button>
        <p className={styles.haveAcoount} onClick={() => navigate("/register")}>
          ایجاد حساب کاربری!
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
