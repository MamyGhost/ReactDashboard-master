import React from 'react';
import './front.css';
import './acc.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet";
import * as Leaflet from 'leaflet';
import '../node_modules/leaflet/dist/leaflet.css';
import L from "leaflet";

export default class Accueil extends React.Component {

	constructor() {
		super();
		this.state={
		   dataType: [],
		   dataSignalement: []
		  
		};
	   
	  }
	//   faireRedirection=()=> {
	// 	let url = "maNouvelleURL"
	// 	let history = useHistory()
	// 	history.push(url)
	//   }
	
	getListeType()
	{
	  localStorage.setItem('token','af9675eed1ab2ef45b94f9a5d7e60ccd3338b8d4');
	const token=localStorage.getItem('token');
  const headers={
	'Authorization': 'Bearer af9675eed1ab2ef45b94f9a5d7e60ccd3338b8d4'
  };
	  fetch('http://localhost:8080/wb/userfront/listetype', {headers})
	  .then((res)=>res.json())
	  .then((res)=>{
		console.log(res)
	  this.setState({dataType: res})
	  })
  
	}

	 
	getSignalement()
	{
		localStorage.setItem('token','af9675eed1ab2ef45b94f9a5d7e60ccd3338b8d4');
		const token=localStorage.getItem('token');
		const headers={
			'Authorization': 'Bearer af9675eed1ab2ef45b94f9a5d7e60ccd3338b8d4'
		  };
	  fetch('http://localhost:8080/wb/userfront/region/af9675eed1ab2ef45b94f9a5d7e60ccd3338b8d4/signalement', {headers})
	  .then((res)=>res.json())
	  .then((res)=>{
		console.log(res)
	  this.setState({dataSignalement: res})
	  })
  
	}
  
	componentDidMount(){
	  this.getListeType();
	  this.getSignalement();
	  this.getIcon();
	}
	getIcon(s) {
		let myIcon
		let Col="red"
		if (this.dataSignalement != null) {
		  for (let i = 0; i < this.dataSignalement.length; i++) {
			
			  console.log(this.dataSignalement[i].description)			  
			
		  } 
		}
	}
	
	render(){
		
		var m = L.icon({
			iconUrl:
			  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
			iconSize: [25, 41],
			iconAnchor: [12.25, 41],
		  });
	
		const pos = [-20.915,47.043];
		const  position = [51.505, -0.09];
		const projects = this.state.dataType.map((projects,i) =>{
			return (
			  <li key={projects.nom}>{projects.nom}</li>
			);
		  });
		  const projects2 = this.state.dataSignalement.map((projects2,i) =>{
			return (
				<tr>
					<td>{projects2.description}</td>
				</tr>
			);
		  });
		return(
				
			<div className="wrapper">
				<header className="main-head">
					<ul>
						<li className="active">Acceuil</li>
						<Link to='/recherche'><li className="lien">Recherche</li></Link>
						<li className="deconnexion">D??connexion</li>
					</ul>
				</header>
				<fieldset>
				<nav className="main-nav">
					<h2>Type de signalement</h2>
					<hr></hr>
					<ul>
					{projects}
					</ul>
				</nav>
				</fieldset>
				<article className="content">
					<h1 className="mapTitre">Indication sur carte</h1>
					<div id='carte'>
    <div className="leaflet-container">
      <MapContainer center={pos} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
		{this.dataSignalement != null && this.dataSignalement.length > 0 &&
          this.dataSignalement.map((s) => (
            <Marker
              position={[
					s.latitude,
					s.longitude
              ]}
              icon={this.getIcon(s)}
              key={s.id}
              onMouseOver={(e) => {
                e.target.openPopup();
              }}
              onMouseOut={(e) => {
                e.target.closePopup();
              }}
            >
              <Popup> <div>
                <h2>{ s.latitude} , { s.longitude}</h2>
                <h3>Date d`insertion:{s.datye}</h3>
                <p>Description:{s.description}</p>
              </div></Popup>
            </Marker>
          ))}
		 <Marker
          position={[
               -20.915,
                47.043
              ]}
              icon={new L.Icon({
                iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png`,
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
              
             <Popup>Diaryrof</Popup>
          </Marker>
  </MapContainer>
		</div>
		</div>
				</article>
				<nav className="nav-droite">
				<table>
					<thead>
							<tr>
								<th>Signalements</th>
							</tr>
					</thead>
					<tbody>
							{/* <tr>
								<td>cellule A1</td>
								
							</tr>

							<tr>
								<td>cellule A2</td>
								
							</tr> */}
							{projects2}
					</tbody>
						</table>
				</nav>
				
				<footer className="main-footer"></footer>
			</div>
		);
	}
}


