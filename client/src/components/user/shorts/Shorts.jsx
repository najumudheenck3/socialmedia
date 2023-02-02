import React from 'react'

import { Reels } from '@sayings/react-reels'
import '@sayings/react-reels/dist/index.css'

const Shorts = () => {
    // type ReelsType = [{
    //     id: number; // unique identifier
    //     reelInfo: {
    //         url: string; // Video url
    //         type: string; // Type of the video
    //         description?: string; // Description of the video
    //         postedBy?: {
    //             avatar: string; // Image Url of Avatar 
    //             name: string; // Name of the uploader
    //         };
    //         likes?: {
    //             count: number; // number of likes
    //         };
    //         dislikes?: {
    //             count: number; // number of dislikes
    //         };;
    //         comments?: {
    //             count: number; // number of comments
    //         };
    //         shares?: {
    //             count: number; // number of shares
    //         }; 
    //     }
    //     rightMenu?: { // Right Three dot menu
    //         options: Array<{ // each option
    //             id: number; // unique identifier
    //             label: string; // display label
    //             value: string; // actual value
    //         }>
    //     };
    //     bottomSection?: { // If Custom Component is used for Avatar, description etc instead of default
    //         component: JSX.Element; // Any HTML or JSX Element
    //     };
    // }]

    let reels=[{
        id:1,
        reelInfo:{
            url:"https://youtube.com/shorts/6XmVSaWalJA?feature=share"
        }
    }]
  return (
    <Reels
      reels={reels}
    //   reelMetaInfo={reelMetaInfo}
      onMenuItemClicked={(event) => {
          console.log(event.value) 
          // other actions
      }}
      onLikeClicked={(reel) => {
          console.log(reel) // current Reel Data
          // other actions
      }}
      onDislikeClicked={(reel) => console.log(reel)}
      onCommentClicked={(reel) => console.log(reel)}
      onShareClicked={(reel) => console.log(reel)}
      onAvatarClicked={(reel) => console.log(reel)}
    />
  )
}

export default Shorts;