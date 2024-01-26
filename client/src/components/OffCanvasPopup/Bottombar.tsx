import { CaretDownOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setShowBottomBar, setShowSidebar } from "@/redux/reducers/drawerSlice";
import Popup from "./Popup";

const Bottombar = () => {
  const dispatch = useAppDispatch();
  const showBottomSidebar = useAppSelector(
    (state: any) => state.drawer.showBottomSidebar
  );

  return (
    <>
      <div
        className={`z-[100000001] bottom-0 left-0 right-0 w-screen bg-transparent rounded-t-2xl overflow-clip fixed h-[75vh] ease-in-out duration-300 ${
          showBottomSidebar[0] ? "translate-y-0" : "translate-y-full"
        } shadow-[0px_0px_8px_0px_#e8e8e8] dark:shadow-[0px_0px_8px_0px_#37474f]`}
      >
        <div className="mx-auto bg-white dark:bg-neutral-300 h-full w-full relative overflow-clip p-3 flex flex-col justify-start items-center">
          <button
            onClick={() => {
              dispatch(setShowBottomBar([false, ""]));
              dispatch(setShowSidebar([false, ""]));
            }}
            className="bg-[#37352F] rounded-lg w-16 h-8 text-white text-md font-bold flex items-center justify-center mb-3.5"
          >
            <CaretDownOutlined className="m-0 p-0" />
          </button>
          <Popup content={showBottomSidebar[1]} />
        </div>
      </div>
    </>
  );
};

export default Bottombar;
