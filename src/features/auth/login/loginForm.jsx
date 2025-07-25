import React, { useState, useEffect } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import doLogin from "../api/doLogin.jsx";
import {
  setError,
  setNormal,
  setButtonClick,
  setButtonGrey,
} from "../../../utils/setHelperColors.jsx";
import "./formStyles.css";

export default function LoginForm({
  setStatus,
  setIsLoggedIn,
  setServerResponse,
  setHelper,
}) {
  const [emailOrUser, setEmailOrUser] = useState();
  const [password, setPassword] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (emailOrUser && password) {
      setButtonClick("login-window-button");
    } else {
      setButtonGrey("login-window-button");
    }
  }, [emailOrUser, password]);

  return (
    <form
      id="login-form-container"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!emailOrUser) {
          setError("login-email-field");
          setHelper("Email/Username required");
        } else if (!password) {
          setError("login-password-field");
          setHelper("Password required");
        }
        const serverResponse = await doLogin(emailOrUser, password);
        setServerResponse(serverResponse);
        if (serverResponse.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }}
    >
      <input
        type="text"
        placeholder="Email or Username"
        id="login-email-field"
        className="input-field"
        onChange={(event) => {
          setEmailOrUser(event.target.value);
          setNormal("login-email-field");
        }}
      />
      <div className="password-container">
        <input
          type={visible ? "text" : "password"}
          placeholder="Password"
          className="input-field password-field"
          id="login-password-field"
          onChange={(event) => {
            setPassword(event.target.value);
            setNormal("login-password-field");
          }}
        />
        {visible ? (
          <EyeOutlined
            className="eye-outline"
            onClick={() => {
              setVisible(!visible);
            }}
          />
        ) : (
          <EyeInvisibleOutlined
            className="eye-outline"
            onClick={() => {
              setVisible(!visible);
            }}
          />
        )}
      </div>
      <p
        id="forgot-password-link"
        className="link"
        onClick={() => {
          setStatus("forgotPassword");
        }}
      >
        Forgot password?
      </p>
      <p id="new-user-message">
        New user?{" "}
        <span
          id="create-account-link"
          className="link"
          onClick={() => {
            setStatus("createAccount");
          }}
        >
          Create Account
        </span>
      </p>
      <button id="login-window-button" className="login-button">
        Log In
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  setStatus: PropTypes.string.isRequired,
  setIsLoggedIn: PropTypes.bool.isRequired,
  setServerResponse: PropTypes.any.isRequired,
  setHelper: PropTypes.string.isRequired,
};
