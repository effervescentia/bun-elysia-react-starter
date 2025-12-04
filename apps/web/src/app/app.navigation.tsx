import { routes } from './app.router';

export const AppNavigation: React.FC = () => (
  <nav>
    <ul>
      <li>
        <a {...routes.home().link}>home</a>
      </li>
    </ul>
  </nav>
);
