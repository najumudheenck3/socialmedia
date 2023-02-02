import React, { useState } from "react";
import { reportPost } from "../../../api/user/PostRequest";

const ReportPost = ({setReportPostModal,postId}) => {
  const [reason,setReason]=useState("")
  const onChangeValue=(event)=>{
    setReason(event.target.value)

  }

  const handleReportPostSubmit=async()=>{
    console.log(postId,reason);
    const response=await reportPost({postId,reason})
    setReportPostModal()
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl mx-auto font-bold">Report Post</h3>
            </div>
            {/*body*/}
            <div className="relative p-2 flex-auto">
              <div className="flex w-96 px-3 ">
                <div class="rounded-lg  w-full">
                  <h1 className="font-bold">Why are you reporting this post?</h1>
                </div>
              </div>
              {/* caption */}
              <div className="flex flex-col gap-y-2 my-2 w-full p-2 " onChange={onChangeValue}>
                <div >
                  {" "}
                  <input  type="radio" value="It's spam" name="reason"/> It's spam
                </div>
                <hr/>
                <div>
                  {" "}
                  <input type="radio" value="Hate symbols" name="reason" /> Hate symbols
                </div>
                <hr/>
                <div>
                  {" "}
                  <input type="radio" value="Suicide or selft-injury" name="reason" /> Suicide or selft-injury
                </div>
                <hr/>
                <div>
                  <input type="radio" value="False information" name="reason" /> False information
                </div>
                <hr/>
                <div>
                  <input type="radio" value="False information" name="reason" /> Illegal 
                </div>{" "}
                <hr/>
                <div>
                  <input type="radio" value="I just don't like it" name="reason" /> I just don't like it
                </div>{" "}
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-2 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                  onClick={() => setReportPostModal()}
              >
                Close
              </button>
              <button
                className="bg-specclr text-white active:bg-cyan-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                  onClick={handleReportPostSubmit}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ReportPost;
