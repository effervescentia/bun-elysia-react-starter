import fs from 'node:fs/promises';
import { usePlugins } from '@bltx/plop';
import type { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  usePlugins(plop);

  // REMOVE_ON_INIT
  plop.setGenerator('init', {
    description: 'initialize repository by rewriting key files',
    prompts: async (inquirer) => {
      const { name } = await inquirer.prompt<{ name: string }>([
        {
          type: 'input',
          name: 'name',
          message: 'project name',
        },
      ]);

      const { envPrefix } = await inquirer.prompt<{ envPrefix: string }>([
        {
          type: 'input',
          name: 'envPrefix',
          message: 'env variable prefix',
          default: name.toUpperCase(),
        },
      ]);

      return { name, envPrefix };
    },
    actions: [
      {
        type: 'modify',
        path: 'plopfile.ts',
        pattern: /\s+\/\/ REMOVE_ON_INIT.*REMOVE_ON_INIT/ms,
        template: '',
      },
      {
        type: 'modify',
        path: 'package.json',
        pattern: /"app"/,
        template: '"{{kebabCase name}}"',
      },
      {
        type: 'modify',
        path: 'package.json',
        pattern: /^\s+"init":.*\n/m,
        template: '',
      },
      {
        type: 'modify',
        path: 'apps/api/package.json',
        pattern: /"@app\/api"/,
        template: '"@{{kebabCase name}}/api"',
      },
      {
        type: 'modify',
        path: 'apps/web/package.json',
        pattern: /"@app\/api"/,
        template: '"@{{kebabCase name}}/api"',
      },
      {
        type: 'modify',
        path: 'apps/web/package.json',
        pattern: /"@app\/web"/,
        template: '"@{{kebabCase name}}/web"',
      },
      {
        type: 'modify',
        path: 'apps/web/index.html',
        pattern: /<title>App<\/title>/,
        template: '<title>{{titleCase name}}</title>',
      },
      {
        type: 'modify',
        path: 'apps/web/src/app/app.env.ts',
        pattern: /__app__/g,
        template: '{{snakeCase envPrefix}}',
      },
      {
        type: 'modify',
        path: 'tests/e2e/package.json',
        pattern: /"@app\/test-e2e"/,
        template: '"@{{kebabCase name}}/test-e2e"',
      },
      {
        type: 'modify',
        path: 'tests/e2e/playwright.config.mts',
        pattern: /__app__/g,
        template: '{{kebabCase name}}',
      },
      {
        type: 'modify',
        path: 'skaffold.yaml',
        pattern: /__app__/g,
        template: '{{kebabCase name}}',
      },
      {
        type: 'modify',
        path: 'README.md',
        pattern: /^.*$/s,
        template: '# {{kebabCase name}}\n',
      },
      {
        type: 'addMany',
        destination: '.',
        templateFiles: '.plop/init',
        base: '.plop/init',
      },
      async () => {
        await fs.rm('.plop/init', { recursive: true, force: true });

        return 'deleted .plop/init';
      },
    ],
  });
  // REMOVE_ON_INIT
}
