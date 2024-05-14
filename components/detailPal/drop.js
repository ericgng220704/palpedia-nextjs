import { useEffect, useState } from "react";
import getFireBaseImage from "@/lib/getFireBaseImage";
import Image from "next/image";
import Link from "next/link";

export default function Drop({ drop }) {
     const [imageURL, setImageURL] = useState("");
     const [imageName, setImageName] = useState("");
     // const imagePath = `${pal.image.split("/public")[1]}`;
     const dropName = drop.replaceAll("_", " ");
     const dropItemName = drop.replaceAll("_", "-");

     useEffect(() => {
          setImageName(`${dropItemName}.png`);
     }, [drop, dropItemName]);

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
          <li className="bg-black p-4">
               <Link href="#">
                    <div className="flex justify-between">
                         <Image src={imageURL} height={30} width={30} alt="" />
                         <span>{dropName}</span>
                    </div>
               </Link>
          </li>
     );
}
