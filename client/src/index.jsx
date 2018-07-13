import React from 'react';
import ReactDom from "react-dom";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (<div><div className="row">
      <span className="col-xs-6">
      Some text!
      </span>
      <span className="col-xs-6">
      Some more text!
      </span>
      </div>
      <div className="row">
        <span className="col-xs-6">
        Some text!
        </span>
        <span className="col-xs-6">
        Some more text!
        </span>
        </div>
        </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));
