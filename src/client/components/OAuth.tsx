import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/slices/userSlice";
import { makeRequest } from "../utils/makeRequest";

function OAuth() {
  const auth = getAuth(app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await makeRequest().post("/api/auth/googleAuth", {
        name: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        googlePhotoUrl: resultFromGoogle.user.photoURL
      });

      if (res.status === 200) {
        dispatch(signInSuccess(res.data));
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="h-6 w-6 mr-2" />
      <span>Continue with Google</span>
    </Button>
  );
}

export default OAuth;
