import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Getlocalstorage } from '../localStroage';
import { Getvideodata } from '../SpringCourse';
const ExCourseVideo = () => {

  const users = useSelector((state) => state.userInfo.users)
  const [course, setCourse] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [videoDurations, setVideoDurations] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [certificateUnlocked, setCertificateUnlocked] = useState(false);

  useEffect(() => {
    getonevideo()
  }, []);

  async function getonevideo(){
    console.log(users)

    var tocken = Getlocalstorage();
    var Core_name = users
    var toc_and_videone = { tocken, Core_name }

    var getdatavideo =await Getvideodata(toc_and_videone);
    // setAllvideodata(getdatavideo.data)
    console.log(getdatavideo.data)
    setCourse(getdatavideo .data);
  }




  useEffect(() => {
    if (course) {
      const allVideos = course.modual.flatMap((mod) => mod.videos);
      const total = allVideos.length;
      const completed = completedVideos.length;
      const percentage = Math.round((completed / total) * 100);
      if (percentage === 100) {
        setCertificateUnlocked(true);
      }
    }
  }, [completedVideos, course]);

  const handleVideoEnded = () => {
    const currentVideo = course.modual[currentModuleIndex].videos[currentVideoIndex];
    if (!completedVideos.includes(currentVideo.id)) {
      setCompletedVideos((prev) => [...prev, currentVideo.id]);
    }
    const currentModule = course.modual[currentModuleIndex];
    const allCompleted = currentModule.videos.every((vid) => completedVideos.includes(vid.id) || vid.id === currentVideo.id);
    if (allCompleted) setShowQuiz(true);
  };

  const handleAnswer = (qid, option) => {
    setSelectedAnswers({ ...selectedAnswers, [qid]: option });
  };

  const submitQuiz = () => {
    const questions = course.modual[currentModuleIndex].qush;
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q[`option${q.anser}`]) {
        correct++;
      }
    });
    setQuizResult(`${correct}/${questions.length} correct`);
  };

  const goToVideo = (mIndex, vIndex) => {
    setCurrentModuleIndex(mIndex);
    setCurrentVideoIndex(vIndex);
    setShowQuiz(false);
    setSelectedAnswers({});
    setQuizResult(null);
  };

  const isVideoLocked = (mIndex, vIndex) => {
    const prev = course.modual[mIndex].videos[vIndex - 1];
    if (vIndex === 0 && mIndex === 0) return false;
    if (vIndex > 0) return !completedVideos.includes(prev.id);
    const prevMod = course.modual[mIndex - 1];
    return !prevMod.videos.every((v) => completedVideos.includes(v.id));
  };

  const fetchVideoDuration = (url, id) => {
    const video = document.createElement('video');
    video.src = url;
    video.addEventListener('loadedmetadata', () => {
      const duration = Math.floor(video.duration);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      setVideoDurations((prev) => ({ ...prev, [id]: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}` }));
    });
  };

  useEffect(() => {
    if (course) {
      course.modual.forEach((mod) => {
        mod.videos.forEach((v) => {
          if (!videoDurations[v.id]) fetchVideoDuration(v.videourl, v.id);
        });
      });
    }
  }, [course]);

  if (!course) return <div className="text-center p-4">Loading...</div>;

  const currentVideo = course.modual[currentModuleIndex].videos[currentVideoIndex];

  return (
    <div className="flex h-screen">
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-semibold mb-2">{currentVideo.videoname}</h2>
        <video
          key={currentVideo.id}
          src={currentVideo.videourl}
          controls
          onEnded={handleVideoEnded}
          className="w-full h-[400px] rounded-xl shadow-lg"
        ></video>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => goToVideo(currentModuleIndex, currentVideoIndex - 1)}
            disabled={currentVideoIndex === 0 && currentModuleIndex === 0}
            className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() => goToVideo(currentModuleIndex, currentVideoIndex + 1)}
            disabled={
              currentVideoIndex === course.modual[currentModuleIndex].videos.length - 1 ||
              isVideoLocked(currentModuleIndex, currentVideoIndex + 1)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {showQuiz && (
          <div className="mt-6 bg-white bg-opacity-10 p-4 rounded-xl shadow-xl">
            <h3 className="text-lg font-bold mb-2">Module Quiz</h3>
            {course.modual[currentModuleIndex].qush.map((q) => (
              <div key={q.id} className="mb-4">
                <p className="mb-1 font-medium">{q.question}</p>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <label key={num} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={q[`option${num}`]}
                        onChange={() => handleAnswer(q.id, q[`option${num}`])}
                      />
                      <span>{q[`option${num}`]}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={submitQuiz} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Submit Quiz</button>
            {quizResult && <p className="mt-2 font-semibold">Result: {quizResult}</p>}
          </div>
        )}

        {certificateUnlocked && (
          <a
            href="data:text/plain;charset=utf-8,You%20have%20completed%20the%20course!"
            download="certificate.txt"
            className="block mt-6 text-center bg-purple-600 text-white py-2 px-4 rounded shadow-lg"
          >
            🎓 Download Certificate
          </a>
        )}
      </div>

      <div className="w-1/4 border-l p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">{course.coursename.toUpperCase()}</h2>
        <div className="mb-2 h-2 bg-gray-300 rounded">
          <div
            className="h-full bg-green-500 rounded"
            style={{ width: `${Math.round((completedVideos.length / course.modual.flatMap(m => m.videos).length) * 100)}%` }}
          ></div>
        </div>
        {course.modual.map((mod, mIndex) => (
          <div key={mod.id} className="mb-4">
            <h3 className="text-md font-semibold">{mod.modeulname}</h3>
            <ul className="ml-4 mt-2 space-y-1">
              {mod.videos.map((vid, vIndex) => (
                <li
                  key={vid.id}
                  onClick={() => {
                    if (!isVideoLocked(mIndex, vIndex)) goToVideo(mIndex, vIndex);
                  }}
                  className={`cursor-pointer px-2 py-1 rounded flex justify-between items-center ${
                    currentVideo.id === vid.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  } ${isVideoLocked(mIndex, vIndex) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span>{vid.videoname}</span>
                  <span className="text-sm text-gray-600">{videoDurations[vid.id]}</span>
                  {completedVideos.includes(vid.id) && <span className="ml-2">✅</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExCourseVideo;
