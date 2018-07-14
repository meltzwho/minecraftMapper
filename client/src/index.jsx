import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleUpload() {
    var file = new FormData();
    file.append('foo', 'bar');
    file.append('file', document.getElementById('file').files[0]);
    axios.post('/upload', file);
  }

  render() {
    return (<div>
      <label>File</label>
      <input id="file" type="file" className="form-control"/>
      <button id="upload" type="button" className="btn btn-primary" onClick={() => this.handleUpload()}>Upload</button>
    </div>)
  }
}

ReactDom.render(<App/>, document.getElementById('app'));
