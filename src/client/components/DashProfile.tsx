import moment from "moment";
import { fireBaseApp } from "../firebase";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CircularProgressbar } from "react-circular-progressbar";
import { Alert, Button, FloatingLabel, Modal, Spinner } from "flowbite-react";
import React, {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import { makeRequest } from "../utils/makeRequest";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess
} from "../redux/slices/userSlice";

type formInputs = {
  username: string;
  password: string;
  email: string;
};

function DashProfile() {
  const { currentUser, errorMsg, loading } = useAppSelector(
    (state) => state.user
  );
  const [imageFile, setImageFile] = useState<null | File>(null);
  const [imageFileURL, setImageFileURL] = useState<null | string>(null);
  const [uploadProgress, setUploadProgress] = useState<null | number>(null);
  const [uploadError, setUploadError] = useState<null | string>(null);
  const [updatedFields, setUpdatedFields] = useState<{} | formInputs>({});
  const [userUpdated, setUserUpdated] = useState<null | string>(null);
  const [showModel, setShowModel] = useState<boolean>(false);

  const filePickerRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedFields({
      ...updatedFields,
      [event.target.id]: event.target.value
    });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    imageFile && uploadImage();
  }, [imageFile]);

  const uploadImage = async () => {
    setUploadError(null);
    if (imageFile) {
      const storage = getStorage(fireBaseApp);
      const fileName = `${moment(new Date()).format("DDMMYYHHmmss")}-${
        imageFile.name
      }`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(+progress.toFixed(0));
        },
        (error) => {
          console.log(error);
          setUploadError(
            "Could not upload image (File must be less than 2MB and an image)"
          );
          setImageFile(null);
          setImageFileURL(null);
          setUploadProgress(null);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageFileURL(downloadURL);
          setUpdatedFields({ ...updatedFields, profilePicture: downloadURL });
        }
      );
    }
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserUpdated(null);
    if (Object.keys(updatedFields).length === 0) {
      dispatch(updateUserFailure("No changes was made"));
      return;
    }
    dispatch(updateUserStart());
    try {
      const result = await makeRequest.put(
        `/api/user/update/${currentUser?._id}`,
        updatedFields
      );
      if (result.status === 200) {
        console.log(result.data);
        dispatch(updateUserSuccess(result.data));
        setUserUpdated("User was updated successfully!");
        setUpdatedFields({});
      } else {
        dispatch(updateUserFailure(result.data.message));
      }
    } catch (error: any) {
      console.log(error);
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await makeRequest.delete(
        `api/user/delete/${currentUser?._id}`
      );
      if (res.status !== 200) {
        dispatch(deleteUserFailure(res.data.message));
      } else {
        dispatch(deleteUserSuccess(res.data));
      }
    } catch (error: any) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current?.click()}
        >
          {uploadProgress !== null && (
            <CircularProgressbar
              value={uploadProgress}
              text={`${uploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0
                },
                path: {
                  stroke: `rgba(62,152,199,${uploadProgress / 100})`
                }
              }}
            />
          )}
          <img
            src={imageFileURL || currentUser?.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              uploadProgress && uploadProgress < 100 && "opacity-60"
            }`}
          />
        </div>
        {uploadError && <Alert color="failure">{uploadError}</Alert>}
        <FloatingLabel
          type="text"
          id="username"
          label="Username"
          variant="filled"
          defaultValue={currentUser?.username}
          onChange={handleInputChange}
        />
        <FloatingLabel
          type="email"
          id="email"
          label="Email"
          variant="filled"
          defaultValue={currentUser?.email}
          onChange={handleInputChange}
        />
        <FloatingLabel
          type="password"
          id="password"
          label="Password"
          variant="filled"
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          className="w-full"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || uploadProgress ? true : false}
        >
          {loading || uploadProgress ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
      <div className="text-red-500 mt-5 flex justify-between">
        <span className="cursor-pointer" onClick={() => setShowModel(true)}>
          Delete User
        </span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {userUpdated && (
        <Alert className="mt-5" color="success">
          {userUpdated}
        </Alert>
      )}
      {errorMsg && (
        <Alert className="mt-5" color="failure">
          {errorMsg}
        </Alert>
      )}
      {showModel && (
        <Modal
          show={showModel}
          onClose={() => setShowModel(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteUser}>
                  Yes I'm Sure
                </Button>
                <Button color="gray" onClick={() => setShowModel(false)}>
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default DashProfile;
