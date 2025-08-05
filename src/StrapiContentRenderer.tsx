import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface Props {
  content: any;
  className?: string;
}

const StrapiContentRenderer = ({ content, className = "" }: Props) => {
  if (!Array.isArray(content)) {
    return <p className="text-gray-400 italic">No content available.</p>;
  }

  return (
    <div className={className}>
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => <p className="mb-2">{children}</p>,
          link: ({ children, url }) => (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {children}
            </a>
          ),
        }}
      />
    </div>
  );
};

export default StrapiContentRenderer;
