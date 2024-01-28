import { CaretRightOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setShowBottomBar, setShowSidebar } from "@/redux/reducers/drawerSlice";
import Popup from "./Popup";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const showSidebar = useAppSelector((state: any) => state.drawer.showSidebar);

  return (
    <>
      <div
        className={`z-[100000001] top-[20%] right-0 w-[30rem] bg-transparent rounded-l-2xl overflow-clip fixed h-[25rem] ease-in-out duration-300 ${
          showSidebar[0] ? "translate-x-0" : "translate-x-full"
        } shadow-2xl`}
      >
        <div className="mx-auto bg-white dark:bg-neutral-300 h-full w-full relative overflow-clip p-3">
          <button
            onClick={() => {
              dispatch(setShowBottomBar([false, ""]));
              dispatch(setShowSidebar([false, ""]));
            }}
            className="bg-[#37352F] rounded-lg w-16 h-8 text-white text-md font-bold flex items-center justify-center mb-3.5"
          >
            <CaretRightOutlined className="m-0 p-0" />
          </button>
          <Popup />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
