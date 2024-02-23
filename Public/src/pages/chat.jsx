import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
function Chat() {
   const [users,setUsers]=useState([]);
   const [curUser,setCur]=useState(undefined);
   const navigate=useNavigate();

   useEffect(async()=>{
   if(!localStorage.getItem('chatme-user-data'))
   navigate('/login');
   else setCur(await JSON.parse(localStorage.getItem("chatme-user-data")))
   },[])

   useEffect(async()=>{
    if(curUser){
         if(curUser.isAvatarSet){
            const data=await axios.get(`https://localhost:5000/getcontact/${curUser._id}`);
        setUsers(data.users);
         }
    else navigate('/setAvatar');
 }
 },[])
    
  return (
  <Container>
    <div className="container">heelo ji</div>
  </Container>
  )
}


const Container=styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction: column;
justify-content:center;
gap:1rem;
align-items:center;'
background-color: #131324
.container{
    height:85vh;
    width: 85vw;
    background-color:#00000076;
    display: grid;
    grid-template-column: 25%  75%;
    @media screen and (min-width:720px) and (max-width:1200px);
    {
        grid-template-column: 35% 65%;
    }
}
`

export default Chat;
