import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveAs } from "file-saver";
import axios from "axios";
import { IoChevronDownCircleOutline, IoChevronUpCircleOutline } from "react-icons/io5";
import ReactPlayer from 'react-player';
const API_BASE = "http://localhost:8080/api";
const USER_ID = "user1";

export default function ExCourseVideo() {
  const [course, setCourse] = useState(null);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [error, setError] = useState("");
  const [durations, setDurations] = useState({});
  const [expandedModules, setExpandedModules] = useState({});
  const videoRef = useRef(null);

  useEffect(() => {
    fetchCourse();
    fetchProgress();
  }, []);

  const fetchCourse = async () => {
    const res = await axios.get(`http://localhost:8080/api/courses/1`);
    setCourse(res.data);
    preloadDurations(res.data);
    console.log(res.data);
  };

  const fetchProgress = async () => {
    const res = await axios.get(`${API_BASE}/progress/${USER_ID}`);
    setCompleted(res.data || []);
  };

  const saveProgress = async (key) => {
    const newCompleted = [...completed, key];
    setCompleted(newCompleted);
    await axios.put(`${API_BASE}/progress`, {
      userId: USER_ID,
      videoKey: key
    });
  };

  const preloadDurations = (course) => {
    course.modules.forEach((mod, mIdx) => {
      mod.videos.forEach((vid, vIdx) => {
        const video = document.createElement("video");
        video.src = vid.url;
        video.onloadedmetadata = () => {
          const dur = video.duration;
          const min = Math.floor(dur / 60);
          const sec = Math.floor(dur % 60).toString().padStart(2, "0");
          setDurations((prev) => ({
            ...prev,
            [`${mIdx}-${vIdx}`]: `${min}:${sec}`
          }));
        };
      });
    });
  };

  const handleVideoEnd = () => {
    const key = `${currentModule}-${currentVideo}`;
    console.log(key)
    if (!completed.includes(key)) {
      saveProgress(key);
    }

    const isModuleCompleted = course.modules[currentModule].videos.every((_, idx) =>
      completed.includes(`${currentModule}-${idx}`) || idx === currentVideo
    );

    if (isModuleCompleted) setShowQuiz(true);
  };

  const handleQuizSubmit = () => {
    const questions = course.modules[currentModule].quiz;
    const allCorrect = questions.every(
      (q, idx) => quizAnswers[idx] === q.answerIndex
    );

    if (!allCorrect) {
      setError("Some answers are incorrect. Try again.");
      return;
    }

    setShowQuiz(false);
    setQuizAnswers({});
    setError("");
  };

  const downloadCertificate = () => {
    const text = `Certificate of Completion\n\nThis certifies you completed ${course.title}\n\nProgress: 100%`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "certificate.txt");
  };

  const goToVideo = (m, v) => {
    setCurrentModule(m);
    setCurrentVideo(v);
    setShowQuiz(false);
    setError("");
  };

  if (!course) return <div className="p-6 text-white">Loading...</div>;

  const total = course.modules.reduce((acc, m, i) => acc + m.videos.length, 0);
  const percent = Math.floor((completed.length / total) * 100);
  const isCourseCompleted = completed.length === total;
  const current = course.modules[currentModule].videos[currentVideo];

  return (
    <div className="p-6 max-w-6xl mx-auto text-white bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">{course.courseName}</h1>

      <div className="mb-6">
        <p className="mb-2">Progress: {percent}%</p>
        <div className="w-full h-3 bg-gray-700 rounded-full">
          <motion.div
            className="h-3 bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-2/3">
          <video
            ref={videoRef}
            controls
            onEnded={handleVideoEnd}
            className="w-full rounded-lg shadow-lg"
          >
            <source src={current.url} type="video/mp4" />
          </video>

          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-700 rounded"
              onClick={() =>
                currentVideo > 0
                  ? goToVideo(currentModule, currentVideo - 1)
                  : currentModule > 0 &&
                    goToVideo(currentModule - 1, course.modules[currentModule - 1].videos.length - 1)
              }
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-gray-700 rounded"
              onClick={() =>
                currentVideo < course.modules[currentModule].videos.length - 1
                  ? goToVideo(currentModule, currentVideo + 1)
                  : currentModule < course.modules.length - 1 && goToVideo(currentModule + 1, 0)
              }
            >
              Next
            </button>
          </div>

          <h2 className="text-xl font-semibold mt-4">{current.title}</h2>

          <AnimatePresence>
            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-gray-800 rounded shadow"
              >
                {course.modules[currentModule].quiz.map((q, i) => (
                  <div key={i} className="mb-4">
                    <p className="mb-2 font-medium">{q.question}</p>
                    {q.options.map((opt, idx) => (
                      <label key={idx} className="block">
                        <input
                          type="radio"
                          name={`quiz-${i}`}
                          value={idx}
                          checked={quizAnswers[i] === idx}
                          onChange={() => setQuizAnswers({ ...quizAnswers, [i]: idx })}
                          className="mr-2"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ))}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  onClick={handleQuizSubmit}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                >
                  Submit Quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {isCourseCompleted && (
            <motion.div
              className="mt-6 p-4 bg-green-700 rounded text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-lg font-bold mb-2">Congratulations!</h3>
              <p>You have completed the course. Download your certificate.</p>
              <button
                className="mt-3 px-4 py-2 bg-white text-green-800 font-semibold rounded"
                onClick={downloadCertificate}
              >
                Download Certificate
              </button>
            </motion.div>
          )}
        </div>

        <div className="w-1/3">
          {course.modules.map((mod, mIdx) => (
            <div key={mIdx} className="mb-4">
              <button
                className="flex items-center justify-between w-full px-4 py-2 bg-gray-800 rounded"
                onClick={() =>
                  setExpandedModules((prev) => ({ ...prev, [mIdx]: !prev[mIdx] }))
                }
              >
                <span className="font-semibold">{mod.title}</span>
                {expandedModules[mIdx] ? (
                  <IoChevronUpCircleOutline className="h-5 w-5" />
                ) : (
                  <IoChevronDownCircleOutline className="h-5 w-5" />
                )}
              </button>
              <AnimatePresence>
                {expandedModules[mIdx] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-gray-700 rounded mt-2"
                  >
                    {mod.videos.map((vid, vIdx) => {
                      const key = `${mIdx}-${vIdx}`;
                      const isCompleted = completed.includes(key);
                      return (
                        <div
                          key={vIdx}
                          className="px-4 py-2 border-b border-gray-600 flex justify-between items-center"
                        >
                          <div className="flex flex-col">
                            <span>
                              {vid.title} ({durations[key] || "0:00"})
                            </span>
                            <span className="text-sm text-gray-400">
                              {isCompleted ? "✅ Completed" : "Locked"}
                            </span>
                          </div>
                          <button
                            onClick={() => goToVideo(mIdx, vIdx)}
                            className="text-sm text-blue-300 underline"
                          >
                            {mIdx === currentModule && vIdx === currentVideo ? "Current" : "Play"}
                          </button>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
