import React, { useEffect, useState } from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Posts from "../../components/user/posts/Posts";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../api/user/userRequest";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState([]);
  const navigate=useNavigate()
  const location = useLocation();
  const userId = location.state.id
  console.log(userId, "lllllllllllllllll-----");
  let allData;
  useEffect(() => {
    const getDeatil = async () => {
      allData = await getUserProfile(userId);
      setUserProfile(allData);
    };
    getDeatil();
  }, []);

  let userProf = false;
  if (user?.userDetails._id === userId) {
    userProf = true;
  }

  return (
    <div className=" w-full">
      <div className="images w-full h-60 ">
        <img
          className="w-full h-full object-cover relative"
          src={userProfile[0]?.userId.coverImage
            ?userProfile[0]?.userId.coverImage
          :"https://blog.marketo.com/content/uploads/2014/02/facebook-cover-photo.jpg"}
          alt=""
        />
        <img
          className="absolute right-0  left-0 m-auto top-52 w-44 h-44 rounded-full object-cover"
          src={userProfile[0]?.userId.profileImage
            ?userProfile[0]?.userId.profileImage
          :"https://wallpaperaccess.com/full/2213424.jpg"}
          alt=""
        />
      </div>
      <div className="px-5 py-4">
        <div className="userIfo h-52 shadow-md  rounded-lg p-8 flex max-md:flex-col items-center justify-between mb-5 bg-white">
          <div className="lefttt flex-1 flex gap-2 max-md:hidden">
           
          </div>
          <div className="centerere flex-1 flex mt-6 flex-col items-center gap-2">
            <span className="text-xl font-medium">
              {userProfile[0]?.userId.firstName}
            </span>
            <div className="infooo flex items-center justify-around w-full">
              <div className="flex items-center gap-2">
                <span className="text-sm">7 Posts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">852 followers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">516 following</span>
              </div>
            </div>
            {!userProf && <div className="flex gap-x-4">
              <button className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded">
                follow
              </button>
              <button className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded">
                message
              </button>
            </div>}
            {userProf && <div className="flex gap-x-4">
              <button className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded" onClick={()=>navigate('/edit-profile')}>
                Edit Profile
              </button>
              <button className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded">
                Add tools
              </button>
            </div>}
          </div>
          <div className="righttt flex-1 flex items-center justify-end gap-2">
            {!userProf && <EmailRoundedIcon />}
            {userProf && <SettingsOutlinedIcon />}
            <MoreVertOutlinedIcon />
          </div>
        </div>
        <Posts posts={userProfile} />
      </div>
    </div>
  );
};

export default Profile;
