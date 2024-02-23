import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/loader.gif"
import axios from 'axios';
import loader from '../assets/loader.gif'
import {Buffer} from 'buffer'

    function SetAvatar() {
    const api="https://api.multiavatar.com/12324398";
    const navigate=useNavigate();
    const [avatars,setavatars]=useState([]);
    const [isLoading,setload]=useState(true);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);
    
    const tobj={
    position:"bottom-right",
    autoclose:5000,
    pauseOnhover:true,
    draggable:true, 
    theme:"dark"
  }
  
    const setProfilePicture= async()=>{
    if(selectedAvatar=== undefined){
    toast.error("please select an avatar",tobj);
    }
    else{
      // for getting the infortmation stored in local storage 
      const user=await JSON.parse(localStorage.getItem('chatme-user-data'));
      
      // api call for setting image in backend 
      const {data}=await axios.post(`http://localhost:5000/setA/${user._id}`,{
        image:avatars[selectedAvatar],
      })
      
      // changing information in local storage  if the the backend has been updated successfully
       if(data.isSet){
        user.isAvatarSet=true;
        user.avatarImage=data.image;
        localStorage.setItem('chatme-user-data',JSON.stringify(user));
        navigate('/');
      }
      else toast.error("Error setting avatar, please try again",tobj);
    }
  };

     useEffect(async ()=>{
     if(!localStorage.getItem('user-data'))
     navigate('/login');
    const data=[];    
    for(let i=0;i<4;i++){
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer =new Buffer(image.data);
        data.push(buffer.toString("base64"));
    }
    setavatars(data);
    setload(false);
  },[]);
    return (
    <>   
    <Container>
    <div className="title-container">
    <h1>pick an avatar as your profile picture</h1>
    </div>
    <div className="avatars">
    {avatars.map((avatar,index)=>{
     return (
          
    <div
    key={index}
    className={`avatar ${
    selectedAvatar===index?"selected": " "
    }`}>
    <img 
    src={`data:image/svg+xml;base64,${avatar}`}
    alt ="avatar"
    onClick={()=>setSelectedAvatar(index)}
    />
    </div>
        )})}
        <button className="sel-btn" onClick={setProfilePicture}>Set as avatar</button>
      </div>
    </Container>
   <ToastContainer/>
    </>
  )
}

export default SetAvatar

const Container = styled.div`

display:flex;
justify-container:center;
align-items:center;
flex-direction:column;
gap: 3rem;
background-color :#131324
height:100vh;
width:100vw;

.loader{
  max-inline-size:100%;
}

.title-container{
h1{
  color: white
}
}

.avatars{
  display: flex;
  gap:2rem;
 
  .avatar{
    border: 0.4rem solid transparent;
    padding:0.4rem;
    border-radius:5 rem;
    display:flex;
    justify-contnet: center;
    align-items:center;
    transition: 0.5s ease-in-out;
    img{
      height: 6rem
    }
  }
  .selected{
    border: 0.4 rem solid #4e0eff;
  }
}
 
 .sel-button{
  background-color: #997aff0;
  color:white;
  padding: 1 rem 2 rem;
  border : none;
  font-weight:bold;
  cursor:pointer;
  border-radius:0.4rem;
  font-size:1 rem;
  text-transform:uppercase;
  transition: 0.5s ease-in-out;
  &:hover{
  background-color: #4e0eff
  }
}`