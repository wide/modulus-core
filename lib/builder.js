'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComponent = createComponent;
exports.createController = createController;
exports.createPlugin = createPlugin;
/**
 * Transform hypen-case to camelCase
 * @param {String} string 
 */
function toCamel(string) {
  var camelized = string.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
  return camelized.charAt(0).toUpperCase() + camelized.slice(1);
}

/**
 * Create component folder
 * @param {String} folder
 */
function createFolder(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    console.log('-> "' + folder + '" created');
  } else throw 'Folder "' + folder + '" already exists.';
}

/**
 * Create file
 * @param {String} folder
 * @param {String} name
 * @param {String} type
 * @param {String} content
 */
function createFile(folder, name, type, content) {
  fs.writeFileSync(folder + '/' + name + '.' + type, content);
  console.log('-> "' + folder + '/' + name + '.' + type + '" created');
}

/**
 * Generate component HTML template
 * @param {String} name 
 */
var componentHTMLTemplate = function componentHTMLTemplate(name) {
  return '<div class="' + name + '" data-mod="' + name + '">\n\n</div>';
};

/**
 * Generate component SCSS template
 * @param {String} name 
 */
var componentSCSSTemplate = function componentSCSSTemplate(name) {
  return '.' + name + ' {\n\n}';
};

/**
 * Generate component JS template
 * @param {String} name 
 */
var componentJSTemplate = function componentJSTemplate(name) {
  return 'import Component from \'modulus/component\'\n\nexport default class extends Component {\n\n  onInit() {\n\n  }\n\n}';
};

/**
 * Generate controller JS template
 * @param {String} name 
 */
var controllerJSTemplate = function controllerJSTemplate(name) {
  return 'import Component from \'modulus/component\'\n\nexport default class ' + toCamel(name) + ' extends Component {\n\n  onInit() {\n\n  }\n\n}';
};

/**
 * Generate plugin JS template
 * @param {String} name 
 */
var pluginJSTemplate = function pluginJSTemplate(name) {
  return 'import Plugin from \'modulus/plugin\'\n\nexport default class ' + toCamel(name) + ' extends Plugin {\n\n  onInit() {\n\n  }\n\n}';
};

/**
 * Create an empty component
 * @param {String} root 
 * @param {String} name 
 * @param {Function} done 
 */
function createComponent(root, name, done) {
  try {
    console.log('Creating "' + name + '" component:');
    createFolder(root, name);
    createFile(root, name, 'html', componentHTMLTemplate(name));
    createFile(root, name, 'scss', componentSCSSTemplate(name));
    createFile(root, name, 'js', componentJSTemplate(name));
    done();
  } catch (err) {
    console.error('Cannot create component:', err);
    throw err;
  }
}

/**
 * Create an empty controller
 * @param {String} root 
 * @param {String} name 
 * @param {Function} done 
 */
function createController(root, name, done) {
  try {
    console.log('Creating "' + name + '" controller:');
    createFile(root, name, 'js', controllerJSTemplate(name));
    console.log('Note: you need to register this controller in your "main.js"');
    done();
  } catch (err) {
    console.error('Cannot create controller:', err);
    throw err;
  }
}

/**
 * Create an empty plugin
 * @param {String} root 
 * @param {String} name 
 * @param {Function} done 
 */
function createPlugin(root, name, done) {
  try {
    console.log('Creating "' + name + '" plugin:');
    createFile(root, name, 'js', pluginJSTemplate(name));
    console.log('Note: you need to register this plugin in your "main.js"');
    done();
  } catch (err) {
    console.error('Cannot create plugin:', err);
    throw err;
  }
}
//# sourceMappingURL=builder.js.map