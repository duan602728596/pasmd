/** @jsx pasmd.createVNode **/
/** @jsxFrag pasmd.Fragment **/
import pasmd, { Component, Fragment } from './pasmd';
import style from './app.sass';

class Text extends Component {
  constructor() {
    super();
  }

  render() {
    const { text } = this.props;

    return (
      <p>{ text }</p>
    );
  }
}

class Num extends Component {
  render() {
    const { num } = this.props;

    return (
      <b>{ num }</b>
    );
  }
}

class DisplayText extends Component {
  constructor() {
    super();

    this.state = { num: 1 };
  }

  handleChangeNumClick(event) {
    const { num } = this.state;

    this.setState({
      num: num + 1
    });
  }

  render() {
    const { num } = this.state;

    return (
      <div>
        <button type="button" onClick={ this.handleChangeNumClick.bind(this) }>Click</button>
        <span className={ style.textColor }>
          <Num num={ num } />
        </span>
      </div>
    );
  }
}

class App extends Component {
  state = {
    display: true
  };

  handleDisplayClick(event) {
    const { display } = this.state;

    this.setState({
      display: !display
    });
  }

  render() {
    const { display } = this.state;

    return (
      <Fragment>
        <button type="button" onClick={ this.handleDisplayClick.bind(this) }>Display</button>
        { display ? <Text text="Hello, world." /> : null }
        <DisplayText />
      </Fragment>
    );
  }
}

export default App;