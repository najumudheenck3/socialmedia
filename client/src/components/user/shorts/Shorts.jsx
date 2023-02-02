import React, { useEffect, useState } from "react";
import { getAllShorts } from "../../../api/user/PostRequest";
import Short from "../short/Short";

const Shorts = () => {
  const [shorts, setShorts] = useState([]);
  let allShorts;
  useEffect(() => {
    const getShorts = async () => {
      allShorts = await getAllShorts();
      setShorts(allShorts);
    };
    getShorts();
  }, []);
  console.log(shorts, "shortsssssss");
  return <div className="flex flex-col gap-12">
  {shorts?.map((post) => (
    <Short post={post} key={post.id} />
  ))}
</div>
};

export default Shorts;
