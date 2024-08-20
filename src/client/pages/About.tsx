import React from "react";
import myPicture from "../assets/GabrielSamo.jpg";

function About() {
  return (
    <div className="bg-white dark:bg-gray-900 felx felx-col md:flex-row items-center justify-center p-16 h-full">
      <h1 className="text-4xl font-bold text-center">About Me</h1>
      <hr className="bg-gray-800 dark:bg-gray-200 my-4 p-0" />
      <div className="flex flex-col md:flex-row gap-10">
        {/* right */}
        <div className="basis-1/2">
          <p className="text-center text-3xl">
            <i>
              "Any fool can write code that a computer can understand. Good
              programmers write code that humans can understand."
            </i>
          </p>
        </div>
        {/* left */}
        <div className="basis-1/2">
          <p>
            This project is a full stack project following MERN stack
            principles.
            <br />
            For the frontend, I used React with TypeScript, Flowbite React, and
            Tailwind CSS.
            <br />
            For the backend, I used Node.js with Express.js with TypeScript.
            <br />
            For the database, I used MongoDB.
          </p>
          <br />
          <p>
            A little about me, My name is Gabriel Samoylov an aspiring FullStack
            Web Developer. I am a creative problem solver and I enjoy working
            with complex coding challenges. I have a passion for developing
            high-quality software. I learn quickly and adapt to new
            technologies. I also have excellent communication and organizational
            skills, which help me to collaborate effectively with other team
            members.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
        {/* right */}
        <div className="basis-1/2 flex justify-end">
          <img
            src={myPicture}
            alt="My Picture, Gabriel Samoylov"
            className="rounded-full w-48 h-48"
          />
        </div>
        {/* left */}
        <div className="flex flex-col justify-center border-l-2 pl-2 basis-1/2">
          <div>Gabriel Samoylov</div>
          <div>Fullstack Web Developer</div>
          <a href="https://github.com/gabriel-samo">Github Link</a>
        </div>
      </div>
    </div>
  );
}

export default About;
