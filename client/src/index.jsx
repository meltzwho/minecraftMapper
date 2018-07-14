import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worlds: []
    };
  }

  handleUpload() {
    var file = new FormData();
    file.append('foo', 'bar');
    file.append('file', document.getElementById('file').files[0]);
    axios.post('/upload', file)
         .then((res) => {
           let oldWorlds = this.state.worlds.slice();
           if(this.state.worlds.indexOf(res.dat) === -1) oldWorlds.push(res.data);
           this.setState({
             worlds: oldWorlds
           });
           console.log(this.state.worlds);
         })
         .catch((err)=>{
           console.error(err);
         });
  }

  componentDidMount(){
    axios.get('/worlds')
    .then((res)=>{
      res.data.forEach((world) => {
        world = world.split('/');
        world = world[world.length-1];
        this.state.worlds.push(world);
      })
      this.setState({});
    })
    .catch((err)=>{
      console.error(err);
    })
  }

  render() {
    let worlds = [];
    for(let world of this.state.worlds){
      worlds.push(<p><a href={world+'/index.html'} target="_blank">{world.split('-')[0]}</a></p>);
    }
    return (<div>
      <label>File</label>
      <input id="file" type="file" className="form-control"/>
      <button id="upload" type="button" className="btn btn-primary" onClick={() => this.handleUpload()}>Upload</button>
      <ul>
      {worlds}
      </ul>
    </div>)
  }
}

ReactDom.render(<App/>, document.getElementById('app'));
