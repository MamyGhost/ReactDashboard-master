import './acc.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';

export default class Team extends React.Component {
	constructor(prop) {
		super(prop);
		this.state={
		   dataType: [],
		   dataSignalement: [],
		   dataStatut: [],
		   dataRecherche: [],
		   dataParType: [],
		   dataParStatut: [],
		   dataParDaty: [],
			type:'',
			daty:'',
			statut:'',
			region: localStorage.getItem('idregion'),
			erreur:''
		};

	   if(localStorage.getItem("token") == null){
		window.location.href="/login";
	   }

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
		if(!res.ok){
			window.location.href="/login";
		 }
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
		if(!res.ok){
			window.location.href="/login";
		 }
		console.log(res)
	  this.setState({dataSignalement: res})
	  })
  
	}
	handleChangeType(event) {
		this.setState({type : event.target.value});
	  }
	  
	  handleChangeDaty(event) {
		this.setState({daty: event.target.value});
	  }
	  handleChangeStatut(event) {
		this.setState({statut : event.target.value});
	  }
	
	
	  submitRecherche(event)
	  {
		event.preventDefault();
		this.getFnd();
	  }
    renderError(){
      return (
        <div>{this.state.erreur}</div>
  
      );
   }
	getFnd()
	{
		
	  var type=this.state.type;
				  var daty=this.state.daty;
				  var statut=this.state.statut;
				  var region=this.state.region;
				  const donnee=  [
					type= type,
					 daty= daty,
					 statut= statut,
					 region= localStorage.getItem('idregion')
				   ]
				  //  const headers={
				  //   'Authorization': 'Bearer 18718e6ffd280afe0bc33858644e5d36010fc215'
				  // };
				  const token=localStorage.getItem('token');
				   fetch('http://projectsignalement.herokuapp.com/wb/userfront/signalement/recherche?type='+type+'&daty='+daty+'&statut='+statut+'&idregion='+region+'', {
					 headers:{
					   "Authorization": "Bearer "+token}
					  })
				   .then((res)=>res.json())
				   .then((res)=>{
					 if(!res.ok){
						console.log(res.message);
						throw Error(res.message);
					 }
					 this.setState({dataRecherche: res})
				   }).catch((error) => {
					console.log(error.message); 
					//alert(error.response.data.message);
					//this.state.erreur=error;
					this.setState({type:''});
					this.setState({daty:''});
					this.setState({statut: ''});
					this.setState({erreur: error.message});
					//window.location.href="/";
					}
				);
		
	}
	  getRecherche(){
		
		  var type=this.state.type;
				  var daty=this.state.daty;
				  var statut=this.state.statut;
				  var region= localStorage.getItem('idregion');
				  const donnee=  [
					type= type,
					 daty= daty,
					 statut= statut,
					 region= localStorage.getItem('idregion')
				   ]
				   const token=localStorage.getItem('token');
					const headers={
					  'Authorization': 'Bearer '+token
					};
	  
					console.log(donnee); 
	  
		  axios.get('http://projectsignalement.herokuapp.com/wb/userfront/signalement/recherche', {
			params:{
			  type: this.state.type,
					 daty: this.state.daty,
					 statut: this.state.statut,
					 idregion: localStorage.getItem('idregion')
			}
		  },{headers}).then((res)=>{
						if(!res.ok){
							window.location.href="/login";
						}
						console.log(res)
					  this.setState({dataRecherche: res})
					  }).catch((error) => {
						  console.log(error.response.data.message); 
					  }
			);
			 
		   console.log("tsy msiy resultat"); 
			
	  }
	

	  getListeStatut()
	  {
		//localStorage.setItem('token','ecd6fb15c1f249a6def3ca7ebcb785aea831d65d');
	  const token=localStorage.getItem('token');
	const headers={
	  'Authorization': 'Bearer '+token
	};
		fetch('http://projectsignalement.herokuapp.com/wb/userfront/listestatut', {headers})
		.then((res)=>res.json())
		.then((res)=>{
			if(!res.ok){
				window.location.href="/login";
			 }
		  console.log(res)
		this.setState({dataStatut: res})
		})
	
	  }
	
	  componentDidMount(){
		this.getListeType();
		this.getListeStatut();
		this.getSignalement();
	  }
	 

	  renderError(){
      if (this.erreur!='') {
        return (
          <div className='erreur'>{this.state.erreur}</div>
      
        );
    }
		
	}
  render(){
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
		  const brada = this.state.dataRecherche.map((hehe,i) =>{
			return (    
			   <p className='testLink' key={hehe.description}>{hehe.description}</p>
			);
		  });
		  const projects1 = this.state.dataType.map((projects1,i) =>{
			return (    
				<option value={projects1.nom} key={projects1.nom}>{projects1.nom}</option>
			);
		  });
	  	  
		  const projects3 = this.state.dataStatut.map((projects3,i) =>{
			return (    
				<option value={projects3.etat} key={projects3.etat}>{projects3.etat}</option>
			);
		  });
		return(
				
			<div className="wrapper">
				<header className="main-head">
				
				</header>
				
				<article className="contenu">
					<h1 className="mapTitre">Filtre de recherche</h1>
					<div>
					<div className="container" >
						<form className='rechercheForm'>
							
						<div className='ppp'>
							<table className='tableau' cellSpacing={0} cellPadding={0}>
								<tr>

                   <td>
                      <p className='ddd'>Type de signalement</p>
                    </td> 
					
					
                    <td><select className="haha" name="inputType" onChange={this.handleChangeType.bind(this)} value={this.state.type}>    
                    {projects1}
                    </select></td>
                  
					</tr>
				  

                  <tr>

                    <td>
					<p className='ddd'>Date du publication</p>
                    </td>
                    <td><input
                      type="date"
                      defaultValue=""
                      size="35"
                      id="contactEmail"
                      name="inputDaty"
                      onChange={this.handleChangeDaty.bind(this)}
                      value={this.state.daty}
					  className="hehe"
                    /></td>
                 
				 </tr>
                  <tr>
                    <td><p className='ddde'>Status</p></td>
                    <td><select className="haha" name="inputStatut" onChange={this.handleChangeStatut.bind(this)} value={this.state.statut}>    
                    {projects3}
                    </select></td>

					</tr>
					</table>  
</div>
                  
                  <div>
                    <button className="submit" onClick={this.submitRecherche.bind(this) } >Rechercher</button>
                  </div>
						</form>
           
           {this.renderError()}
				
					</div>
          
					</div>
          <fieldset className='result'>
				<nav className="main-nav">
				<h2 className='rech'>Resultat</h2>
        <hr></hr>
					<ul>
          {brada}
					</ul>
				</nav>
				</fieldset>
				</article>
			</div>
		);
	}
}
