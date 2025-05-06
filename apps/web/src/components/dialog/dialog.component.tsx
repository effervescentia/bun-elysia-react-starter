import { template } from '@web/utils/template.util';
import { useContext } from 'react';

import { DialogContext } from './dialog.context';

const CancelButton: React.FC = () => {
  const { close } = useContext(DialogContext);

  return <button onClick={close}>Cancel</button>;
};

export const Dialog = template(
  ['Body', 'Actions'],
  ({ children, Body, Actions }) => (
    <div>
      <div>
        <Body />
      </div>
      {children}
      <div>
        <CancelButton />
        <Actions />
      </div>
    </div>
  ),
);
