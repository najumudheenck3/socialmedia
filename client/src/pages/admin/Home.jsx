import React, { useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { fetDashboardDetails } from "../../api/admin/UserRequest";

const Home = () => {
  const [totalUsers,setTotalUsers]=useState('')
  const [activeUsers,setActiveUsers]=useState('')
  useEffect(()=>{
const getDeatil=async()=>{
  const response=await fetDashboardDetails()
  console.log(response,'resssssss')
  setTotalUsers(response?.userCount)
  setActiveUsers(response?.activeCount)
}
getDeatil()
  },[])
  return (
    <>
      <div className="flex mt-5 p-5 w-full text-center gap-x-10 justify-center ">
        <div className="h-56 w-56 bg-white flex items-center flex-col gap-y-5 rounded-xl p-5">
          <h1 className="font-bold text-2xl"> Total Users</h1>
          <GroupIcon className="text-specclr" fontSize="large" />
          <h1 className="font-bold text-6xl">{totalUsers}</h1>

        </div>
        <div className="h-56 w-56 bg-white flex items-center flex-col gap-y-5 rounded-xl p-5">
          <h1 className="font-bold text-2xl">Active Users</h1>
          <GroupAddIcon className="text-specclr" fontSize="large" />
          <h1 className="font-bold text-6xl">{activeUsers}</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
