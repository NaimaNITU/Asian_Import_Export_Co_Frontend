import { ScaleLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <ScaleLoader />
      </div>
    </>
  );
};

export default LoadingSpinner;
