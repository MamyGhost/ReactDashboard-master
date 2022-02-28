import styles from "./Analytics.module.scss";
import Line from "./Charts/Line";
import StackedColumns from "./Charts/StackedColumns";
import GroupedBars from "./Charts/GroupedBars";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import './acc.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'react-hooks-use-modal';
import Navbar from "../Navbar/Navbar";
import Container from "../Container/Container";
import RightNavbar from "../RightNavbar/RightNavbar";
import NavContext from "../../Context/NavContext";


export default class Analytics extends React.Component {

	constructor() {
		super();
		this.state={
		   dataType: [],
		   dataSignalement: [],
		   animation_name : '',
		   depth: '',
		   fade: '',
		   description:'',
		   dataDetails: [],
		   dataDetSignal: []
		};
		if(localStorage.getItem("token") == null){
			window.location.href="/login";
		   }
	   
	  }

	  

	  closePopUp(){
		this.setState({animation_name: 'animate-out'});
		this.setState({depth:'above'});
		 this.setState({fade:'fade-out'});
	  }
	  openPopUp(description){
		this.setState({animation_name: 'animate-in'});
		this.setState({depth:'below'});
		this.setState({fade:'fade-in'});
		this.setState({description:description});
		this.getDetails(description);
		this.getDetails2(description);
		// alert("http://projectsignalement.herokuapp.com/wb/userfront/signalement/description?description="+description+"&idregion=1");
	  }
	  updateData(description){
		this.getUpdate(description);
		console.log("huhu mandalo");
		//window.location.href="/accueil/analytics";
		 //alert("http://projectsignalement.herokuapp.com/wb/userfront/signalement/statut/"+description+"/1");
	  }

    getListeType()
	{
	  //localStorage.setItem('token','ecd6fb15c1f249a6def3ca7ebcb785aea831d65d');
	const token=localStorage.getItem('token');
  const headers={
	'Authorization': 'Bearer '+token
  };
	  fetch('http://projectsignalement.herokuapp.com/wb/userfront/listetype', {headers})
	  .then((res)=>res.json())
	  .then((res)=>{
		
		console.log(res)
	  this.setState({dataType: res})
	  })
  
	}

 
	getSignalement()
	{
		//localStorage.setItem('token','ecd6fb15c1f249a6def3ca7ebcb785aea831d65d');
		const token=localStorage.getItem('token');
		const headers={
			'Authorization': 'Bearer '+token
		  };
	  fetch('http://projectsignalement.herokuapp.com/wb/userfront/region/'+token+'/signalement', {headers})
	  .then((res)=>res.json())
	  .then((res)=>{
		console.log(res)
	  this.setState({dataSignalement: res})
	  })
  
	}
  // submitDeatils(event){
  //   event.preventDefault();
  //   this.mySwitchFunction();
  // }
  
	componentDidMount(){
	  this.getListeType();
	  this.getSignalement();
	}

	// validerSubmit(id){
	// 	navigator=()=>{
	// 		let navigate = useNavigate();
	// 		navigate('/details/'+id);
	// 	}
	// }
	getDetails(description){
		const region=localStorage.getItem('idregion');
		const token=localStorage.getItem('token');
		fetch('http://projectsignalement.herokuapp.com/wb/userfront/signalement/description?description='+description+'&idregion='+region+'', {
			headers:{
			  "Authorization": "Bearer "+token}
			 })
		  .then((res)=>res.json())
		  .then((res)=>{
			
			console.log(res)
			this.setState({dataDetails: res})
		})
		//   .catch((error) => {
		//    //console.log(error.response.data.message); 
		//    //alert(error.response.data.message);
		//    //this.state.erreur=error;
		// //    this.setState({type:''});
		// //    this.setState({daty:''});
		// //    this.setState({statut: ''});
		// //    this.setState({erreur: "error.response.data.message"});
		//    //window.location.href="/";
		//    }
	//    );
	}
	getDetails2(description){
		const region=localStorage.getItem('idregion');
		const token=localStorage.getItem('token');
		fetch('http://projectsignalement.herokuapp.com/wb/userfront/signalement/description2?description='+description+'&idregion='+region+'', {
			headers:{
			  "Authorization": "Bearer "+token}
			 })
		  .then((res)=>res.json())
		  .then((res)=>{
			
			console.log(res)
			this.setState({dataDetSignal: res})
		})
		//   .catch((error) => {
		//    //console.log(error.response.data.message); 
		//    //alert(error.response.data.message);
		//    //this.state.erreur=error;
		// //    this.setState({type:''});
		// //    this.setState({daty:''});
		// //    this.setState({statut: ''});
		// //    this.setState({erreur: "error.response.data.message"});
		//    //window.location.href="/";
		//    }
	//    );
	}

