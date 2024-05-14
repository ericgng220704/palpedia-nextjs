import { storage } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";

export default async function getFireBaseImage(imageName, folder) {
     try {
          const imageRef = ref(storage, `${folder}/${imageName}`);
          const url = await getDownloadURL(imageRef);
          return url;
     } catch (e) {
          throw e;
     }
}
