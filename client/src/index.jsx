import React from 'react';
import ReactDom from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>
      <form role="form" class="form" onsubmit="return false;">
        <div class="form-group">
          <label for="file">File</label>
          <input id="file" type="file" class="form-control"/>
        </div>
        <button id="upload" type="button" class="btn btn-primary">Upload</button>
      </form>
    </div>)
  }
}

ReactDom.render(<App/>, document.getElementById('app'));
