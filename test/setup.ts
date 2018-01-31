import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');

const { window } = jsdom;

const newGlobals = {
  window: { value: window },
  document: { value: window.document },
  navigator: { value: { userAgent: 'node.js' } }
};

// assigning directly to global fails in TypeScript, here's an ugly solution..
Object.defineProperties(global, newGlobals);
