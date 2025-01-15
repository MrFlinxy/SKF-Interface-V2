import React from "react";
import PropTypes from "prop-types";

let jsmeIsLoaded = false;
const jsmeCallbacks = {};

export function setup(src = "/jsme/jsme.nocache.js") {
  const script = document.createElement("script");
  script.src = src;
  document.head.appendChild(script);

  window.jsmeOnLoad = () => {
    Object.values(jsmeCallbacks).forEach((f) => f());
    jsmeIsLoaded = true;
  };
}

export class JsmeClass extends React.PureComponent {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.id = "jsme2025";
  }

  handleJsmeLoad = () => {
    if (this.props.options) {
      this.jsmeApplet = new window.JSApplet.JSME(
        this.id,
        this.props.width,
        this.props.height,
        { options: this.props.options },
      );
    } else {
      this.jsmeApplet = new window.JSApplet.JSME(
        this.id,
        this.props.width,
        this.props.height,
      );
    }
    this.jsmeApplet.setCallBack("AfterStructureModified", this.handleChange);
    this.jsmeApplet.readGenericMolecularInput(this.props.smiles);
    this.jsmeApplet.setMolecularAreaScale(2.0);
    this.jsmeApplet.setMenuScale(1.5);
  };

  handleChange = (jsmeEvent) => {
    if (this.props.onChange) {
      this.props.onChange(jsmeEvent.src.smiles());
    }
  };

  componentDidMount() {
    if (jsmeIsLoaded) {
      this.handleJsmeLoad();
    } else {
      if (!window.jsmeOnLoad) {
        setup(this.props.src);
      }
      jsmeCallbacks[this.id] = this.handleJsmeLoad;
    }
  }

  componentWillUnmount() {
    jsmeCallbacks[this.id] = undefined;
  }

  componentDidUpdate(prevProps) {
    if (this.jsmeApplet !== undefined && this.jsmeApplet !== null) {
      if (
        this.props.height !== prevProps.height ||
        this.props.width !== prevProps.width
      ) {
        this.jsmeApplet.setSize(this.props.width, this.props.height);
      }
      if (this.props.options !== prevProps.options) {
        this.jsmeApplet.options({ options: this.props.options });
      }
      if (this.props.smiles !== prevProps.smiles) {
        this.jsmeApplet.readGenericMolecularInput(this.props.smiles);
      }
    }
  }

  render() {
    return <div ref={this.myRef} id={this.id}></div>;
  }
}

JsmeClass.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  smiles: PropTypes.string,
  options: PropTypes.string,
  onChange: PropTypes.func,
  src: PropTypes.string,
};
