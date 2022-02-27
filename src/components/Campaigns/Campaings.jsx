import styles from "./Campaings.module.scss";
import { WiStars } from "react-icons/wi";
import React from 'react';
import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet";
import L from "leaflet";
// import 'node_modules/leaflet/dist/leaflet.css';
import '../../../node_modules/leaflet/dist/leaflet.css'
import { Link } from 'react-router-dom';
// import './acc.css';
import image1 from '../Campaigns/red.png';
import image2 from '../Campaigns/blue.png';
import image3 from '../Campaigns/orange.png';
import image4 from '../Campaigns/yellow.png';
import image5 from '../Campaigns/black.png';
import image6 from '../Campaigns/green.png';

export default class Compaings extends React.Component {

	constructor() {
		super();
		this.state={
		   dataType: [],
		   dataSignalement: []
		  
		};
	   
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
	   			<h1>{projects2.description}</h1>
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
  </article>
  </div>
  );
}
}

