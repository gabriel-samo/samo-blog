import React from "react";
import ReactQuill from "react-quill";
import {
  Button,
  FileInput,
  FloatingLabel,
  Select,
  TextInput
} from "flowbite-react";

function CreatePost() {
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
          <FileInput typeof="file" className="" />
          <Button outline gradientDuoTone="purpleToPink">
            Upload image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12 dark:text-white"
        />
        <Button gradientDuoTone="purpleToBlue">Publish</Button>
      </form>
    </div>
  );
}

export default CreatePost;
