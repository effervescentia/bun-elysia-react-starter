import { usePlugins } from '@bltx/plop';
import type { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  usePlugins(plop);

  // REMOVE_ON_INIT
  plop.setGenerator('init', {
    description: 'initialize repository by rewriting key files',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'project name',
      },
    ],
    actions: [
      {
        type: 'modify',
        path: 'plopfile.ts',
        pattern: /\/\/ REMOVE_ON_INIT(\n.*)+REMOVE_ON_INIT/m,
        template: '',
      },
      {
        type: 'modify',
        path: 'README.md',
        pattern: /^.*$/m,
        template: '# {{kebabCase name}}',
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
        pattern: /^\s+"init":.*$/,
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
    ],
  });
  // REMOVE_ON_INIT
}
