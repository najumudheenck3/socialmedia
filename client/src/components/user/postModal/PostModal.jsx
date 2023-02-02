import React, { useState } from "react";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import S3 from "aws-sdk/clients/s3";
import { uploadImage } from "../../../api/user/PostRequest";
import { useDispatch } from "react-redux";
import { AddPostActions } from "../../../redux/postSlice";
import { hideLoading, showLoading } from "../../../redux/alertSlice";

const region = process.env.REACT_APP_REGION;
const bucketName = process.env.REACT_APP_BUCKET_NAME;
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export default function PostModal({ visible, onClose }) {
  const dispatch=useDispatch()
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  const [desscription, setDescription] = useState("");
  const [imageLinks, setImageLinks] = useState([]);
  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };
  const handleDescription = (e) => setDescription(e.target.value);
  console.log(desscription, "description");

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 0) {
      files.forEach((file)=>{
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async (e) => {
          const result = e.target.result;
          const uploadParams = {
            Bucket: bucketName,
            Key: Date.now() + file.name,
            Body: result,
          };
          await s3
            .upload(uploadParams)
            .promise()
            .then( (res) => {
               setImageLinks((imageLinks) => [
                ...imageLinks,
                res.Location,
              ]);
            });
        };
      })
      console.log(imageLinks, "imagelinks");
      console.log(imageLinks.length, "lenthth");

      const data = {
        imageLinkss: imageLinks,
        desscription: desscription,
      };

      if (data.imageLinkss.length > 0) {
        dispatch(showLoading())
      const uploadSuccess=  await uploadImage(data);
     dispatch(hideLoading())
      if(uploadSuccess){
        onClose()
        dispatch(AddPostActions.postAdd())
      }else{
        setMessage("eroorrr");
      }
      }
   
    } else {
      setMessage("Please upload image");
    }
  };
  return (
    <>
      {visible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Post</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => onClose()}
                  >
                    <span className="bg-transparent bg-slate-500  text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex mt-5 w-96 px-3 ">
                    <div class="rounded-lg shadow-xl bg-gray-50 w-full">
                      <div class="m-4">
                        <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
                          {message}
                        </span>
                        <div class="flex items-center justify-center w-full">
                          <label class="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div class="flex flex-col items-center justify-center pt-7">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                Select a photo
                              </p>
                            </div>
                            <input
                              type="file"
                              onChange={handleFile}
                              class="opacity-0"
                              multiple="multiple"
                              name="files[]"
                            />
                          </label>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {files.map((file, key) => {
                            return (
                              <div
                                key={key}
                                className="overflow-hidden relative"
                              >
                                <i
                                  onClick={() => {
                                    removeImage(file.name);
                                  }}
                                  className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                                >
                                  x
                                </i>
                                <img
                                  className="h-20 w-20 rounded-md"
                                  src={URL.createObjectURL(file)}
                                  alt=""
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* caption */}
                  <div className="text-center my-2 w-full p-2 ">
                    <textarea
                      className="w-full border-2 text-slate-500 border-specclr rounded-xl py-2"
                      value={desscription}
                      onChange={handleDescription}
                      placeholder="Write a Caption"
                    ></textarea>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onClose()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-specclr text-white active:bg-cyan-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handlePostSubmit}
                  >
                    Upload
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