	getUpdate(description)
	{
		const region=localStorage.getItem('idregion');
		//localStorage.setItem('token','ecd6fb15c1f249a6def3ca7ebcb785aea831d65d');
		console.log("tonga update 1");

		const token=localStorage.getItem('token');
		const headers={
			'Authorization': 'Bearer '+token
		  };
	  fetch('http://projectsignalement.herokuapp.com/wb/userfront/signalement/statut/'+description+'/'+region, {headers,method: 'PUT',})
	  .then((res)=>res.json())
	  .then((res)=>{
		console.log("tonga update");
		console.log(res)
	  this.setState({dataDetSignale: res})
	  })
  
	}
	getDelete()
	{
		
		//localStorage.setItem('token','ecd6fb15c1f249a6def3ca7ebcb785aea831d65d');
		const token=localStorage.getItem('token');
		const headers={
			'Authorization': 'Bearer '+token
		  };
	  fetch('http://projectsignalement.herokuapp.com/wb/userfront/token/'+token, {headers,method: 'DELETE',})
	  .then((res)=>res.json())
	  .then((res)=>{
		console.log(res)
	  })
  
	}
render(){
	
  const projects2 = this.state.dataSignalement.map((projects2,i) =>{
    return (
      <tr>
        <td key={projects2.description}><p className="testLink"><strong>{projects2.description}</strong></p></td>
		<td key={projects2.type.nom}><p className="testLink">{projects2.type.nom}</p></td>
		<td key={projects2.daty}><p className="testLink">{projects2.daty}</p></td>
		<td><button className="opener" id={this.state.depth} onClick={this.openPopUp.bind(this,projects2.description)}>Voir plus</button></td>
      </tr>
    );
    });
	const test= this.state.dataDetails.map((test) =>{
		if(test.statut.id==3){
			return(
				<div className="termine">
					Etat du signalement déja terminé !
				</div>
				
			);
		}else{
			return(
				<button onClick={this.updateData.bind(this,test.description)}>Terminer</button>
				
			);
		}
		
	});
	const projects1 = this.state.dataDetails.map((projects1) =>{
		let stockage = "";
		if(projects1.photoList == null){
			stockage = "https://static.pexels.com/photos/57905/pexels-photo-57905.jpeg";
		}
		else{
			stockage = projects1.photoList[0].photo;
		}
		return (
			<div className="popUpModal">
            
            <section id="pop-up" className={this.state.animation_name}>
              <div id="innerPopUp" className={this.state.fade}>
                <div className="border-overlay">
                  <div className="white"></div>
                  <div className="black"></div>
                </div>
                <div className="text">
                  <h1 className="titre">{projects1.description} </h1>
                  <hr/>
                  <p className="close" onClick={this.closePopUp.bind(this)}>X</p>
                  <ul>
				  <li key={projects1.statut.etat} className="liste">Statut : <em>{projects1.statut.etat}</em></li>
				  <li key={projects1.region.nom} className="liste">Région : <em>{projects1.region.nom}</em></li>
				  <li key={projects1.type.nom} className="liste">Type de signalement: <em>{projects1.type.nom}</em></li>
				  <li key={projects1.daty} className="liste">Date du signalement: <em>{projects1.daty}</em></li>
				  <li key={projects1.latitude} className="liste">Localisation : <em>{projects1.latitude}</em> / <em>{projects1.longitude}</em></li>
				  </ul>
				
                 {test}
			
                </div>
                <div className="photo">
                  <img src={stockage}/>
                </div>
              </div>
            </section>
          </div>
		);
		
		});
  return (
	 
	
    <main>
      <div className={styles.title}>
        <h1>Liste des signalements</h1>
        <WiStars />
      </div>
      <div>
      <table className="affiche">
					<thead>
							<tr>
								<th>Description</th>
								<th>Type</th>
								<th>Date</th>
								<th></th>
							</tr>
					</thead>
					<tbody>
							{projects2}
					</tbody>
						</table>
      </div>
	  {/* <div className="popUpModal">
            
            <section id="pop-up" className={this.state.animation_name}>
              <div id="innerPopUp" className={this.state.fade}>
                <div className="border-overlay">
                  <div className="white"></div>
                  <div className="black"></div>
                </div>
                <div className="text">
                  <h1 className="titre">{this.state.dataDetails.description} </h1>
                  <hr/>
				  <ul>
	// 			  <li key={this.state.dataDetails.statut} className="liste">Statut : <em>{this.state.dataDetails.statut}</em></li>
	// 			  <li key={this.state.dataDetails.region} className="liste">Région : <em>{this.state.dataDetails.region}</em></li>
	// 			  <li key={this.state.dataDetails.type} className="liste">Type de signalement: <em>{this.state.dataDetails.type}</em></li>
	// 			  <li key={this.state.dataDetails.daty} className="liste">Date du signalement: <em>{this.state.dataDetails.daty}</em></li>
	// 			  <li key={this.state.dataDetails.latitude} className="liste">Localisation : <em>{this.state.dataDetails.latitude}</em> / <em>{this.state.dataDetails.longitude}</em></li>
	// 			  </ul>
    //               <button>Terminer</button>
                </div>
                <div className="photo">
                  <img src="https://static.pexels.com/photos/57905/pexels-photo-57905.jpeg"/>
                </div>
              </div>
            </section>
          </div> */}
{projects1}
      {/* <div>
      { this.mySwitchFunction(param) }
      </div> */}
    </main>
	
  );
}
}


