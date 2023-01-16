import React from "react";
import ChatOnline from "../../components/user/chatonline/ChatOnline";
import Conversations from "../../components/user/conversations/Conversations";
import Messages from "../../components/user/messages/Messages";
import Navbar from "../../components/user/nvabar/Navbar";

const Messenger = () => {
  return (
    <>
      <Navbar />
      {/* messenger main */}
      <div className="h-[calc(100vh-80px)] flex">
        {/* chatMenu */}
        <div className="w-3/12">
          {/* chatmenu wraper */}
          <div className=" p-3 h-full">
            <input
              className="w-11/12 py-3 outline-none border-b-2 border-solid border-gray-300"
              placeholder="Search for friends"
            />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
          </div>
        </div>
        {/* chatBox */}
        <div className="w-6/12 " >
          {/* chatwraper */}
          <div className=" p-3 h-full flex flex-col justify-between">
            {/* chatBox top */}
            <div className="h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-ful overflow-y-scroll pr-3 ">
              <Messages own={true} />
              <Messages />
              <Messages own={true}/>
              <Messages />
              <Messages own={true}/>
              <Messages />
              <Messages own={true}/>
              <Messages />

            </div>
            {/* chatBox bottom */}
            <div className="mt-1 flex items-center justify-between">
              <textarea className="w-4/5 h-24 p-2 outline-none border-2 border-gray-400" placeholder="write something"></textarea>
              <button className="h-10 w-16 bg-specclr text-white rounded-xl">send</button>
            </div>
          </div>
        </div>
        {/* chatOnline */}
        <div className="w-3/12">
          {/* chatonline wraper */}
          <div className=" p-3 h-full">
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>

          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
