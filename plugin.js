(() => {

  const code = `
    const a = window?.a;
  `;

  const myPlugin = () => {
    let lastImport = null;

    const importTemplate = babel.template('import STUFF from "SOURCE"');

    return {
      name: "proposal-optional-chaining",
      inherits: optionalChainingPlugin.default,

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

  console.log(
    babel.transformSync(code, {
      ast: true,
      plugins: [myPlugin]
    })
  );


})();
