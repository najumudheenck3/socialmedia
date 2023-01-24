import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile, uploadImage } from "../../../api/user/userRequest";
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
        const response=await updateUserProfile(userInfo)
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
                      : "https://wallpaperaccess.com/full/2213424.jpg"
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
