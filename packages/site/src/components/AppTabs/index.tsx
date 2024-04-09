import React, { Children, JSXElementConstructor, ReactElement, ReactNode, useState } from 'react';

type AppTabProps = {
  isActive?: boolean;
  header: string;
  ariaLabelledby?: string;
  position?: 'Left' | 'Right';
  children: ReactNode;
};

type Props = {
  children: Array<ReactElement<AppTabProps, JSXElementConstructor<unknown>>>;
};

export const AppTab = ({ isActive, position, ariaLabelledby, children }: AppTabProps) => {
  return (
    <div
      className={`
        basis-full shrink-0 grow-0 
        relative ${isActive ? `animate__slideIn${position} animate__animated` : 'hidden'}
      `}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </div>
  );
};

const AppTabs = ({ children }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nodes = Children.map(children, (node) => {
    if (node.type.name !== 'AppTab') {
      throw new Error('Use AppTab within AppTabs');
    }
    return node;
  });

  const onChange = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div>
      <ul
        className="
          flex relative before:absolute 
          before:bottom-[0.5px] before:left-0 
          before:right-0 before:contents-[''] 
          before:w-full before:h-[1px] before:bg-gray-300"
      >
        {nodes.map((node, index) => (
          <li key={node.props.header}>
            <button
              className={`
                px-2 py-2.5 flex items-center 
                justify-center w-full h-full text-dark
                text-sm relative before:transition before:absolute 
                before:bottom-0 before:left-0 
                before:right-0 before:contents-[''] 
                before:w-full before:h-0.5 font-medium
                ${activeIndex === index ? 'before:bg-primary opacity-100' : 'opacity-75'}
              `}
              id={`tabs_${index}`}
              aria-label={node.props.header}
              onClick={() => onChange(index)}
            >
              {node.props.header}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-nowrap overflow-hidden pt-6">
        {nodes.map((node, index) => (
          <AppTab
            key={node.props.header}
            {...node.props}
            isActive={activeIndex === index}
            ariaLabelledby={`tabs_${index}`}
            position={index % 2 === 0 ? 'Left' : 'Right'}
          />
        ))}
      </div>
    </div>
  );
};

export default AppTabs;
