import "./SignupLoginModal.scss";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-circle-svgrepo-com.svg";

function SignupLoginModal({
  closeModalClickHandler,
  loginSignupMode,
  loginSignupSubmitHandler,
  toggleLoginSignupMode,
}) {
  return (
    <div className="signup-login__container" onClick={closeModalClickHandler}>
      <form
        className="signup-login__form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={loginSignupSubmitHandler}
      >
        <CloseIcon
          className="signup-login__close-btn"
          onClick={closeModalClickHandler}
        />
        <div className="signup-login__username">
          <label>Username:</label>
          <input name="username"></input>
        </div>

        <div className="signup-login__password">
          <label>Password:</label>
          <input name="password"></input>
        </div>

        {loginSignupMode && (
          <div className="signup-login__first-name">
            <label>First Name:</label>
            <input name="first_name"></input>
          </div>
        )}
        {loginSignupMode && (
          <div className="signup-login__last-name">
            <label>Last Name:</label>
            <input name="last_name"></input>
          </div>
        )}
        {loginSignupMode && (
          <div className="signup-login__phone-number">
            <label>Phone Number:</label>
            <input name="phone_number"></input>
          </div>
        )}
        {loginSignupMode && (
          <div className="signup-login__email">
            <label>E-mail:</label>
            <input name="email"></input>
          </div>
        )}
        <button className="signup-login__submit-btn" type="submit">
          {loginSignupMode ? "Sign up" : "Login"}
        </button>
        <span
          className="signup-login__switch-mode"
          onClick={toggleLoginSignupMode}
        >
          {loginSignupMode ? "Login" : "Sign up"}
        </span>
      </form>
    </div>
  );
}

export default SignupLoginModal;
