import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LoadingLink from './LoadingLink';

interface RelatedTool {
  name: string;
  href: string;
  description: string;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
}

const RelatedTools = ({ tools }: RelatedToolsProps) => {
  if (tools.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tools</h3>
      <div className="space-y-4">
        {tools.map((tool) => (
          <LoadingLink
            key={tool.href}
            href={tool.href}
            className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {tool.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors ml-2 flex-shrink-0" />
            </div>
          </LoadingLink>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;
