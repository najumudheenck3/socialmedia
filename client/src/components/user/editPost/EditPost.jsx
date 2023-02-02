import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editPost } from '../../../api/user/PostRequest'
import { AddPostActions } from '../../../redux/postSlice'

const EditPost = ({setPostOptions,setEditPostModal,image,description,postId}) => {
    const dispatch=useDispatch()
    const [editDescription,setEditDescription]=useState(description)
    const handleEditPostSubmit=async()=>{
        const response=await editPost({postId,editDescription})
        if(response){
            dispatch(AddPostActions.postAdd())
            setEditPostModal()
            setPostOptions()
        }
    }
  return (
    <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl mx-auto font-semibold">Edit Post</h3>
                  
                </div>
                {/*body*/}
                <div className="relative p-2 flex-auto">
                  <div className="flex w-96 px-3 ">
                    <div class="rounded-lg shadow-xl bg-slate-900 w-full">
                        <div class="flex items-center bg-slate-900 justify-center w-full">
                          <img className='h-full w-full' src={image} alt="" />
                        </div>
                    </div>
                  </div>
                  {/* caption */}
                  <div className="text-center my-2 w-full p-2 ">
                    <textarea
                      className="w-full border-2 text-slate-500 border-specclr rounded-xl p-2"
                      value={editDescription}
                      onChange={(e)=>setEditDescription(e.target.value)}
                      placeholder="Write a Caption"
                    ></textarea>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setEditPostModal()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-specclr text-white active:bg-cyan-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleEditPostSubmit}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  )
}

export default EditPost