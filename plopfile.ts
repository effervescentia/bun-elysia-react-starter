import { usePlugins } from '@bltx/plop';
import type { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  usePlugins(plop);

  // REMOVE_AFTER_THIS_POINT
  plop.setGenerator('init', {
    description: 'initialize repository by rewriting key files',
    actions: [
      {
        type: 'modify',
        path: 'plopfile.ts',
        pattern: /\/\/ REMOVE_AFTER_THIS_POINT.*\/\/ REMOVE_BEFORE_THIS_POINT/g,
        template: '',
      },
    ],
  });
  // REMOVE_BEFORE_THIS_POINT
}
