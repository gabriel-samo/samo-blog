import { Button } from "flowbite-react";
import React from "react";

function CallToActions() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
      {/* right */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          Learn More
        </Button>
      </div>
      {/* left */}
      <div className="p-7 flex-1">
        <img
          src="https://img.freepik.com/free-vector/programmers-using-javascript-programming-language-computer-tiny-people-javascript-language-javascript-engine-js-web-development-concept_335657-2412.jpg"
          alt="javascript programming"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default CallToActions;
