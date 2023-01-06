// import React, { useState } from "react";

// const PostModal = () => {
   
    // const [files, setFile] = useState([]);
    // const [message, setMessage] = useState();
    // const handleFile = (e) => {
    //     setMessage("");
    //     let file = e.target.files;

    //     for (let i = 0; i < file.length; i++) {
    //         const fileType = file[i]['type'];
    //         const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    //         if (validImageTypes.includes(fileType)) {
    //             setFile([...files, file[i]]);
    //         } else {
    //             setMessage("only images accepted");
    //         }

    //     }
    // }; 

    // const removeImage = (i) => {
    //     setFile(files.filter(x => x.name !== i));
    //  }


//     return (
//         <>
            // <div class="flex justify-center  items-center px-3 bg-slate-500 h-2/6">
            //     <div class="rounded-lg shadow-xl bg-gray-50 md:w-1/2 w-[360px]">
            //         <div class="m-4">
            //             <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">{message}</span>
            //             <div class="flex items-center justify-center w-full">
            //                 <label class="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
            //                     <div class="flex flex-col items-center justify-center pt-7">
            //                         <svg xmlns="http://www.w3.org/2000/svg"
            //                             class="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
            //                             fill="currentColor">
            //                             <path fill-rule="evenodd"
            //                                 d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            //                                 clip-rule="evenodd" />
            //                         </svg>
            //                         <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
            //                             Select a photo</p>
            //                     </div>
            //                     <input type="file" onChange={handleFile} class="opacity-0" multiple="multiple" name="files[]" />
            //                 </label>
            //             </div>
            //             <div className="flex flex-wrap gap-2 mt-2">

            //                 {files.map((file, key) => {
            //                     return (
            //                         <div key={key} className="overflow-hidden relative">
            //                             <i onClick={() => { removeImage(file.name) }} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"></i>
            //                             <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} alt=""/>
            //                         </div>
            //                     )
            //                 })}



            //             </div>
            //         </div>
            //     </div>
            // </div>
//         </>
//     );
// }

// export default PostModal


import React, { useState } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function PostModal({visible,onClose}) {
    const [files, setFile] = useState([]);
    const [message, setMessage] = useState();
    const handleFile = (e) => {
        setMessage("");
        let file = e.target.files;

        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                setFile([...files, file[i]]);
            } else {
                setMessage("only images accepted");
            }

        }
    }; 

    const removeImage = (i) => {
        setFile(files.filter(x => x.name !== i));
     }

  return (
    <>
    
      {visible ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => onClose()}
                  >
                    <span className="bg-transparent bg-slate-500  text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div class=" px-3 bg-slate-500  h-2/6 ">
                <div class="rounded-lg shadow-xl bg-gray-50 md:w-1/2 w-[360px]">
                    <div class="m-4">
                        <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">{message}</span>
                        <div class="flex items-center justify-center w-full">
                            <label class="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                                <div class="flex flex-col items-center justify-center pt-7">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                        Select a photo</p>
                                </div>
                                <input type="file" onChange={handleFile} class="opacity-0" multiple="multiple" name="files[]" />
                            </label>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">

                            {files.map((file, key) => {
                                return (
                                    <div key={key} className="overflow-hidden relative">
                                        <i onClick={() => { removeImage(file.name) }} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer">x</i>
                                        <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} alt=""/>
                                    </div>
                                )
                            })}



                        </div>
                    </div>
                </div>
            </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onClose()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onClose()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}