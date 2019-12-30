import path from 'path';

const js = {
  exclude: /node_modules/,
  ecmascript: true
};

export default {
  frame: 'react',
  entry: { index: [path.join(__dirname, 'example/index.js')] },
  resolve: {
    alias: { '@pasmd/pasmd': path.join(__dirname, 'packages/pasmd/src/pasmd') }
  },
  js,
  ts: js,
  sass: { include: /example/ },
  html: [
    { template: path.join(__dirname, 'example/index.pug'), excludeChunks: ['other'] }
  ],
  chainWebpack(config) {
    config.node.set('fs', 'empty');
  }
};