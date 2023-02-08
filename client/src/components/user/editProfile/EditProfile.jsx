import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile, uploadImage } from "../../../api/user/userRequest";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import { userActions } from "../../../redux/userSlice";

const EditProfile = () => {
  const dispatch=useDispatch()
  const profileImageRef = useRef();
  const coverImageRef = useRef();
  const [userInfo, setUserInfo] = useState({});
  const [profileImg, setProfileImg] = useState();
  const [coverImg, setCoverImg] = useState();
  const [imgErr, setImgErr] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user?.userDetails._id;
  console.log(userId, "iniyenkhilum");
  let userData;
  useEffect(() => {
    async function getUserInfo() {
      userData = await getUserProfile(userId);
      setUserInfo(userData[0].userId);
      console.log(userData, "ini edit cheythal mathi");
    }
    getUserInfo();
  }, []);
  const hadleEditProfile = async (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const coverImageUpdateHandler = (e) => {
    let file = e.target.files;
    const fileType = file[0]["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      setCoverImg(e.target.files);
      setImgErr("");
    } else {
      setImgErr(
        "cover image Invalid file type. Only jpeg, png, and gif images are allowed."
      );
    }
  };

  const profileImageUpdateHandler = (e) => {
    let file = e.target.files;
    const fileType = file[0]["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      setProfileImg(e.target.files);
      setImgErr("");
    } else {
      setImgErr(
        "profile image Invalid file type. Only jpeg, png, and gif images are allowed."
      );
    }
  };

  const prfUpadateHandler = async (e) => {
    e.preventDefault();
    if (userInfo.firstName.trim().length > 0) {
      if (userInfo.lastName.trim().length > 0) {
        if(coverImg){
            const coverImageLink=await uploadImage(coverImg)
            userInfo.coverImage=coverImageLink
            setCoverImg(null)
        }
        if(profileImg){
          const profileImageLink=await uploadImage(profileImg)
          userInfo.profileImage=profileImageLink
          setProfileImg(null)
        }
        dispatch(showLoading())
        const response=await updateUserProfile(userInfo)
        dispatch(hideLoading())
        if(response){
          dispatch(userActions.setUserDetails(userInfo[0].userId))
        }
      } else {
        setImgErr("lastName is mandatory");
      }
    } else {
      setImgErr("firstName is mandatory");
    }
  };
  return (
    <>
      {/* <section className=" py-1 bg-blueGray-50"> */}
      <div className="w-full  px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                My account
              </h6>
            </div>
          </div>
          <div className="mb-32 p-4">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-3 font-bold uppercase">
              EDIT PROFILE PICTURE AND COVER PHOTO
            </h6>
            {imgErr && (
              <h1 className="text-center text-red-600 text-sm">{imgErr}</h1>
            )}
            <div className="images w-full h-40 ">
              <div onClick={() => coverImageRef.current.click()}>
                <img
                  className="w-full h-40 object-cover cursor-pointer relative"
                  src={
                    coverImg
                      ? URL?.createObjectURL(coverImg[0])
                      : userInfo?.coverImage
                      ? userInfo?.coverImage
                      : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEA8PDQ8QDQ0NDw8NDQ0NDxANDQ0NFRIWFhURFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGi0lFx0tKysrLS0tLS0tLS0rKystLSstLS0tLS0rNy0tNy0tKzc3KystKy0rLSsrKystKysrK//AABEIAIABigMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADUQAQABAgMFBwEHBAMAAAAAAAABAhEDITEEBSJBURITFDJTYaGBI0Jxc4Ky4VJykfBDwdH/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAgED/8QAGxEBAQEBAAMBAAAAAAAAAAAAAAERMRIhUQL/2gAMAwEAAhEDEQA/AP1YB1cxFQBQARUBUJAAUEUAIlFQFQAUEkFQAFRQSRSAAACAARUBQAEVAVFAEUAAARUBQAQAAIAUAAQBQABAFEUARQAgARSAIRQAAARQC7Ga4jKZzIxKesZ6AyRjGJHWM9CMSMs4z0BkMYrjrGemerIFEsAogCgACAKAAIAoAAgCgACAKioCgAAAAAAASgoAESAioCgAXAASZ66K094bR3dM1RHFfsUX8ul5qsDZ7ynrGl/oxxMaIiZmezTFpmqdLdI93BnbMX1K/pNnniY1dXnqqqtp2pmbK8U+Tax941zNsP7OjlEeafeZeXjsb1KvhrjcZrY8djepV8Hjsb1KvhrhjNbeFvHFic6u3HOmq2f1dfZsemqntU3mnnGtVE9J9nzrLDxKqZvTVNM9aZsWNlfSziU9Y92US+c8Zi+pX/l0t3bXNcVdrzUWqmqI89PumxUrpAMaAAAAAAAAAAAAAAAAISAoAAICgAAgAKAigIoAQioCooA5e+Y4afzJ+vC6jl758tP5k/tbOsvHJAWhYpmZiIi8zlERzl1tl3XTGeJxVf0x5Y/9eW5sG81Vz93hp/GdZ/3qu9drmJ7uibREccxrN+Sb8VPrd7GDGVsOPbhu8to3bRV5eCrlMeWfo4dm7u7a5oqimZvRVNrT92Z0mDDY1sbCmiZpqi0x/t2Ds74wb0RXzom0/wBsuM2XWWYN/dE8WJy+z16cUNBvbonixOX2ev6oLwjuSCIWoAAICgAAgKAACAqKAIqQAKWAC6AohcFBAULoCygAKigBAACAsIqArl75jhj8yf2uo5e+Y4afzJ/a2dZeOSAtDr7lngqjnFV/ho7ypmMWu/Oe1H4TBu/ae7rz8tWVXt0l1tr2SnFiJvaqI4aozy/7hPKrscBlh0zM0xGszER/ltzuvFv92fe7e2HYIw57VU9qvlbSn8C2MxnvObYVfvaPreHBdDeu1RVMUUzemmbzMaTV/Dnn54Ub26fNicuDX9UNFvbpnixOXBr+qG0juSEpdC1EuAohcFC6Aoly4KCXBRLlwUEuCoqAKICgAAAAAAAShICglgBQACAEUAcvfPlpy/5J158LqNPbtm7ymadJvFdMzpM2tMEZXBGzOwY3pz9LSngMb06vheoxrtjZtsrw8qZvT/TVnH8L4HG9Or4PA43p1fB6b7bUb3n04v8A3fw19o3hiVxbyUzrFPP6sPAY3p1fB4DG9Or4ZkPbXGx4DG9Or4XwGN6dXw3WY1m9uieLE5cGv6oeXgMb06vh0N37HOHftZV15WjPs0xN5uWtkdEBCwAAAAAAIAAAAAAAQCAWEVLAAoIKAiooIKgAACpZQEUABAUABJi+uce8XVAScOnpGeuSd3TnlGeejMBh3dPSM9Tu6ekZs4AYThx0jPUnDpzyjNmAwnDjpGep3dPSM9WaAxnDjpGerKKYjKIiPwABQBFRQRRAFAEBQAQBUUBFQAAFS4AoAAAAAAACLKAKAEAAAAAAIoCKAAgAtkAVFQBYCIAAAAAAAAAAAAAAAABAAVAB/9k="
                  }
                  alt=""
                />
                <input
                  type="file"
                  ref={coverImageRef}
                  onChange={coverImageUpdateHandler}
                  hidden
                />
              </div>
              <div onClick={() => profileImageRef.current.click()}>
                {" "}
                <img
                  className="absolute right-0  left-0 m-auto cursor-pointer top-52 w-44 h-44 rounded-full object-cover"
                  src={
                    profileImg
                      ? URL?.createObjectURL(profileImg[0])
                      : userInfo?.profileImage
                      ? userInfo?.profileImage
                      : "data:image/png;base64,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"
                  }
                  alt=""
                />
                <input
                  type="file"
                  ref={profileImageRef}
                  onChange={profileImageUpdateHandler}
                  hidden
                />
              </div>
            </div>
          </div>
          <div className="flex-auto bg-gray-200 px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      Value={userInfo?.firstName}
                      name="firstName"
                      onChange={hadleEditProfile}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      Value={userInfo?.lastName}
                      name="lastName"
                      onChange={hadleEditProfile}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      Value={userInfo?.dob}
                      name="dob"
                      onChange={hadleEditProfile}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      Value={userInfo?.phoneNumber}
                      name="phoneNumber"
                      onChange={hadleEditProfile}
                    />
                  </div>
                </div>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Contact Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      Value={userInfo?.address}
                      name="address"
                      onChange={hadleEditProfile}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      City
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      Value={userInfo?.city}
                      name="city"
                      onChange={hadleEditProfile}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      Value={userInfo?.country}
                      name="country"
                      onChange={hadleEditProfile}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Postal Code
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      Value={userInfo?.postalCode}
                      name="postalCode"
                      onChange={hadleEditProfile}
                    />
                  </div>
                </div>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                About Me
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      About me
                    </label>
                    <textarea
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={userInfo?.about}
                      name="about"
                      onChange={hadleEditProfile}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex ">
              <button
                className="bg-cyan-900 ml-auto text-white active:bg-specclr font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={prfUpadateHandler}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </section > */}
    </>
  );
};

export default EditProfile;
