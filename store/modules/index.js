const requireModule = require.context(".", true, /.store$/); //extract js files inside modules folder
const modules = {};

requireModule.keys().forEach(fileName => {
  if (fileName === "./index.js") return; //reject the index.js file

  const moduleName = fileName.replace(/(\.\/|\.js)/g, "").split('.')[0]; //

  modules[moduleName] = requireModule(fileName).default;
});

export default modules;
