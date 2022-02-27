import styles from "./Campaings.module.scss";
import { WiStars } from "react-icons/wi";
import React from 'react';
import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet";
import L from "leaflet";
// import 'node_modules/leaflet/dist/leaflet.css';
import '../../../node_modules/leaflet/dist/leaflet.css'
import { Link } from 'react-router-dom';
import './zesta1.css';
import image1 from '../Campaigns/red.png';
import image2 from '../Campaigns/blue.png';
import image3 from '../Campaigns/orange.png';
import image4 from '../Campaigns/yellow.png';
import image5 from '../Campaigns/black.png';
import image6 from '../Campaigns/green.png';
import image from '../../pics/accident.jpg'

export default class Compaings extends React.Component {

	constructor() {
		super();
		this.state={
		   dataType: [],
		   dataSignalement: [],
		   dataDetails: []
		  
		};
	   
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
		// this.getDetails2(description);
		// alert("http://localhost:8090/wb/userfront/signalement/description?description="+description+"&idregion=1");
	  }
	  getDetails(description){
		const region=localStorage.getItem('idregion');
		const token=localStorage.getItem('token');
		fetch('http://localhost:8090/wb/userfront/signalement/description?description='+description+'&idregion='+region+'', {
			headers:{
			  "Authorization": "Bearer "+token}
			 })
		  .then((res)=>res.json())
		  .then((res)=>{
			console.log(res)
			this.setState({dataDetails: res})
		})
	}

    getListeType()
	{
	  //localStorage.setItem('token','ecd6fb15c1f249a6def3ca7ebcb785aea831d65d');
	const token=localStorage.getItem('token');
  const headers={
	'Authorization': 'Bearer '+token
  };
	  fetch('http://localhost:8090/wb/userfront/listetype', {headers})
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
	  fetch('http://localhost:8090/wb/userfront/region/'+token+'/signalement', {headers})
	  .then((res)=>res.json())
	  .then((res)=>{
		console.log(res)
	  this.setState({dataSignalement: res})
	  })
  
	}
  
	componentDidMount(){
	  this.getListeType();
	  this.getSignalement();
	}
//   getIcon(s) {
// 		let myIcon
// 		let Col="red"
// 		if (this.dataSignalement != null) {
// 		  for (let i = 0; i < this.dataSignalement.length; i++) {
			
// 			  console.log(this.dataSignalement[i].description)			  
			
// 		  } 
// 		}
	// }
  
	
render(){  
	const projects1 = this.state.dataDetails.map((projects1) =>{
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
				
                
			
                </div>
                <div className="photo">
                  <img src={image} width="600px;" height="365px;"/>
                </div>
              </div>
            </section>
          </div>
		);
		
		});
      <div className={styles.title}>
        <h1>Carte d'indication</h1>
        <WiStars />
      </div>
      var m = L.icon({
			iconUrl:  require('../Campaigns/red.png'),
			iconSize: [25, 41],
			iconAnchor: [12.25, 41],
		  });
	
		const pos = [-16.100,46.000];
		const projects = this.state.dataType.map((projects,i) =>{
			return (
			  <li key={projects.nom}>{projects.nom}</li>
			);
		  });
		  const projects2 = this.state.dataSignalement.map((projects2,i) =>{
			return (
				<Marker 
	
	position={[
		projects2.latitude,
		projects2.longitude
	   ]}
	   icon={new L.Icon({
		 iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-'+projects2.type.couleur+'.png',
		 iconRetinaUrl: require('../Campaigns/black.png'),
		 iconSize: [25, 41],
		 iconAnchor: [12.25, 41],
		 popupAnchor: [1, -34],
		 shadowSize: [41, 41]
	   })}
	   onMouseOver={(e) => {
		 e.target.openPopup();
	   }}
	   onMouseOut={(e) => {
		 e.target.closePopup();
	   }}

	>
     
	  <Popup> <div>
				<button className="openement" id={this.state.depth} onClick={this.openPopUp.bind(this,projects2.description)}><h1>{projects2.description}</h1></button>
                <h3>Coordonnée : { projects2.latitude} , {projects2.longitude}</h3>
                <h3>Date du publication :{projects2.daty}</h3>
                <h3>Status :{projects2.statut.etat}</h3>
                <h3>Type : {projects2.type.nom}</h3>
              </div>
      </Popup>
    </Marker>
			);
		  });
		return(
				
			<div className="mapping">
				<header className="main-head">
					
				</header>
				<fieldset>
				<nav className="main-nav">
					<h2>Type de signalement</h2>
					<hr></hr>
					<div className="image"> 
					<ul >
					<li><img src={image1} width="50" height="50"/></li>	
					<li><img src={image2} width="50" height="50"/></li>
					<li><img src={image3} width="50" height="50"/></li>
					<li><img src={image4} width="50" height="50"/></li>
					<li><img src={image5} width="50" height="50"/></li>
					<li><img src={image6} width="50" height="50"/></li>
					</ul>
					</div>
					<div className="type">
					<ul>
					
					<li>{projects}</li>
					
					</ul>
					</div>
				</nav>
				</fieldset>
				<article className="content">
					<h1 className="mapTitre">Indication sur carte</h1>

					<div id='carte'>
            <div className="leaflet-container">
            <MapContainer center={pos} zoom={6} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
	{projects2}
    
  </MapContainer>
  {/* <img
          src="https://cdn3.iconfinder.com/data/icons/basicolor-arrows-checks/24/149_check_ok-512.png"
          width="150"
          height="150"
        /> */}
            </div>
          </div>
		  {projects1}
  </article>
  </div>
  );
}
}

