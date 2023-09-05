import "./SignupLoginModal.scss";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-circle-svgrepo-com.svg";
import { useState } from "react";

function SignupLoginModal({
  closeModalClickHandler,
  loginSignupMode,
  loginSignupSubmitHandler,
  toggleLoginSignupMode,
}) {
  const [phoneNum, setPhoneNum] = useState(null);
  const handlePhoneNumChange = (event) => {
    setPhoneNum(event);
  };

  return (
    <div className="signup-login__container" onClick={closeModalClickHandler}>
      <div className="signup-login__modal">
        <CloseIcon
          className="signup-login__close-btn"
          onClick={closeModalClickHandler}
        />
        <form
          className="signup-login__form"
          onClick={(e) => e.stopPropagation()}
          onSubmit={loginSignupSubmitHandler}
        >
          <div className="signup-login__form-field">
            <label className="signup-login__form-label">Username:</label>
            <input
              className="signup-login__form-input"
              name="username"
              autocomplete="off"
            ></input>
          </div>

          <div className="signup-login__form-field">
            <label className="signup-login__form-label">Password:</label>
            <input
              className="signup-login__form-input"
              name="password"
              autocomplete="off"
              type="password"
            ></input>
          </div>

          {loginSignupMode && (
            <div className="signup-login__form-field">
              <label className="signup-login__form-label">First Name:</label>
              <input
                className="signup-login__form-input"
                name="first_name"
                autocomplete="off"
              ></input>
            </div>
          )}
          {loginSignupMode && (
            <div className="signup-login__form-field">
              <label className="signup-login__form-label">Last Name:</label>
              <input
                className="signup-login__form-input"
                name="last_name"
                autocomplete="off"
              ></input>
            </div>
          )}
          {loginSignupMode && (
            <div className="signup-login__form-field">
              <label className="signup-login__form-label">Phone Number:</label>
              {/* <input className="signup-login__form-input" name="phone_number" autocomplete="off"></input> */}
              <PhoneInput
                id="phoneNumber"
                name="phone_number"
                autoComplete="off"
                className="signup-login__form-input-phone"
                value={phoneNum}
                onChange={handlePhoneNumChange}
              ></PhoneInput>
            </div>
          )}
          {loginSignupMode && (
            <div className="signup-login__form-field">
              <label className="signup-login__form-label">E-mail:</label>
              <input
                className="signup-login__form-input"
                name="email"
                autocomplete="off"
              ></input>
            </div>
          )}
          <div className="signup-login__controls">
            <button className="signup-login__submit-btn" type="submit">
              {loginSignupMode ? "Sign up" : "Login"}
            </button>
            <span
              className="signup-login__switch-mode"
              onClick={toggleLoginSignupMode}
            >
              {loginSignupMode ? "Login" : "Sign up"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupLoginModal;
