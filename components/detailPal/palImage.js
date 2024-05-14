import getFireBaseImage from "@/lib/getFireBaseImage";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PalImage({ pal, height, width }) {
     const [imageURL, setImageURL] = useState("");
     const [imageName, setImageName] = useState("");

     useEffect(() => {
          setImageName(`${pal.key}.png`);
     }, [pal]);

     useEffect(() => {
          async function fetchImage() {
               if (imageName) {
                    const url = await getFireBaseImage(imageName, "paldeck");
                    setImageURL(url);
               }
          }

          if (imageName) {
               fetchImage();
          }
     }, [imageName]);

     return (
          <Image
               className="rounded-full bg-zinc-900 "
               src={imageURL}
               height={height}
               width={width}
          />
     );
}
