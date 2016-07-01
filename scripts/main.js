var React = require('react');
var ReactDom = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;

var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');


var App = React.createClass({
  getInitialState : function(){
    return {
      fishes : {},
      order : {}
    }
  },
  addFish : function(fish) {
    var timeStamp = (new Date()).getTime();
    //update state object
    this.state.fishes['fish-' + timeStatmp] = fish;
    //set the state
    this.setState({ fishes : this.state.fishes });
  },
  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish}/>
      </div>
    )
  }
})

/*
Add fish format
*/

var AddFishForm = React.createClass({
  createFish : function(event) {
    // stop submitting
    event.preventDefault();
    // create fish object
    var fish = {
      name : this.refs.name.value,
      price : this.refs.price.value,
      status : this.refs.status.value,
      desc : this.refs.desc.value,
      image : this.refs.image.value
    }
    // Add fish to app state
    this.props.addFish(fish)
  },
  render : function() {
    return (
      <form className="fish-edit" onSubit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price"/>
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image"/>
        <button type="submit">+ Add Item </button>
      </form>
    )
  }
});
var Header = React.createClass({
  render : function() {
    return (
      <header className="top">
        <h1>Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
})
var Order = React.createClass({
  render : function() {
    return (
      <p>Order</p>
    )
  }
})
var Inventory = React.createClass({
  render : function() {
    return (
      <div>
        <h2>Inventory</h2>

        <AddFishForm {...this.props} />
      </div>
    )
  }
})

var StorePicker = React.createClass({
  mixins : [History],
  goToStore : function(event) {
    event.preventDefault();
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId)
  },
  render : function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input type="text"ref="storeId" defaultValue={h.getFunName()} required />
        <input type="submit" />
      </form>
    )
  }
});

var NotFound = React.createClass({
  render : function() {
    return <h1>Not Found!</h1>
  }
})

/*
  Routes
*/

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDom.render(routes, document.querySelector('#main'));
