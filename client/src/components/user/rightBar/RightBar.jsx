import React, { useEffect, useState } from "react";
import CakeIcon from "@mui/icons-material/Cake";
import { suggestionUsers } from "../../../api/user/userRequest";
import { useSelector } from "react-redux";
import Suggestion from "../suggetion/Suggestion";

const RightBar = () => {
  const [user, setUsers] = useState([]);
  const userId = useSelector((state) => state?.user?.userDetails._id);
  useEffect(() => {
    const fetchData = async () => {
      const users = await suggestionUsers();
      setUsers(users);
    };
    fetchData();
  }, []);
  return (
    <div className="sticky top-16 h-full w-3/12 hidden md:block max-md:w-0">
      <div className="p-4">
        {/* <div className=" bg-white shadow-md p-2 rounded-md mb-6">
          <span className="text-gray-600 ">Friend Requests</span>
          <div className="flex item-center content-center justify-between">
            <div className="flex item-center content-center gap-x-1">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
              <span>travelr_abu</span>
            </div>
            <div className="flex item-center content-center gap-x-1">
              <button class="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-16 border border-cyan-900 rounded">
                confirm
              </button>
              <button class="bg-red-500 hover:bg-red-700 text-sm text-white font-bold h-6 w-16  border border-red-700 rounded">
                Delete
              </button>
            </div>
          </div>
        </div> */}
        <div className=" bg-white shadow-md p-2 rounded-md mb-6">
          <span className="text-gray-600 ">Birthdays</span>
          <div className="flex items-center content-between gap-6">
            <div>
              <CakeIcon />
            </div>
            <div>
              <p>
                Lorem ipsum dolorpossimus
                <br /> velit sint , archit
              </p>
            </div>
          </div>
        </div>
        <div className=" bg-white shadow-md p-2 rounded-md">
          <span className="text-gray-600 ">People You may know</span>
          {user?.length > 0 && user?.map((item) =>item._id !== userId && <Suggestion user={item} />)}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
