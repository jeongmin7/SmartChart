import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = ({ basic }) => {
  if (basic) {
    <div>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="30"
        visible={true}
      />
    </div>;
  }
  return (
    <div>
      <div>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
