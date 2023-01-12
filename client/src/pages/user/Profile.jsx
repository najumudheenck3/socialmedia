import React, { useEffect, useState } from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Posts from "../../components/user/posts/Posts";
import { Link, useSearchParams } from "react-router-dom";
import { getUserProfile } from "../../api/user/userRequest";

const Profile = () => {
  const [userProfile, setUserProfile] = useState([]);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  console.log(userId, "lllllllllllllllll-----");
  let allData;
  useEffect(() => {
    const getDeatil = async () => {
      allData = await getUserProfile(userId);
      setUserProfile(allData);
    };
    getDeatil();
  }, []);

  return (
    <div>
      <div className="images w-full h-60 ">
        <img
          className="w-full h-full object-cover relative"
          src="https://blog.marketo.com/content/uploads/2014/02/facebook-cover-photo.jpg"
          alt=""
        />
        <img
          className="absolute right-0  left-0 m-auto top-52 w-44 h-44 rounded-full object-cover"
          src="https://wallpaperaccess.com/full/2213424.jpg"
          alt=""
        />
      </div>
      <div className="px-5 py-4">
        <div className="userIfo h-52 shadow-md  rounded-lg p-8 flex items-center justify-between mb-5 bg-white">
          <div className="lefttt flex-1 flex gap-2">
            <Link>
              <EmailRoundedIcon fontSize="large" />
            </Link>
            <Link>
              <EmailRoundedIcon fontSize="large" />
            </Link>{" "}
            <Link>
              <EmailRoundedIcon fontSize="large" />
            </Link>{" "}
            <Link>
              <EmailRoundedIcon fontSize="large" />
            </Link>
          </div>
          <div className="centerere flex-1 flex mt-6 flex-col items-center gap-2">
            <span className="text-3xl font-medium">
              {userProfile[0]?.userId.firstName}
            </span>
            <div className="infooo flex items-center justify-around w-full">
              <div className="flex items-center gap-2">
                <PlaceOutlinedIcon />
                <span className="text-sm">USA</span>
              </div>
              <div className="flex items-center gap-2">
                <LanguageOutlinedIcon />
                <span className="text-sm">abc.dev</span>
              </div>
            </div>
            <button className="bg-cyan-800 hover:bg-cyan-900 text-sm text-white font-bold  h-6 w-16 border border-cyan-900 rounded">
              follow
            </button>
          </div>
          <div className="righttt flex-1 flex items-center justify-end gap-2">
            <EmailRoundedIcon />
            <MoreVertOutlinedIcon />
          </div>
        </div>
        <Posts posts={userProfile} />
      </div>
    </div>
  );
};

export default Profile;
