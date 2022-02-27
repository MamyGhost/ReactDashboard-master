import React from 'react';
import axios from 'axios';
import {useState,useEfffect} from 'react';
import App from "../../App";
import Access from "../../Access";


//import {useHistory} from 'react-router-dom';
import './front.css';


class UserLogin extends React.Component{
  constructor() {
    super();
    this.state={
        username:'',
        password:'',
        region:'',
        erreur:''
    };
   
  }

 renderError(){
    return (
      <div>{this.state.erreur}</div>

    );
 }

  valider(event)
  {

    event.preventDefault();
    if(this.state.login!='' && this.state.mdp!=''){
    var username=this.state.username;
            var password=this.state.password;
            var region=this.state.region;
            const donnee=  {
              username:username,
               password: password,
               region :{
                 id:parseInt(region)
               }
              }

             

    axios.post('http://localhost:8080/wb/userfront/login',donnee)
    .then(res => {
        // this.setState({username: res.data})
        
        console.log(res.headers.authorization);
        console.log("id region :"+res.data);
        //console.log(res.config.data.region.id);
        localStorage.setItem('token',res.headers.authorization.split("Bearer ")[1]);
        localStorage.setItem('idregion',res.data);
        window.location.href="/accueil";
       
        
    }).catch((error) => {
          console.log(error.response.data.message); 
          //alert(error.response.data.message);
          //this.state.erreur=error;
          this.setState({username:''});
          this.setState({password:''});
          this.setState({region: ''});
          this.setState({erreur: error.response.data.message});
          //window.location.href="/app";
          }
      );
        }else{
          console.log("tsy mety le login"); 
        }
  }

      
  //   handleSubmit() {
  //       if(this.state.username!=null && this.state.password!=null && this.state.region!=null && this.state.username!='' && this.state.password!='' && this.state.region!=''){
  //           var username=this.state.username;
  //           var password=this.state.password;
  //           var region=this.state.region;
  //           const donnee=  {
  //             username:username,
  //              password: password,
  //              region :{
  //                id:region
  //              }
  //             }
  //           // let formData = new FormData();
  //           // formData.append("username",username);
  //           // formData.append("password",password);
  //           // formData.append("region",region);

  //           console.log("tonga"); 
  //           console.log(donnee); 
            
  //           const requestOption= {
  //             method:'POST',
  //             header:{'Content-Type': 'application/json', 'Accept': 'application/json'},
  //             body: JSON.stringify(donnee)
  //           }
  //           console.log(JSON.stringify(donnee));

  //          axios.post('http://localhost:8080/wb/userfront/login',donnee)
  //          .then(res => res.json())
  //            .then(res=>console.log(res))
  //            .catch(error => {
              
  //                console.log(error); 
  //                //alert("dfdfdfd");
  //                //this.state.erreur=error;
  //                }
  //            );

  //       }
  //       // window.location.href="/accueil";
      
  // }
      
      handleChangelogin(event) {
        this.setState({username : event.target.value});
      }
      
      handleChangemdp(event) {
        this.setState({password: event.target.value});
      }
      handleChangeregion(event) {
        this.setState({region : event.target.value});
      }

    render(){
		return(
		   
	      	
			<form className="login-form">
	        	<div>{this.renderError()}</div>
		            <div className="input-group span-2">
		                <label className="input-label">UserName</label>
		                <input type="text" name="username" className="input-text" placeholder="Your name" onChange={this.handleChangelogin.bind(this)} value={this.state.username} />

		            </div>
		            <div className="input-group span-2">
		                <label className="input-label">Password</label>
		                <input type="password" name="password" className="input-text" placeholder="Your password"  onChange={this.handleChangemdp.bind(this)}  value={this.state.password} />
		            </div>
		            <div className="input-group span-2">
		                <label className="input-label">Region</label>
		                <input type="number" name="region" className="input-text" placeholder="Region"  onChange={this.handleChangeregion.bind(this)}  value={this.state.region}/>
		            </div>
		            <div className="input-group span-2">
		               
                    <button onClick={this.valider.bind(this) } className="input-button">Se connecter</button>
		            </div>
		        
	      	</form>
		);
	}
}
export default UserLogin;

