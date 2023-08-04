import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import SaveIdCheckbox from "./SaveIdCheckbox";
import Input from "./Input";
import Loader from "./Loader";
import Logo from "./Logo";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputGroup = ["email", "password"];

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("123");
  };

  return (
    <section>
      {isLoading && <Loader />}
      <Logo />
      <div>
        {inputGroup.map((inputEl) => (
          <Input
            autoComplete="off"
            id={inputEl}
            placeholder={inputEl}
            value={inputEl === "email" ? email : password}
            onChange={(e) =>
              inputEl === "email"
                ? setEmail(e.target.value)
                : setPassword(e.target.value)
            }
          />
        ))}
        <div>
          <SaveIdCheckbox
            checked={isAutoLogin}
            onChange={(e) => setIsAutoLogin(e.target.checked)}
          />
        </div>
        <div>
          <Button onClick={loginUser} width="80%">
            로그인
          </Button>
        </div>

        <Link to="/finduserinfo">아이디- 비밀번호 찾기</Link>
      </div>
    </section>
  );
};

export default LoginComponent;
