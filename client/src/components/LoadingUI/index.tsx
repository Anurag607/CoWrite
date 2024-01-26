"use client";

import Lottie from "react-lottie-player";
import Loader from "../../../public/lotties/Loader.json";

const LoaderSkeleton = () => {
  return (
    <div className="grid h-[80vh] grow place-items-center">
      <div>
        <Lottie
          loop
          animationData={Loader}
          play
          style={{ width: 200 }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      </div>
    </div>
  );
};

export default LoaderSkeleton;
