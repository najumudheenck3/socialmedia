import React, { useEffect, useState } from "react";
import { acceptRequest, deleteRequest, getAllRequest } from "../../../api/user/FollowRequest";
import RequestCard from "../requestCard/RequestCard";

const Request = () => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const getAllData = async () => {
      const datas = await getAllRequest();
      console.log(datas, "datastssatdstst");
      setRequests(datas);
    };
    getAllData();
  }, []);

  const acceptUser = async (userId, index) => {
    const response = await acceptRequest({ userId });
    if (response) {
      let arr = [...requests];
      arr.splice(index, 1);
      setRequests(arr);
    }
  };

  const removeItem = async (deleteId, index) => {
    const response = await deleteRequest( deleteId );
    if (response) {
      let arr = [...requests];
      arr.splice(index, 1);
      setRequests(arr);
    }
  };
  return (
    <>
      <div className="p-2 py-1 top-24 w-full">
        {requests.length > 0 && (
          <div className="   shadow:lg shadow-gray-300 rounded-md p-4 mb-5   mt-6 ">
            <h2 className="text-xl font-bold mb-5">Friend Requests</h2>
            <div className="flex gap-2 flex-wrap justify-center">
              {requests?.map((request, index) => (
                <RequestCard
                  request={request}
                  index={index}
                  acceptUser={acceptUser}
                  removeItem={removeItem}
                  key={request._id}
                />
              ))}
            </div>
          </div>
        )}

        {requests.length === 0 && (
          <div className="bg-white shadow:lg overflow-hidden shadow-gray-300 rounded-md p-4 mb-5 w-full h-48 mt-6 ">
            <h1 className="text-2xl text-center font-semibold">
              There is no friend requests
            </h1>
            <img
              className="h-40 mx-auto "
              src="https://www.seekpng.com/png/full/151-1519416_pool-parties-in-bangalore-no-data-found-images.png"
              alt=""
            />
          </div>
        )}

        {/* <div className="shadow:lg shadow-gray-300 rounded-md p-2 mb-5   mt-6 ">
          <h2 className="text-xl font-bold mb-5">People follows you</h2>
          <div className="flex gap-2 flex-wrap justify-center">
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Request;
