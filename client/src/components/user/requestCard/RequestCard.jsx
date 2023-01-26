import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";

const RequestCard = ({ request,removeItem,acceptUser,index }) => {
  const navigate = useNavigate();
  //go to profile page
  const toProfile = (userId) => {
    navigate("/profile", { state: { id: userId } });
  };
  return (
    <>
      <div className=" bg-white rounded-md p-1 h-48 w-36 ">
        <img
          className="h-28 w-28 mt-2 mx-auto rounded-full object-cover cursor-pointer"
          src={
            request?.profileImage
              ? request?.profileImage
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&usqp=CAU "
          }
          alt=""
          onClick={() => {
            toProfile(request?._id);
          }}
        />
        <h1
          className="text-center font-semibold cursor-pointer"
          onClick={() => {
            toProfile(request?._id);
          }}
        >
          {request?.firstName} {request?.lastName}
        </h1>
        <div className="flex justify-between p-2 gap-x-2">
          <button className="bg-specclr rounded-sm text-white w-24" onClick={()=>acceptUser(request?._id,index)}>
            Accept
          </button>
          <DeleteOutlinedIcon className="text-red-700 cursor-pointer" onClick={()=>removeItem(request?._id,index)}/>
        </div>
      </div>
    </>
  );
};

export default RequestCard;
