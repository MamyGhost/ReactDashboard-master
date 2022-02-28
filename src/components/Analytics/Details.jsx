import styles from "./Analytics.module.scss";
import Line from "./Charts/Line";
import StackedColumns from "./Charts/StackedColumns";
import GroupedBars from "./Charts/GroupedBars";
import { Link, useParams } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import './acc.css';
import React from 'react';
//import {useParams} from 'react-router-dom/cjs/react-router-dom.min';
//import { withRouter } from "react-router";
import { useState,useEffect } from 'react';
 
export default function Details() {
   const [count, setCount] = useState(0);
	const [dataType,setDataType]= useState([]);
	const [dataSignalement,setSignalement]= useState([]);
	const [dataDetails,setDetails]= useState([]);
	const {id}=useParams();
	const region=1;

	const getDetails= (ids,region) =>{
		fetch('http://projectsignalement.herokuapp.com/wb/userfront/signalement/description?description=grave accident de&idregion='+region+'', {
			headers:{
			  "Authorization": "Bearer 5886640101472f810740c73b50f34d258f585a88"}
			 })
		  .then((res)=>res.json())
		  .then((res)=>{setDetails(res)
		  })
	}
	useEffect(()=>{
		getDetails(id,region)
	},[]);

	
  
	// tonga = useParams() ;
	// description = tonga['description'] ;
	// componentDidMount() {
    //     const id = this.props.match.params.id;
    //     this.fetchData(id);
	// 	this.getListeType();
	// 	this.getSignalement();
    // }

    // fetchData = id => {
    //     // ...
    // };

	// constructor(props) {
	// 	super(props);
	// 	this.state={
	// 	   dataType: [],
	// 	   dataSignalement: [],
	// 	   dataDetails: [],
	// 	   descri: ''	
	// 	};
	   
	//   }


// 	getDetails(){
		
// 		const region=1;
// 		const description=this.setState({descri: this.id});
// 		fetch('http://projectsignalement.herokuapp.com/wb/userfront/signalement/description?description=grave accident de&idregion='+region+'', {
// 			headers:{
// 			  "Authorization": "Bearer 7439134adf0568ce88e45c4f04d20e4dafc0531e"}
// 			 })
// 		  .then((res)=>res.json())
// 		  .then((res)=>{
// 			console.log(res)
// 			this.setState({dataDetails: res})
// 		  }).catch((error) => {
// 		   console.log(error.response.data.message); 
// 		   //alert(error.response.data.message);
// 		   //this.state.erreur=error;
// 		   this.setState({type:''});
// 		   this.setState({daty:''});
// 		   this.setState({statut: ''});
// 		   this.setState({erreur: "error.response.data.message"});
// 		   //window.location.href="/";
// 		   }
// 	   );
// 	}

//     getListeType()
// 	{
// 	  localStorage.setItem('token','7439134adf0568ce88e45c4f04d20e4dafc0531e');
// 	const token=localStorage.getItem('token');
//   const headers={
// 	'Authorization': 'Bearer 7439134adf0568ce88e45c4f04d20e4dafc0531e'
//   };
// 	  fetch('http://projectsignalement.herokuapp.com/wb/userfront/listetype', {headers})
// 	  .then((res)=>res.json())
// 	  .then((res)=>{
// 		console.log(res)
// 	  this.setState({dataType: res})
// 	  })
  
// 	}

	 
// 	getSignalement()
// 	{
// 		localStorage.setItem('token','7439134adf0568ce88e45c4f04d20e4dafc0531e');
// 		const token=localStorage.getItem('token');
// 		const headers={
// 			'Authorization': 'Bearer 7439134adf0568ce88e45c4f04d20e4dafc0531e'
// 		  };
// 	  fetch('http://projectsignalement.herokuapp.com/wb/userfront/region/7439134adf0568ce88e45c4f04d20e4dafc0531e/signalement', {headers})
// 	  .then((res)=>res.json())
// 	  .then((res)=>{
// 		console.log(res)
// 	  this.setState({dataSignalement: res})
// 	  })
  
// 	}
  
	

 
    return (
		<main>
      <div className={styles.title}>
        <h1>Détails du signalement</h1>
        <WiStars />
      </div>
		<fieldset>
		
		{dataDetails.map((projects2) =>(
		<ul key={projects2.description}>
		<li key={projects2.description}>{projects2.description}</li>
		<li key={projects2.statut.etat}>{projects2.statut.etat}</li>
		<li key={projects2.region.nom}>{projects2.region.nom}</li>
		<li key={projects2.type.nom}>{projects2.type.nom}</li>
		<li key={projects2.daty}>{projects2.daty}</li>
		<li key={projects2.latitude}>{projects2.latitude}</li>
		<li key={projects2.longitude}>{projects2.type.longitude}</li>
		</ul>
		)
	)};
		</fieldset>
		</main>
    )
    
  
};





