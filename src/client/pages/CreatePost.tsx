import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import { fireBaseApp } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import moment from "moment";

function CreatePost() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(
    null
  );
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ image?: string }>({});

  const handleImageUpload = async () => {
    try {
      if (!imageFile) {
        console.error("No image file was selected");
        setImageUploadError("No image file was selected");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(fireBaseApp);
      const fileName =
        moment().format("DD_MM_YYYY_HH_mm_ss") + "-" + imageFile.name;
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(+progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: url });
          });
        }
      );
    } catch (error: any) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.error(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            className="flex-1"
            type="text"
            placeholder="Title"
            required
            id="title"
          />
          {/* <div className="grid grid-cols-1 sm:grid-flow-col gap-2">
          <FloatingLabel variant="outlined" label="Title" required id="title" /> */}
          <Select>
            <option value="none">-- Select a category --</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="reactjs">React.js</option>
            <option value="nodejs">Node.js</option>
          </Select>
        </div>
        <div className="border-4 border-dotted p-3 border-teal-500 flex flex-row justify-between gap-4 items-center">
          <FileInput
            typeof="file"
            className=""
            onChange={(e) => setImageFile(e.target.files![0])}
          />
          <Button
            outline
            gradientDuoTone="purpleToPink"
            onClick={handleImageUpload}
            disabled={imageUploadProgress !== null}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded image"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          className="h-72 mb-12"
          placeholder="Write Something..."
        />
        <Button gradientDuoTone="purpleToBlue">Publish</Button>
      </form>
    </div>
  );
}

export default CreatePost;
