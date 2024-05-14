import Link from "next/link";
import Image from "next/image";
import getFireBaseImage from "@/lib/getFireBaseImage";
import { useEffect, useState } from "react";

export default function Pal({ pal }) {
     const [imageURL, setImageURL] = useState("");
     const [imageName, setImageName] = useState("");
     // const imagePath = `${pal.image.split("/public")[1]}`;
     const palDetailPath = `/paldex/${pal.id}`;

     useEffect(() => {
          setImageName(pal.image.split("/paldeck/")[1]);
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
          <Link href={palDetailPath}>
               <div className="pal" key={pal.id}>
                    <div className="pal-image">
                         <Image
                              src={imageURL}
                              alt={pal.name}
                              width={40}
                              height={40}
                         />
                    </div>
                    <div>
                         <h3 className="mb-1">{pal.name}</h3>
                         <ul className="pal-types">
                              {pal.types.map((type, index) => (
                                   <li key={index + pal.id + type}>
                                        <Image
                                             src={
                                                  type.image.split("/public")[1]
                                             }
                                             height={20}
                                             width={20}
                                             alt={type.name}
                                        />
                                   </li>
                              ))}
                         </ul>
                    </div>
               </div>
          </Link>
     );
}
