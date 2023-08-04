import React, { useState } from "react";
import Input from "./Input";
import SaveIdCheckbox from "./SaveIdCheckbox";
import Button from "./Button";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Logo from "./Logo";

const LoginInfo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };
  return (
    <section>
      <Logo />
      <div>
        <label>
          <input
            type="radio"
            value="환자 로그인"
            checked={selectedOption === "환자 로그인"}
            onChange={handleOptionChange}
          />
          환자 로그인
        </label>
        <label>
          <input
            type="radio"
            value="의사 로그인"
            checked={selectedOption === "의사 로그인"}
            onChange={handleOptionChange}
          />
          의사 로그인
        </label>
      </div>
      {isLoading && <Loader />}
      <div>
        <form onSubmit={loginUser}>
          <Input
            email
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            password
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <SaveIdCheckbox
              checked={isAutoLogin}
              onChange={(e) => setIsAutoLogin(e.target.checked)}
            />
          </div>
          <div>
            <Button type="submit" width="80%">
              로그인
            </Button>
          </div>

          <Link to="/finduserinfo">아이디- 비밀번호 찾기</Link>

          {selectedOption === "의사 로그인" ? (
            <Link to="/register/doctor/">회원가입</Link>
          ) : (
            <Link to="/register/patient">회원가입</Link>
          )}
        </form>
      </div>
    </section>
  );
};

export default LoginInfo;
