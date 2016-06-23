var React = require('react');
var ReactDom = require('react-dom');

var StorePicker = React.createClass({

  render : function() {
    return (
      <p>Hello!</p>
    )
  }
});

ReactDom.render(<StorePicker/>, document.querySelector('#main'))
