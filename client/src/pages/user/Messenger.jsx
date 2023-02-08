import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  addNewMessage,
  getAllConversations,
  getAllMessages,
} from "../../api/user/ChatRequest";
import ChatOnline from "../../components/user/chatonline/ChatOnline";
import Conversations from "../../components/user/conversations/Conversations";
import Messages from "../../components/user/messages/Messages";
import Navbar from "../../components/user/nvabar/Navbar";
import { io } from "socket.io-client";
import MobileFooter from "../../components/user/mobilefooter/MobileFooter";

const Messenger = () => {
  const user = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage,setArrivalMessage]=useState(null)
  const [onlineUsers,setOnlineUsers]=useState([])
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage",data=>{
      setArrivalMessage({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now()
      })
    })
  }, []);

  useEffect(()=>{
    arrivalMessage&&currentChat?.members.includes(arrivalMessage.sender)&&
    setMessages(prev=>[...prev,arrivalMessage])
  },[arrivalMessage,currentChat])

  useEffect(() => {
    socket.current.emit("addUser", user?.userDetails._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users)
      // user?.userDetails?.following.filter(f=>users.some(u=>u.userId===f
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      const response = await getAllConversations(user?.userDetails._id);
      if (response) {
        console.log(response, "conversaaaationsss");
        setConversations(response);
      }
    };
    getConversations();
  }, [user?.userDetails._id]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getAllMessages(currentChat?._id);
      if (response) {
        setMessages(response);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?.userDetails._id,
      text: newMessage,
      coversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user?.userDetails._id
    );

    socket.current.emit("sendMessage", {
      senderId: user?.userDetails._id,
      receiverId,
      text: newMessage,
    });

    const response = await addNewMessage(message);
    setMessages([...messages, response]);
    setNewMessage("");
  };



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Navbar />
      {/* messenger main */}
      <div className="h-[calc(100vh-80px)] flex">
        {/* chatMenu */}
        <div className="w-3/12 max-md:w-1/5">
          {/* chatmenu wraper */}
          <div className=" p-3 h-full">
            <input
              className="w-11/12 py-3 outline-none border-b-2 border-solid border-gray-300"
              placeholder="Search for friends"
            />
            {conversations?.map((conversation) => (
              <div onClick={() => setCurrentChat(conversation)}>
                <Conversations conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        {/* chatBox */}
        <div className="w-6/12 max-md:w-4/5">
          {/* chatwraper */}
          <div className=" p-3 h-full flex flex-col justify-between relative">
            {/* chatBox top */}
            {currentChat ? (
              <>
                <div className="h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-ful overflow-y-scroll pr-3 ">
                  {messages?.map((message) => (
                    <div ref={scrollRef}>
                      <Messages
                        message={message}
                        own={message.sender === user?.userDetails._id}
                      />
                    </div>
                  ))}
                </div>
                {/* chatBox bottom */}
                <div className="mt-1 flex items-center justify-between">
                  <textarea
                    className="w-4/5 h-24 p-2 outline-none border-2 border-gray-400"
                    placeholder="write something"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="h-10 w-16 bg-specclr text-white rounded-xl"
                    onClick={handleSubmit}
                  >
                    send
                  </button>
                </div>
              </>
            ) : (
              <sapan className="text-gray-700  text-2xl text-center self-center cursor-default ">
                Open a conversation to start a chat
              </sapan>
            )}
          </div>
        </div>
        {/* chatOnline */}
        <div className="w-3/12  max-md:hidden">
          {/* chatonline wraper */}
          <div className=" p-3 h-full">
            <ChatOnline onlineUsers={onlineUsers} currentId={user?.userDetails._id} setCurrentChat={setCurrentChat}/>
          </div>
        </div>
      </div>
      <MobileFooter/>
    </>
  );
};

export default Messenger;
