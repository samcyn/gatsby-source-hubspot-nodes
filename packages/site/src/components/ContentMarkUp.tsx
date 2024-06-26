import React from 'react';

import AppTableOfContents, { Props as TableContentProps } from '@components/AppTableOfContents';

type Props = {
  title: string;
  tail: string;
  summary: string;
  contents: TableContentProps['contents'];
  children: React.ReactNode;
};

const ContentMarkUp = ({ title, tail, summary, contents, children }: Props) => {
  return (
    <>
      <div className="mt-6 md:mt-16 md:max-w-[500px] lg:max-w-[656px] mb-10 lg:px-6">
        <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark dark:text-white mb-6">
          {title} {tail && <span className="text-primary">{tail}</span>}
        </p>
        <p className="text-sm md:text-xl text-gray-80 dark:text-gray-50">{summary}</p>
      </div>
      <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-16 w-full">
        {contents.length > 0 ? <AppTableOfContents contents={contents} /> : null}
        <div className="overflow-hidden w-full lg:pl-6" id="mdxProviderId">
          {children}
        </div>
      </div>
    </>
  );
};

export default ContentMarkUp;
