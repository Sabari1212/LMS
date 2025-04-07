import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export default function CourseCreator() {
  const [courseName, setCourseName] = useState("");
  const [modules, setModules] = useState([]);

  const addModule = () => {
    setModules([
      ...modules,
      { title: "", videos: [{ title: "", url: "" }], quiz: { questions: [] } }
    ]);
    console.log(modules)
  };

  const updateModule = (index, field, value) => {
    const updated = [...modules];
    updated[index][field] = value;
    setModules(updated);
  };

  const addVideo = (modIndex) => {
    const updated = [...modules];
    updated[modIndex].videos.push({ title: "", url: "" });
    setModules(updated);
  };

  const updateVideo = (modIndex, vidIndex, field, value) => {
    const updated = [...modules];
    updated[modIndex].videos[vidIndex][field] = value;
    setModules(updated);
  };

  const addQuestion = (modIndex) => {
    const updated = [...modules];
    updated[modIndex].quiz.questions.push({
      question: "",
      options: ["", "", "", ""],
      answerIndex: 0
    });
    setModules(updated);
  };

  const updateQuestion = (modIndex, qIndex, field, value) => {
    const updated = [...modules];
    if (field === "options") {
      updated[modIndex].quiz.questions[qIndex].options = value;
    } else {
      updated[modIndex].quiz.questions[qIndex][field] = value;
    }
    setModules(updated);
  };

  const handleSubmit = async () => {
    const course = {
      courseName,
      modules,
      overallQuiz: { questions: [], passed: false },
      progress: {
        videosWatched: 0,
        totalVideos: modules.reduce((sum, m) => sum + m.videos.length, 0),
        percentage: 0,
        certificateAvailable: false
      }
    };                     
    //       /public/courses
    await axios.post(`${API_BASE}/public/courses`, course);
    alert("Course created!");
    setCourseName("");
    setModules([]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white bg-gray-900 rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>

      <input
        className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />

      {modules.map((mod, modIndex) => (
        <div key={modIndex} className="mb-6 border p-4 rounded bg-gray-800">
          <input
            className="w-full mb-2 p-2 bg-gray-700"
            placeholder="Module Title"
            value={mod.title}
            onChange={(e) => updateModule(modIndex, "title", e.target.value)}
          />

          <h4 className="mt-2 mb-1 font-semibold">Videos</h4>
          {mod.videos.map((vid, vidIndex) => (
            <div key={vidIndex} className="mb-2">
              <input
                className="w-full mb-1 p-1 bg-gray-700"
                placeholder="Video Title"
                value={vid.title}
                onChange={(e) =>
                  updateVideo(modIndex, vidIndex, "title", e.target.value)
                }
              />
              <input
                className="w-full p-1 bg-gray-700"
                placeholder="Video URL"
                value={vid.url}
                onChange={(e) =>
                  updateVideo(modIndex, vidIndex, "url", e.target.value)
                }
              />
            </div>
          ))}
          <button
            className="mt-1 text-sm text-blue-400"
            onClick={() => addVideo(modIndex)}
          >
            + Add Video
          </button>

          <h4 className="mt-4 mb-1 font-semibold">Quiz</h4>
          {mod.quiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-3">
              <input
                className="w-full mb-1 p-1 bg-gray-700"
                placeholder="Question"
                value={q.question}
                onChange={(e) =>
                  updateQuestion(modIndex, qIndex, "question", e.target.value)
                }
              />
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  className="w-full mb-1 p-1 bg-gray-600"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...q.options];
                    newOptions[i] = e.target.value;
                    updateQuestion(modIndex, qIndex, "options", newOptions);
                  }}
                />
              ))}
              <input
                type="number"
                min={0}
                max={3}
                className="w-full p-1 bg-gray-600"
                placeholder="Correct Option Index (0-3)"
                value={q.answerIndex}
                onChange={(e) =>
                  updateQuestion(modIndex, qIndex, "answerIndex", +e.target.value)
                }
              />
            </div>
          ))}
          <button
            className="text-sm text-blue-400"
            onClick={() => addQuestion(modIndex)}
          >
            + Add Question
          </button>
        </div>
      ))}

      <button
        className="px-4 py-2 bg-blue-600 rounded text-white font-semibold mr-4"
        onClick={addModule}
      >
        Add Module
      </button>
      <button
        className="px-4 py-2 bg-green-600 rounded text-white font-semibold"
        onClick={handleSubmit}
      >
        Submit Course
      </button>
    </div>
  );
}