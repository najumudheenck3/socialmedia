import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { getUserProfile } from "../../api/admin/UserRequest";
import Posts from "../../components/admin/posts/Posts";
import Followers from "../../components/admin/followers/Followers";
import Following from "../../components/admin/following/Following";

const UserProfile = () => {
  const location = useLocation();
  const userId = location.state.id;
  console.log(userId, "lllllllllladminlllllll-----");
  const [option,setOption]=useState("post")
  const [userProfile, setUserProfile] = useState([]);
  let allData;
  useEffect(() => {
    const getDeatil = async () => {
      allData = await getUserProfile(userId);
      setUserProfile(allData);
    };
    getDeatil();
  }, []);
  return (
    <div className=" w-full p-5">
      <div className=" images relative w-full h-60 ">
        <img
          className="w-full h-full object-cover relative"
          src={
            userProfile[0]?.userId.coverImage
              ? userProfile[0]?.userId.coverImage
              : "https://t4.ftcdn.net/jpg/03/20/93/61/360_F_320936152_fZ1gZcCowkkuGT6aO2G1prI5r7NtodcK.jpg"
          }
          alt=""
        />
        <img
          className="absolute top-36 left-0 right-0 mx-auto  text-center w-44 h-44 rounded-full object-cover"
          src={
            userProfile[0]?.userId.profileImage
              ? userProfile[0]?.userId.profileImage
              : "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
          }
          alt=""
        />
      </div>
      <div className="px-5 py-4">
        <div className="userIfo h-52 shadow-md  rounded-lg p-8 flex max-md:flex-col items-center justify-between mb-5 bg-white">
          <div className="lefttt flex-1 flex gap-2 max-md:hidden"></div>
          <div className="centerere flex-1 flex mt-6 flex-col items-center gap-2">
            <h1>{userProfile[0]?.userId?.about}</h1>
            <span className="text-xl font-medium">
              {userProfile[0]?.userId.firstName}
            </span>
            <div className="infooo flex items-center justify-around w-full">
              <div className="flex items-center gap-2">
                <span
                  className="text-sm cursor-pointer"
                  onClick={() => {
                    setOption("post");
                  }}
                >
                  {userProfile.length} Posts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-sm cursor-pointer"
                  onClick={() => {
                    setOption("followers");
                  }}
                >
                  {userProfile[0]?.userId.followers.length} followers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-sm cursor-pointer"
                  onClick={() => {
                    setOption("following");
                  }}
                >
                  {userProfile[0]?.userId.following.length} following
                </span>
              </div>
            </div>

            {/* <div className="flex gap-x-4">
              <button
                className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded"
             
              >
                Edit Profile
              </button>
              <button
                className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded"
                onClick={() => {
                  setOption("saved-post");
                }}
              >
                saved post
              </button>
            </div> */}
          </div>
          <div className="righttt flex-1 flex items-center justify-end gap-2">
          
          </div>
        </div>
        {option==="post" &&  <Posts posts={userProfile} />}
        {
         option==="followers" && <Followers setOption={setOption} userId={userProfile[0]?.userId._id}/>
        }
        {
          option==="following" && <Following setOption={setOption} userId={userProfile[0]?.userId._id}/>
        }
      </div>
    </div>
  );
};

export default UserProfile;
