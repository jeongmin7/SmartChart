import React from "react";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../stores/userInfo";

const MypageComponent = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  return (
    <div>
      {userInfo.isDoctor ? "의사 이름:" : "환자 이름:"}
      {userInfo.username}
      <div>
        성별: <input value={userInfo.gender} />
      </div>
      <div>
        나이: <input value={userInfo.age} />
      </div>
      <div>
        전화번호: <input value={userInfo.phoneNumber} />
      </div>
      <button>업데이트</button>
    </div>
  );
};

export default MypageComponent;
