const { default: optionalChainingSyntax } = require('@babel/plugin-syntax-optional-chaining');
const { default: template } = require('@babel/template');
const { types: t } = require('@babel/core');


const myPlugin = () => {
  let lastImport = null;

  const importTemplate = template('import STUFF from "SOURCE"');

  return {
    name: "proposal-optional-chaining",
    inherits: optionalChainingSyntax,

    visitor: {
      "ImportDeclaration"(path) {
        lastImport = path;
      },

      "OptionalCallExpression|OptionalMemberExpression"(path) {
        const { object, property } = path.node;

        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('_'), t.identifier('get')),
            [object, t.stringLiteral(property.name)]
          )
        );

        const myImport = importTemplate({ STUFF: 'get', SOURCE: 'lodash/get' });
        if (lastImport) {
          lastImport.insertAfter(myImport);
        } else {
          path.findParent(p => p.key === 'program').unshiftContainer('body', myImport);
        }
      }
    },
  }
};

module.exports = myPlugin;
