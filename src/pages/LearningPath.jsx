import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const LearningPath = ({ courseId, userId }) => {
  const [courseData, setCourseData] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [expandedModules, setExpandedModules] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [progress, setProgress] = useState(null);
  const [certificateAvailable, setCertificateAvailable] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`http://localhost:8080/api/courses/2`);
      setCourseData(res.data);
      console.log(res.data);
    };
    const fetchProgress = async () => {
      const res = await axios.get(`http://localhost:8080/api/progress/user/2`);
      setProgress(res.data);
      console.log(res.data);
    };
    fetchCourse();
    fetchProgress();
  }, [courseId, userId]);

  useEffect(() => {
    if (progress?.percentage === 100) setCertificateAvailable(true);
  }, [progress]);

  const toggleModule = (index) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const currentModule = courseData?.modules[currentModuleIndex];
  const currentVideo = currentModule?.videos[currentVideoIndex];

  const markVideoComplete = async () => {
    if (!currentVideo) return;
    await axios.put(`http://localhost:8080/api/videos/${currentVideo.id}/completion?completed=true`);

    const updatedCompleted = new Set(progress?.completedVideos || []);
    updatedCompleted.add(currentVideo.id);

    const totalVideos = courseData.modules.reduce((sum, m) => sum + m.videos.length, 0);
    const percentage = Math.floor((updatedCompleted.size / totalVideos) * 100);

    await axios.put(`http://localhost:8080/api/progress/2`, {
      courseId,
      completedVideos: Array.from(updatedCompleted),
      percentage,
      certificateAvailable: percentage === 100,
    });

    const res = await axios.get(`http://localhost:8080/api/progress/user/1`);
    setProgress(res.data);

    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < currentModule.videos.length) {
      setCurrentVideoIndex(nextIndex);
    } else {
      setShowQuiz(true);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const submitQuiz = () => {
    if (quizResult === true) return;

    const questions = currentModule.quiz.questions;
    let score = 0;
    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) score++;
    });

    const passed = score === questions.length;
    setQuizResult(passed);

    if (passed) {
      const nextModuleIndex = currentModuleIndex + 1;
      if (nextModuleIndex < courseData.modules.length) {
        setCurrentModuleIndex(nextModuleIndex);
        setCurrentVideoIndex(0);
        setShowQuiz(false);
        setQuizAnswers({});
        setQuizResult(null);
      }
    }
  };

  const handleNext = () => {
    if (currentVideoIndex + 1 < currentModule.videos.length) {
      setCurrentVideoIndex((prev) => prev + 1);
      setShowQuiz(false);
    } else if (currentModuleIndex + 1 < courseData.modules.length) {
      setCurrentModuleIndex((prev) => prev + 1);
      setCurrentVideoIndex(0);
      setShowQuiz(false);
    }
  };

  const handleBack = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prev) => prev - 1);
      setShowQuiz(false);
    } else if (currentModuleIndex > 0) {
      const prevModuleIndex = currentModuleIndex - 1;
      const prevModuleVideos = courseData.modules[prevModuleIndex].videos;
      setCurrentModuleIndex(prevModuleIndex);
      setCurrentVideoIndex(prevModuleVideos.length - 1);
      setShowQuiz(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 text-white">
      {courseData ? (
        <div className="glass p-6 rounded-3xl shadow-xl max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 drop-shadow-md">{courseData.courseName}</h1>

          <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden mb-4">
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${progress?.percentage || 0}%` }}
            />
          </div>

          <div className="flex gap-6">
            {/* LEFT: Video Display */}
            <div className="w-2/3 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVideo?.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-2"
                >
                  <h2 className="text-xl font-semibold">{currentVideo?.title}</h2>
                  <video
                    controls
                    src={currentVideo?.url}
                    className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-4">
                <button
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl"
                  onClick={handleBack}
                  disabled={currentModuleIndex === 0 && currentVideoIndex === 0}
                >
                  ⬅ Back
                </button>

                <button
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl"
                  onClick={markVideoComplete}
                >
                  ✅ Mark as Complete
                </button>

                <button
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl"
                  onClick={handleNext}
                  disabled={
                    currentModuleIndex === courseData.modules.length - 1 &&
                    currentVideoIndex === currentModule.videos.length - 1
                  }
                >
                  Next ➡
                </button>
              </div>
            </div>

            {/* RIGHT: Sidebar */}
            <div className="w-1/3 space-y-3 overflow-y-auto max-h-[500px] scroll-container">
              {courseData.modules.map((module, mIndex) => {
                const isExpanded = expandedModules.includes(mIndex);
                return (
                  <div
                    key={module.id}
                    className="glass p-4 rounded-2xl transition-all duration-300 bg-opacity-30"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="font-semibold text-lg">{module.title}</h2>
                      <button
                        className="bg-white/10 hover:bg-white/20 rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => toggleModule(mIndex)}
                      >
                        {isExpanded ? "−" : "+"}
                      </button>
                    </div>
                    {isExpanded && (
                      <div className="space-y-1">
                        {module.videos.map((video, vIndex) => (
                          <div
                            key={video.id}
                            className={`cursor-pointer px-2 py-1 rounded-xl flex justify-between items-center ${
                              mIndex === currentModuleIndex && vIndex === currentVideoIndex
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                            }`}
                            onClick={() => {
                              setCurrentModuleIndex(mIndex);
                              setCurrentVideoIndex(vIndex);
                              setShowQuiz(false);
                              setQuizResult(null);
                            }}
                          >
                            <span>{video.title}</span>
                            {progress?.completedVideos?.includes(video.id) && (
                              <span className="text-green-400 ml-2">✅</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quiz Section */}
          {showQuiz && (
            <div className="mt-6 glass p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">{currentModule.quiz.title}</h2>
              {currentModule.quiz.questions.map((q) => (
                <div key={q.id} className="mb-4">
                  <p className="font-semibold">{q.question}</p>
                  {["A", "B", "C", "D"].map((opt, idx) => (
                    <label key={opt} className="block mt-1">
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value={idx.toString()}
                        checked={quizAnswers[q.id] === idx.toString()}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        className="mr-2"
                      />
                      {q[`option${opt}`]}
                    </label>
                  ))}
                </div>
              ))}
              <button
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl mt-2"
                onClick={submitQuiz}
              >
                Submit Quiz
              </button>

              {quizResult === false && (
                <div className="mt-3">
                  <p className="text-red-400">Incorrect! Try again.</p>
                  <button
                    className="mt-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-1 rounded-xl"
                    onClick={() => {
                      setQuizResult(null);
                      setQuizAnswers({});
                    }}
                  >
                    Retry Quiz
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Certificate */}
          {certificateAvailable && (
            <a
              href={`data:text/plain;charset=utf-8,Certificate for ${courseData.courseName}`}
              download="certificate.txt"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
            >
              🎓 Download Certificate
            </a>
          )}
        </div>
      ) : (
        <p className="text-center text-lg">Loading course...</p>
      )}
    </div>
  );
};

export default LearningPath;
