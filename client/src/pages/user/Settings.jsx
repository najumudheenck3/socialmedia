import React, { useState } from "react";
import { useSelector } from "react-redux";
import { setPrivateAccount } from "../../api/user/userRequest";

const Settings = () => {
  const user = useSelector((state) => state.user);
  const [enabled, setEnabled] = useState(user?.userDetails.private);
  const handlePrivateAccount = async () => {
    await setPrivateAccount();
    setEnabled(!enabled);
  };
  return (
    <div className="bg-white rounded-xl h-40 w-full gap-y-4 p-5">
      <div>
        <h1 className="font-bold text-xl">Settings</h1>
      </div>
      <div className="flex justify-between mt-3">
        <h1 className="font-semibold">Private Account</h1>
        <div className="flex">
          <label class="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={enabled}
              readOnly
            />
            <div
              onClick={() => {
                handlePrivateAccount();
              }}
              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
            <span className="ml-2 text-sm font-medium text-gray-900">ON</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
