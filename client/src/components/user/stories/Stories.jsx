import React from "react";

const Stories = () => {
  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 5,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    // {
    //   id: 6,
    //   name: "John Doe",
    //   img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    // },
    // {
    //   id: 7,
    //   name: "John Doe",
    //   img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    // },
  ];

  return (
    <div className="flex h-70 gap-2 md:mb-7  items-center justify-center flex-wrap ">
      {/* <div className="flex-1 rounded-2xl overflow-hidden bg-cyan-800">
          <img className="w-full h-full" src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="" />
          <span>username</span>
        </div> */}
      {stories.map((story) => (
        <div className="flex-1  rounded-2xl overflow-hidden " key={story.id}>
          <div
            className="story-item relative hover:opacity-90 cursor-pointer transition duration-200 ease-in-out max-md:hidden"
            style={{ width: "126px" }}
          >
            <img className="rounded-xl object-cover" src={story.img} alt="" />
            <div className="absolute flex flex-col justify-between h-full w-full top-0 left-0 py-4">
              <img
                className="rounded-full w-12 h-12 border-4 border-specclr ml-4"
                src={story.img}
                alt=""
              />
              <span className="text-center text-white">hhhhhh</span>
            </div>
          </div>

          {/* for moblie */}
          <div
            className="story-itemflex flex-col 
           t md:hidden "
            style={{ width: "126px" }}
          >
                      <img className="rounded-full h-16  w-16 object-cover border-4 border-specclr" src={story.img} alt="" />
                      <span className="ml-2 text-sm text-black">hhhhhh</span>

          
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stories;
