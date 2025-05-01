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
        type: 'append',
        path: 'apps/api/src/app/app.module.ts',
        pattern: /^/,
        template:
          "import { {{pascalCase name}}Controller } from '@api/{{kebabCase name}}/{{kebabCase name}}.controller';",
      },
      {
        type: 'append',
        path: 'apps/api/src/app/app.module.ts',
        pattern: /(?=;\s*$)/,
        template: '  .use({{pascalCase name}}Controller)',
      },
    ],
  });

  plop.setGenerator('endpoint', {
    description: 'api endpoint boilerplate',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'resource name',
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
    ],
    actions: [
      {
        type: 'append',
        path: 'apps/api/src/{{kebabCase name}}/{{kebabCase name}}.controller.ts',
        pattern: /^/m,
        template:
          "import { {{pascalCase name}}DTO } from '@api/{{kebabCase name}}/data/{{kebabCase name}}.dto';",
      },
      {
        type: 'append',
        path: 'apps/api/src/{{kebabCase name}}/{{kebabCase name}}.controller.ts',
        pattern: /(?=;\s*$)/,
        templateFile: '.plop/endpoint/controller.hbs',
      },
    ],
  });
}
