import React, { useMemo, useState } from 'react';

export default function LoginButton({ didLogin }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function LoggedIn() {
    return (
      <div className="login-buttons-container">
        <button className="topnav-buttons">Profile</button>
      </div>
    );
  }

  function NoLogin() {
    function openWindow() {
      const loginPopupWindow = document.getElementById('login-popup-window');
      const blurBackground = document.getElementById('blur-background');
      if (loginPopupWindow && blurBackground) {
        loginPopupWindow.style.display = 'block';
        blurBackground.style.display = 'block';
      }
    }

    return (
      <div className="login-buttons-container">
        <button
          onClick={() => {
            openWindow();
          }}
          className="topnav-buttons"
        >
          Log In
        </button>
      </div>
    );
  }

  useMemo(() => {
    if (didLogin) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, [didLogin]);
  return <div>{isLoggedIn ? <LoggedIn /> : <NoLogin />}</div>;
}
