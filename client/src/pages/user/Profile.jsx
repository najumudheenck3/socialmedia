import React, { useEffect, useState } from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Posts from "../../components/user/posts/Posts";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../api/user/userRequest";
import { useSelector } from "react-redux";
import Private from "../../components/user/private/Private";
import { followUser } from "../../api/user/FollowRequest";
import Followers from "../../components/user/followers/Followers";
import Following from "../../components/user/following/Following";
import SavedPost from "../../components/user/savedPost/SavedPost";

const Profile = () => {
  const postUpdateRefresh = useSelector((state) => state.addPost.AddPost);
  const user = useSelector((state) => state.user);
  const [option,setOption]=useState("post")
  const [follow, setFollowed] = useState(false)
  const [requested, setRequested] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [userData,setUserData]=useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.id;
  console.log(userId, "lllllllllllllllll-----");
  let allData;
  useEffect(() => {
    const getDeatil = async () => {
      allData = await getUserProfile(userId);
      setUserProfile(allData?.data);
      setUserData(allData?.user)
      setFollowed( allData?.user?.followers.includes(user?.userDetails._id))
      setRequested(allData?.user?.requests.includes(user?.userDetails._id))
    };
    getDeatil();
  }, [postUpdateRefresh === true, userId]);

  let userProf = false;
  if (user?.userDetails._id === userId) {
    userProf = true;
  }

 
console.log(user?.userDetails._id,'user?.userDetails._id'); 
console.log( userData?.requests?.includes(user?.userDetails._id),' userData?.requests.includes(user?.userDetails._id)');
  const followingUserHandler = async (followingId) => {
    const response = await followUser({followingId});
    if(response.success){
      console.log(userData,'userData?.Private');
      if(userData?.private){
        if(follow){
          setFollowed(false)
        }else{
          if(requested){
            setRequested(false)
          }else{
            setRequested(true)
          }
        }
      }else{
        if(follow){
          setFollowed(false)
        }else{
          setFollowed(true)
        }
      }
    }
  };
  return (
    <div className=" w-full">
      <div className="images w-full h-60 ">
        <img
          className="w-full h-full object-cover relative"
          src={
            userData?.coverImage
              ? userData?.coverImage
              : "https://t4.ftcdn.net/jpg/03/20/93/61/360_F_320936152_fZ1gZcCowkkuGT6aO2G1prI5r7NtodcK.jpg"
          }
          alt=""
        />
        <img
          className="absolute right-0  left-0 m-auto top-52 w-44 h-44 rounded-full object-cover"
          src={
            userData?.profileImage
              ? userData?.profileImage
              : "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
          }
          alt=""
        />
      </div>
      <div className="px-5 py-4">
        <div className="userIfo h-52 shadow-md  rounded-lg p-8 flex max-md:flex-col items-center justify-between mb-5 bg-white">
          <div className="lefttt flex-1 flex gap-2 max-md:hidden"></div>
          <div className="centerere flex-1 flex mt-6 flex-col items-center gap-2">
            <span className="text-xl font-medium">
              {userData?.firstName} {userData?.lastName}
            </span>
            <div className="infooo flex items-center justify-around w-full">
              <div className="flex items-center gap-2">
                <span className="text-sm cursor-pointer" onClick={()=>{setOption("post")}}>{userProfile.length} Posts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm cursor-pointer" onClick={()=>{setOption("followers")}}>
                  {userData?.followers?.length} followers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm cursor-pointer" onClick={()=>{setOption("following")}} >
                  {userData?.following?.length} following
                </span>
              </div>
            </div>
            {!userProf && (
              <div className="flex gap-x-4">
                {!follow && !requested && (
                  <button
                    className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded"
                    onClick={() =>
                      followingUserHandler(userData?._id)
                    }
                  >
                    follow
                  </button>
                )}
                {follow && !requested && (
                  <button
                    className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded"
                    onClick={() =>
                      followingUserHandler(userData?._id)
                    }
                  >
                    unfollow
                  </button>
                )}
                {requested && (
                  <button
                    className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded"
                    onClick={() =>
                      followingUserHandler(userData?._id)
                    }
                  >
                    Requested
                  </button>
                )}
                <button className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded"
                onClick={()=>navigate("/messenger")}
                >
                  message
                </button>
              </div>
            )}
            {userProf && (
              <div className="flex gap-x-4">
                <button
                  className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </button>
                <button className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-32 border border-cyan-900 rounded" 
                onClick={()=>{setOption("saved-post")}}
                >
                 saved post
                </button>
              </div>
            )}
          </div>
          <div className="righttt flex-1 flex items-center justify-end gap-2">
            {userProf && <SettingsOutlinedIcon className="cursor-pointer" onClick={()=>navigate('/settings')}/>}
            {/* <MoreVertOutlinedIcon /> */}
          </div>
        </div>
      
       {
        (!userData?.private || follow || userProf) && option==="post" &&  <Posts posts={userProfile} />
       }
        {
         (!userData?.private || follow || userProf) && option==="followers" && <Followers setOption={setOption} userId={userData?._id}/>
        }
        {
         (!userData?.private || follow || userProf) &&  option==="following" && <Following setOption={setOption} userId={userData?._id}/>
        }
        {
        (userData?.private && !follow && !userProf)  && <Private />
       }
       {
        option ==="saved-post" && <SavedPost/>
       }
      </div>
    </div>
  );
};

export default Profile;
