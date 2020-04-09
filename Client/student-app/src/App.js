import React, {Component} from 'react';
import './App.css';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error : null,
      isLoaded: false,
      data:'',
      user : '',
      username: '',
      password: '',
      valid: '',
      userList: []
    };
    this.updateDataState = this.updateDataState.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateValid = this.updateValid.bind(this);
    this.fetchDataBasedOnEntry = this.fetchDataBasedOnEntry.bind(this);
    this.fetchDataFromMongo = this.fetchDataFromMongo.bind(this);
    this.insertingData = this.insertingData.bind(this);
  }

  updateDataState(e) {
    this.setState({data:e.target.value});
  }

  updateUsername(e) {
    this.setState({username: e.target.value});
  }

  updatePassword(e) {
    this.setState({password: e.target.value});
  }

  updateValid(e) {
    this.setState({valid: e.target.value});
  }

  insertingData() {
    fetch("http://192.168.31.56:8000/users/insertUsers?username="+this.state.username+ "&password="+this.state.password+ "&valid="+this.state.valid) 
    this.fetchDataFromMongo();
  }
  fetchDataBasedOnEntry() {
    fetch("http://192.168.31.56:8000/users/findUser?username="+this.state.data) 
  .then(res => res.json() )
  .then(
    (result) => {
      this.setState({ isLoaded:true, userList: result });
    },
    (error) => {
      this.setState({ isLoaded:true, error });  
    }
  )
  }

  fetchDataFromMongo() {
    fetch("http://192.168.31.56:8000/users/findAllUsers") 
    .then(res => res.json() )
    .then(
      (result) => {
        this.setState({ isLoaded:true, userList: result });
      },
      (error) => {
        this.setState({ isLoaded:true, error });  
      }
    )
  }

  /*componentDidMount() {
    fetch("http://192.168.31.56:8000/users/findAllUsers") 
    .then(res => res.json() )
    .then(
      (result) => {
        this.setState({ isLoaded:true, userList: result });
      },
      (error) => {
        this.setState({ isLoaded:true, error });  
      }
    )
  } */
  render() {
    const { error, isLoaded, userList } = this.state;
    if(error) {
      return <div>Error: {error.message} </div>
    }
    /*else if(!isLoaded) {
      return <div> Loading... </div>
    }*/
    else {
      return (
       <div className="App">        
       { userList.length == 0 ? <h1>The UsersList contains empty data</h1> :
            <div>
                    <table className="table table-striped  table-bordered">
                        <thead>
                            <tr>
                                <th>Object ID</th>
                                <th>User Name</th>
                                <th>Valid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.length > 0 && userList.map(user =>
                                <tr key={user._id}>
                                  <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.valid}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
            </div>
}
<br/> <hr/> <br/>
        <input type="text" name= "username" value = {this.state.data} 
                   onChange = {this.updateDataState}/>
        <button onClick = {this.fetchDataFromMongo}>Fetch All Data</button>
        <button onClick = {this.fetchDataBasedOnEntry}>Fetch Specific Data</button>
        <br/>
        <h1>Insert Data: </h1>
        Username: <input type="text" value= {this.state.username} onChange ={this.updateUsername} />
        <br/>
        Password: <input type="text" value= {this.state.password} onChange ={this.updatePassword} />
        <br/>
        Valid: <input type="text" value= {this.state.valid} onChange ={this.updateValid} />
        <br/>
        <button onClick= {this.insertingData}>Save data</button>
       </div>
      );
    }

  }
}
 export default App;