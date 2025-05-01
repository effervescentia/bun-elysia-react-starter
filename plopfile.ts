import path from 'node:path';

import fg from 'fast-glob';
import { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  plop.setGenerator('resource', {
    description: 'api resource boilerplate',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'resource name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'apps/api/src/{{kebabCase name}}/{{kebabCase name}}.controller.ts',
        templateFile: '.plop/resource/controller.hbs',
      },
      {
        type: 'add',
        path: 'apps/api/src/{{kebabCase name}}/data/{{kebabCase name}}.db.ts',
        templateFile: '.plop/resource/db.hbs',
      },
      {
        type: 'add',
        path: 'apps/api/src/{{kebabCase name}}/data/{{kebabCase name}}.dto.ts',
        templateFile: '.plop/resource/dto.hbs',
      },
      {
        type: 'modify',
        path: 'apps/api/src/app/app.module.ts',
        pattern: /^/,
        template:
          "import { {{pascalCase name}}Controller } from '@api/{{kebabCase name}}/{{kebabCase name}}.controller';\n",
      },
      {
        type: 'append',
        path: 'apps/api/src/app/app.module.ts',
        pattern: /(?=;\s*$)/,
        template: '  .use({{pascalCase name}}Controller)',
      },
    ],
  });

  plop.setGenerator('service', {
    description: 'service boilerplate',
    prompts: async (inquirer) => {
      const { name } = await inquirer.prompt<{ name: string }>([
        {
          type: 'input',
          name: 'name',
          message: 'service name',
        },
      ]);

      const controllers = await fg.glob('**/*.controller.ts', {
        cwd: path.join(__dirname, 'apps/api/src'),
      });

      const { controller } = await inquirer.prompt<{ controller: string }>([
        {
          type: 'list',
          name: 'controller',
          message: 'inject service into this controller',
          choices: controllers,
        },
      ]);

      const folder = path.dirname(controller);

      return { name, controller, folder };
    },
    actions: [
      {
        type: 'add',
        path: 'apps/api/src/{{folder}}/{{kebabCase name}}.service.ts',
        templateFile: '.plop/service/service.hbs',
      },
      {
        type: 'modify',
        path: 'apps/api/src/{{controller}}',
        pattern: /^/,
        template:
          "import { {{pascalCase name}}Service } from '@api/{{folder}}/{{kebabCase name}}.service';\n",
      },
      {
        type: 'append',
        path: 'apps/api/src/{{controller}}',
        pattern: /(?=;\s*$)/,
        template: '  .decorate({ service: new {{pascalCase}}Service() })',
      },
    ],
  });

  plop.setGenerator('endpoint', {
    description: 'api endpoint boilerplate',
    prompts: async (inquirer) => {
      const controllers = await fg.glob('**/*.controller.ts', {
        cwd: path.join(__dirname, 'apps/api/src'),
      });

      return inquirer.prompt<{
        controller: string;
        method: string;
        path: string;
      }>([
        {
          type: 'list',
          name: 'controller',
          message: 'inject service into this controller',
          choices: controllers,
        },
        {
          type: 'list',
          name: 'method',
          message: 'http method',
          choices: [
            'get',
            'put',
            'post',
            'head',
            'patch',
            'trace',
            'delete',
            'connect',
            'options',
          ],
        },
        {
          type: 'input',
          name: 'path',
          message: 'endpoint path',
          default: '/',
        },
      ]);
    },
    actions: [
      {
        type: 'append',
        path: 'apps/api/src/{{controller}}',
        pattern: /(?=;\s*$)/,
        templateFile: '.plop/endpoint/controller.hbs',
      },
    ],
  });
}
