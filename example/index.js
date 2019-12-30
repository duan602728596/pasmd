/** @jsx pasmd.createVNode **/
/** @jsxFrag pasmd.Fragment **/
import pasmd, { Fragment } from './pasmd';
import App from './App';

pasmd.init()
  .then(() => {
    pasmd.render(
      <Fragment>
        <div className="app" id="app">
          <App />
        </div>
      </Fragment>,
      '#app'
    );
  });

if (module.hot) {
  module.hot.accept();
}