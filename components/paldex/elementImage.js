import getFireBaseImage from "@/lib/getFireBaseImage";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ElementImage({ element, height, width }) {
     const [imageURL, setImageURL] = useState("");
     const [imageName, setImageName] = useState("");

     useEffect(() => {
          setImageName(element.imageName);
     }, [element]);

     useEffect(() => {
          async function fetchImage() {
               if (imageName) {
                    const url = await getFireBaseImage(imageName, "elements");
                    setImageURL(url);
               }
          }

          if (imageName) {
               fetchImage();
          }
     }, [imageName]);

     return <Image src={imageURL} height={height} width={width} />;
}
