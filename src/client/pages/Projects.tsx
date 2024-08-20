import React from "react";
import CallToActions from "../components/CallToActions";

function Projects() {
  return (
    <div className="min-h-screen max-2-2xl mx-auto flex flex-col gap-6 items-center justify-center p-3">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md text-gray-500">
        Here are some of my projects. I will update this section with more
        projects as I complete them.
      </p>
      <CallToActions />
    </div>
  );
}

export default Projects;
