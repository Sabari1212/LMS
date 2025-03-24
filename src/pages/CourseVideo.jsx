import React, { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemIcon } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DescriptionIcon from "@mui/icons-material/Description";
import course from '../assets/course.jpg'
import { useSelector } from "react-redux";
import { Getvideodata } from "../SpringCourse";
import { Getlocalstorage } from "../localStroage";
const CourseVideo = () => {
  const users = useSelector((state) => state.userInfo.users)
  const [Allvideodata,setAllvideodata]=useState([]);
  console.log(users)
   useEffect(() => {
       getrallcour()
     }, [])

 async function getrallcour(){
    

      var tocken= Getlocalstorage()
      var Core_name=users[0].course_name;
      var toc_and_videone={tocken,Core_name}
    
     var getdatavideo=await Getvideodata(toc_and_videone);
     setAllvideodata(getdatavideo.data)
     console.log(getdatavideo.data)
  }
  
 
    const modules = [
        {
          id: 1,
          name: "Introduction",
          lectures: [
            { title:  "Join Our Online Classroom!", duration: "05:57", type: "document" },
            { title: "Join Our Online Classroom!", duration: "04:01", type: "video" },
            { title: "Exercise: Meet Your Classmates & Instructor", duration: "01:47", type: "document" },
            { title: "ZTM Resources", duration: "04:23", type: "document" },
          ],
        },
        {
          id: 2,
          name: "Python Introduction",
          lectures: [
            { title: "What is Python?", duration: "10:30", type: "video" },
            { title: "Setting up Python Environment", duration: "08:45", type: "video" },
          ],
        },
        {
          id: 3,
          name: "Python Basics",
          lectures: [
            { title: "Variables and Data Types", duration: "12:30", type: "video" },
            { title: "Control Flow", duration: "15:10", type: "video" },
            { title: "Functions in Python", duration: "20:45", type: "video" },
          ],
        },
      ];
  return (
    <div className='lg:flex justify-around'>

        <div >
            <img className='h-[400px] w-[800px]' src={course}></img>

        </div>
        <div>

    <div style={{ width: "600px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "left", fontWeight: "bold", marginBottom: "10px" }}>{users[0].course_name}</h2>
      {modules.map((module) => (
        <Accordion key={module.id} sx={{ backgroundColor: "#f9f9f9", boxShadow: "none", borderBottom: "1px solid #ddd" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: "bold", backgroundColor: "#fff" }}>
            <Typography variant="h6">{module.name}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "10px 20px", backgroundColor: "#f9f9f9" }}>
            <List>
              {module.lectures.map((lecture, index) => (
                <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                  <div style={{ display: "flex", alignItems: "center" }} onClick={()=>alert("HEllo")} className="hover:cursor-pointer">
                    <ListItemIcon sx={{ minWidth: "30px", color: "#555" }} >
                      {lecture.type === "video" ? <VideoLibraryIcon /> : <DescriptionIcon />}
                    </ListItemIcon>
                    <Typography >{lecture.title}</Typography>
                  </div>
                  <Typography variant="body2" sx={{ color: "#666" }}>{lecture.duration}</Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>

        </div>
    </div>
  )
}

export default CourseVideo