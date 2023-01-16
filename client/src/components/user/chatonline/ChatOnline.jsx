import React from "react";

const ChatOnline = () => {
  return (
    <div>
      <div className="flex items-center cursor-pointer gap-x-2 mt-3">
        <div className="relative ">
          <img className="h-8 w-8 rounded-full object-cover"
            src="https://d1shwc4yijf729.cloudfront.net/resized/1280x640/assets/2021/07/08/pexels-giftpunditscom-1310522_25_60e67d243d570.webp"
            alt=""
          />
          <div className="h-2 w-2 rounded-full absolute bg-green-600 top-0 right-0"></div>
        </div>
        <span>hiba daliya</span>
      </div>
    </div>
  );
};

export default ChatOnline;
