import type { Content } from "@/lib/types";
import DOMPurify from "isomorphic-dompurify";

const ContentStyledBody = ({ content }: { content: Content }) => {
  const safeHTML = DOMPurify.sanitize(content.body);

  return (
    <div
      className="prose prose-sm max-w-none ProseMirror"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
};

export default ContentStyledBody;
