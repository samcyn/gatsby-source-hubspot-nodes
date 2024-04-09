import * as React from 'react';
import AppThemeSwitcher from '@components/AppThemeSwitcher';

const AppHeader = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <header>
      <nav className="flex items-center justify-between py-4">
        <button aria-label="toggle menu" className="text-gray-80 dark:text-gray-80 text-4xl md:hidden" onClick={onOpen}>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" d="M5 7h14M5 12h14M5 17h14" />
          </svg>
        </button>
        <ul className="hidden md:flex gap-4">
          <li>
            <button className="text-xs text-primary flex items-center">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
              Back to Dashboard
            </button>
          </li>
        </ul>
        <ul className="flex gap-4 ml-auto">
          <li>
            <a
              className="text-gray-80 dark:text-gray-80"
              href="https://github.com/samcyn/gatsby-source-hubspot-node.git"
              target="_blank"
              aria-label="repo github link"
            >
              <span className="sr-only">repo github link</span>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
          <li>
            <AppThemeSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
