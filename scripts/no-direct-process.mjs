/** @type {import('eslint').Rule.RuleModule} */
const noDirectProcessEnvRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct process.env usage',
    },
    messages: {
      noProcessEnv:
        'Direct process.env usage is not allowed. Use env from ~/env or clientEnv, serverEnv, instead.',
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
            messageId: 'noProcessEnv',
          });
        }
      },
    };
  },
};

export default noDirectProcessEnvRule;
