import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export default function UploadImage({ onUpload }) {
     const [image, setImage] = useState(null);
     const [loading, setLoading] = useState(false);

     const handleImageChange = (e) => {
          if (e.target.files[0]) {
               setImage(e.target.files[0]);
          }
     };

     const handleUpload = async () => {
          if (image) {
               setLoading(true);
               const storageRef = ref(storage, `blogs/${image.name}`);
               try {
                    await uploadBytes(storageRef, image);
                    const url = await getDownloadURL(storageRef);
                    onUpload(url);
                    setImage(null);
               } catch (error) {
                    console.error("Error uploading image: ", error);
               } finally {
                    setLoading(false);
               }
          }
     };

     return (
          <div>
               <input type="file" onChange={handleImageChange} />
               <button onClick={handleUpload} disabled={loading}>
                    {loading ? "Uploading..." : "Upload"}
               </button>
          </div>
     );
}
