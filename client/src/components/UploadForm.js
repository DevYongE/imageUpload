/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./UploadForm.css";
import ProgressBar from "./ProgressBar.js";


const UploadForm = ()=>{
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("이미지 파일을 업로드 해주세요");
    const [percent, setPercent] = useState(0);
    const defaultFileName = "이미지를 업로드 하세요!";
    const [imgSrc, setImgSrc]= useState(null);

    const imageSelectHandler=(event) => {
        const imageFile = event.target.files[0];
        setFile(imageFile);
        setFileName(imageFile.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.onload = (e)=>{
            setImgSrc(e.target.result)
        }
        // console.log({event})
    };
    const onSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios.post("/upload", formData,{
                headers:{"Content-Type":"multipart/form-data"},
                onUploadProgress:(e)=>{
                    setPercent(Math.round(100*e.loaded)/e.total);
                }
                
            });
            toast.success("이미지 업로드 성공");
            setTimeout (()=>{
                setPercent(0);
                setFileName(defaultFileName);
                setImgSrc(null);
            }, 3000)
        } catch (err) {
            toast.error(err.message);
            setPercent(0);
            setFileName(defaultFileName);
            setImgSrc(null);
            console.log({err});
        }
    };

    return (
    <form onSubmit={onSubmit}>
        <img src={imgSrc} className={`image-preView ${imgSrc && "image-preView-show"}`}   />
        <ProgressBar percent = {percent}/>
        <div className="file-dropper">
           {fileName}
        <input 
            id="image" 
            type="file" 
            accept="image/*"
            onChange={imageSelectHandler}
        />
        </div>
        
        <button type="submit" style={{width:"100%", height:40, borderRadius:3, cursor:"pointer"}}>제출</button>
   </form>
   );
};
//
export default UploadForm; 