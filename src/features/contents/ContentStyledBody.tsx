import type { Content } from "@/lib/types";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  body: Content["body"];
};

const ContentStyledBody = ({ body }: Props) => {
  const safeHTML = DOMPurify.sanitize(body);

  return (
    <div
      className="prose prose-sm max-w-none ProseMirror"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
};

export default ContentStyledBody;
