import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";


export default function TestPage() {
  const [image, setImage] = useState(null);

  function fileUpload() {
    mediaUpload(image).then(
        (res)=>{
            console.log(res)

        } 
    ).catch(
        (res)=>{
            console.log(res)
        }
    )
    //const url = await MediaUpload(image);
  }
  return (
    <div className="w-full h-screen  flex flex-col justify-center items-center">
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={(e) => {
          setImage(e.target.files[0]);
          
        }}
      />
      <button
        onClick={fileUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Upload
      </button>
    </div>
  );
}
