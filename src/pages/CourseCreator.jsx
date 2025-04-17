import React, { useState } from "react";
import axios from "axios";

const CourseCreator = () => {
  const [courseName, setCourseName] = useState("");
  const [modules, setModules] = useState([
    {
      modeulname: "",
      videos: [{ videoname: "", videourl: "" }],
      qush: [{ question: "", option1: "", option2: "", option3: "", option4: "", anser: 1 }],
    },
  ]);

  const handleAddModule = () => {
    setModules([
      ...modules,
      {
        modeulname: "",
        videos: [{ videoname: "", videourl: "" }],
        qush: [{ question: "", option1: "", option2: "", option3: "", option4: "", anser: 1 }],
      },
    ]);
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index][field] = value;
    setModules(updatedModules);
  };

  const handleVideoChange = (moduleIndex, videoIndex, field, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videos[videoIndex][field] = value;
    setModules(updatedModules);
  };

  const handleAddVideo = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videos.push({ videoname: "", videourl: "" });
    setModules(updatedModules);
  };

  const handleQuizChange = (moduleIndex, quizIndex, field, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].qush[quizIndex][field] = value;
    setModules(updatedModules);
  };

  const handleAddQuiz = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].qush.push({ question: "", option1: "", option2: "", option3: "", option4: "", anser: 1 });
    setModules(updatedModules);
  };

  const handleSubmit = async () => {
    const payload = {
      id: 0,
      coursename: courseName,
      modual: modules.map((m) => ({
        id: 0,
        ...m,
        videos: m.videos.map((v) => ({ id: 0, ...v })),
        qush: m.qush.map((q) => ({ id: 0, ...q })),
      })),
    };

    try {
      await axios.post("http://localhost:8080/api/authors", payload);
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error submitting course:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Create a New Course</h1>
      <input
        type="text"
        placeholder="Course Name"
        className="w-full p-2 mb-6 rounded border dark:bg-gray-800"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />

      {modules.map((module, moduleIndex) => (
        <div key={moduleIndex} className="border p-4 mb-6 rounded bg-gray-50 dark:bg-gray-800">
          <input
            type="text"
            placeholder="Module Name"
            className="w-full p-2 mb-4 rounded border dark:bg-gray-700"
            value={module.modeulname}
            onChange={(e) => handleModuleChange(moduleIndex, "modeulname", e.target.value)}
          />

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Videos</h2>
            {module.videos.map((video, videoIndex) => (
              <div key={videoIndex} className="flex flex-col md:flex-row gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Video Name"
                  className="p-2 rounded border w-full dark:bg-gray-700"
                  value={video.videoname}
                  onChange={(e) => handleVideoChange(moduleIndex, videoIndex, "videoname", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Video URL"
                  className="p-2 rounded border w-full dark:bg-gray-700"
                  value={video.videourl}
                  onChange={(e) => handleVideoChange(moduleIndex, videoIndex, "videourl", e.target.value)}
                />
              </div>
            ))}
            <button onClick={() => handleAddVideo(moduleIndex)} className="text-sm text-blue-600 mt-2">
              + Add Video
            </button>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Quiz Questions</h2>
            {module.qush.map((quiz, quizIndex) => (
              <div key={quizIndex} className="mb-4 p-2 border rounded bg-gray-100 dark:bg-gray-700">
                <input
                  type="text"
                  placeholder="Question"
                  className="w-full p-2 mb-2 rounded border dark:bg-gray-800"
                  value={quiz.question}
                  onChange={(e) => handleQuizChange(moduleIndex, quizIndex, "question", e.target.value)}
                />
                {[1, 2, 3, 4].map((num) => (
                  <input
                    key={num}
                    type="text"
                    placeholder={`Option ${num}`}
                    className="w-full p-2 mb-2 rounded border dark:bg-gray-800"
                    value={quiz[`option${num}`]}
                    onChange={(e) => handleQuizChange(moduleIndex, quizIndex, `option${num}`, e.target.value)}
                  />
                ))}
                <input
                  type="number"
                  min="1"
                  max="4"
                  placeholder="Correct Answer (1-4)"
                  className="w-full p-2 mb-2 rounded border dark:bg-gray-800"
                  value={quiz.anser}
                  onChange={(e) => handleQuizChange(moduleIndex, quizIndex, "anser", parseInt(e.target.value))}
                />
              </div>
            ))}
            <button onClick={() => handleAddQuiz(moduleIndex)} className="text-sm text-green-600">
              + Add Quiz Question
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddModule}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-4"
      >
        + Add Module
      </button>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Submit Course
      </button>
    </div>
  );
};

export default CourseCreator;
