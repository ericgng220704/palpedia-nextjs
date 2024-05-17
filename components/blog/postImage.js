import getFireBaseImage from "@/lib/getFireBaseImage";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PostImage({ postName, height, width }) {
     const [imageURL, setImageURL] = useState("");
     const [imageName, setImageName] = useState("");

     useEffect(() => {
          setImageName(`${postName}`);
     }, [postName]);

     useEffect(() => {
          async function fetchImage() {
               if (imageName) {
                    const url = await getFireBaseImage(imageName, "blogs");
                    setImageURL(url);
               }
          }

          if (imageName) {
               fetchImage();
          }
     }, [imageName]);

     return (
          <Image
               className="rounded-3xl"
               src={imageURL}
               height={height}
               width={width}
          />
     );
}
