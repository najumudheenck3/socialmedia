import React from "react";
import Moment from "react-moment";

const Messages = ({message,own}) => {
  return (
    <div className="flex flex-col m-auto mt-5  ">
      {/* message top */}
      <div className={own?"flex gap-x-3 ml-auto ":"flex gap-x-3  "}>
        <img
          className="h-8 w-8 rounded-full object-cover "
          src="https://d1shwc4yijf729.cloudfront.net/resized/1280x640/assets/2021/07/08/pexels-giftpunditscom-1310522_25_60e67d243d570.webp"
          alt=""
        />
        <p className="p-2 bg-slate-300 rounded-3xl  max-w-xs ">{message?.text} </p>
      </div>
      {/* message bottom */}
      <Moment className={own?"text-xs mt-2 text-gray-400  ml-auto":"text-xs mt-2 text-gray-400"} fromNow>
              {message?.createdAt}
            </Moment>
    </div>
  );
};

export default Messages;
