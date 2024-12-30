import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const tmp_long_text = {
  id: 1,
  paragraphs: [
    "ここにボディの内容が入ります。ここにボディの内容が入ります。",
    "ここにボディの内容が入ります。ここにボディの内容が入ります。",
    "ここにボディの内容が入ります。",
  ],
};

const ContentBody = () => {
  return (
    <CardContent>
      <Link href={`/contents/${tmp_long_text.id}`}>
        <div className="space-y-2">
          {tmp_long_text.paragraphs.map((text, i) => (
            <p key={`${tmp_long_text.id}-p-${i}`}>{text}</p>
          ))}
        </div>
      </Link>
    </CardContent>
  );
};

export default ContentBody;
