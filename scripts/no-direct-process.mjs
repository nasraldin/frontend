/** @type {import('eslint').Rule.RuleModule} */
const noDirectProcessRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct process. usage',
    },
    messages: {
      noProcessEnv: 'Direct process. usage is not allowed.',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (
          node.object.type === 'Identifier' &&
          node.object.name === 'process' &&
          node.property.type === 'Identifier' &&
          node.property.name === 'env'
        ) {
          context.report({
            node,
            messageId: 'noDirectProcess',
          });
        }
      },
    };
  },
};

export default noDirectProcessRule;
