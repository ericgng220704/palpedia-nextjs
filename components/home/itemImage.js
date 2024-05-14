import getFireBaseImage from "@/lib/getFireBaseImage";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ItemImage({ item, height, width }) {
     const [imageURL, setImageURL] = useState("");
     const [imageName, setImageName] = useState("");

     useEffect(() => {
          setImageName(`${item.image.split("/items/")[1]}`);
     }, [item]);

     useEffect(() => {
          async function fetchImage() {
               if (imageName) {
                    const url = await getFireBaseImage(imageName, "items");
                    setImageURL(url);
               }
          }

          if (imageName) {
               fetchImage();
          }
     }, [imageName]);

     return (
          <Image
               className="rounded-ful"
               src={imageURL}
               height={height}
               width={width}
          />
     );
}
