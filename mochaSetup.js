// eslint-disable-next-line import/no-extraneous-dependencies
const { JSDOM } = require('jsdom');

const { window } = new JSDOM('<div class="app"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.css'] = function () {
  module.exports = () => ({});
}
