import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { urlLogin, urlSignup, urlUsers } from "./utils/api-utils";
import axios from "axios";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignupLoginModal from "./components/SignupLoginModal/SignupLoginModal";
import InquiryPage from "./pages/InquiryPage/InquiryPage";
import TicketStatusPage from "./pages/TicketStatusPage/TicketStatusPage";
import OrganizationPage from "./pages/OrganizationPage/OrganizationPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginSignupMode, setLoginSignupMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.authToken);
  const [userInfo, setUserInfo] = useState({});

  const handleLogin = (e) => {
    axios
      .post(urlLogin(), {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        sessionStorage.authToken = response.data.token;
        setIsLoggedIn(true);
        setShowLoginModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignup = (e) => {
    axios
      .post(urlSignup(), {
        username: e.target.username.value,
        password: e.target.password.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        phone_number: e.target.phone_number.value,
        email: e.target.email.value,
      })
      .then((response) => {
        e.target.reset();
        setLoginSignupMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    axios
      .get(urlUsers(), {
        headers: {
          Authorization: `Bearer ${sessionStorage.authToken}`,
        },
      })
      .then((resp) => {
        setUserInfo(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  const closeModalClickHandler = () => {
    setShowLoginModal(false);
  };

  const loginSignupSubmitHandler = (e) => {
    e.preventDefault();

    if (loginSignupMode) {
      handleSignup(e);
    } else {
      handleLogin(e);
    }
  };

  const loginoutClickHandler = (e) => {
    if (isLoggedIn) {
      sessionStorage.removeItem("authToken");
      setIsLoggedIn(false);
      setUserInfo({});
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <BrowserRouter>
      <Header
        loginoutClickHandler={loginoutClickHandler}
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
      />
      {showLoginModal && (
        <SignupLoginModal
          closeModalClickHandler={closeModalClickHandler}
          loginSignupMode={loginSignupMode}
          loginSignupSubmitHandler={loginSignupSubmitHandler}
          toggleLoginSignupMode={() => {
            setLoginSignupMode(!loginSignupMode);
          }}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<InquiryPage userInfo={userInfo} isLoggedIn={isLoggedIn} />}
        />
        {/* <Route path="/inquiries" element={<InquiryPage />} />
        <Route path="/inquiries/:inquiryId" element={<InquiryPage />} /> */}
        <Route path="/tickets/:ticketId" element={<TicketStatusPage />} />
        {/* <Route
          path="/organization"
          element={<OrganizationPage isLoggedIn={isLoggedIn} />}
        /> */}
        <Route
          path="/organization/:organizationId"
          element={
            <OrganizationPage userInfo={userInfo} isLoggedIn={isLoggedIn} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
