import { FIREBASE_DB } from "@/firebaseConfig";
import { GoogleSignin, SignInResponse } from "@react-native-google-signin/google-signin";
import { doc, getDoc, setDoc } from "firebase/firestore";

  export const handleGoogleSignIn = async () => {

      // check if users' device has google play services
      await GoogleSignin.hasPlayServices();
      
      // initiates signIn process
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      if (userInfo.data?.user.email) {
        // check if user already exists
        updateFirebaseUser(userInfo.data.user.id, userInfo);
      }
    }
  
  const updateFirebaseUser = async (userId: string, userInfo: SignInResponse) => {
    try {
      if(!userInfo.data?.user.email) {
        return 
      }
        const userDoc = doc(FIREBASE_DB, "users", userInfo.data.user.id);
        const userSnapshot = await getDoc(userDoc) ;
        if (userSnapshot.exists()) {
          console.log("user already exists");
        }
        else{

          await setDoc(doc(FIREBASE_DB, "users", userInfo.data.user.id), {
            email: userInfo.data.user.email,
            name: userInfo.data.user.name,
            photo: userInfo.data.user.photo,
            createdAt: new Date(),
          })
          console.log("user inserted in firebase successfully")
        }
    }
    catch(err){

    }
  }
      console.log("User data updated successfully");
    export const handleGoogleLogout = async()=>{
        try{

            await GoogleSignin.signOut()
         
        }
        catch(err){
            console.error("error logging out from google: ",err)
            throw err;
        }
    } 