//REACT ROUTER
import { Link } from "react-router-dom";

//HOOKS
import useClickOutside from "../../../CustomHooks/ClickOutside";
import { useState } from "react";

//ICONS , PICS , STYLES
import styles from "./MyProfile.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ReactComponent as Avatar } from "../../../pics/avatar.svg";
import { useEffect } from 'react';
import './zesta.css';
export default function MyProfile() {
  const [isProfileOpen, setisProfileOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setisProfileOpen(false);
  
  });

    const test = () =>{
    //alert("test delete");
    GetDelete();
    localStorage.removeItem('token');
    window.location.href="/";
  }

    const GetDelete = () => {
		
      //localStorage.setItem('token','ecd6fb15c1f249a6def3ca7ebcb785aea831d65d');
      const token=localStorage.getItem('token');
      const headers={
        'Authorization': 'Bearer '+token
        };
        if(token!='' || token!= null ){
      fetch('http://localhost:8090/wb/userfront/token/'+token, {headers,method: 'DELETE',})
      .then((res)=>res.json())
      .then((res)=>{
      console.log(res)
      })    
    }else{
      window.location.href="/";
  }
  }
  //   useEffect(()=>{
  //     GetDelete()
  //   },[]);
  //  const DeleteData = () =>{
  //     GetDelete();
  //     console.log("huhu mandalo");
  //     const token=localStorage.getItem('token');
  //     //window.location.href="/";
  //      alert("http://localhost:8090/wb/userfront/token/"+token+" ");
  //     }
     
  
  // useEffect(()=>{
  //   DeleteData()
  // },[]);
  
  
  return (
    <div
      ref={domNode}
      className={styles.avatar_container}
      onClick={() => {
        setisProfileOpen(!isProfileOpen);
      }}
    >
      {/* AVATAR ICON */}
      <div className={styles.icon_avatar_container}>
        <Avatar />
      </div>

      {/* NAME */}
      <div className={styles.name}>
        <span>MadaSignale</span>
        <MdKeyboardArrowDown />
      </div>

      {/* AVATAR/SETTINGS SUBMENU */}
      <div
        className={`${styles.menu} ${isProfileOpen ? styles.menu_active : ""}`}
      >
        <div className={styles.info}>
          <span className={styles.name}>Madasignale</span>
        </div>
        <div  >
          <button onClick={test} className="logout"> Sign Out</button>
        </div>
      </div>
    </div>
  );
};


