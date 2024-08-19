import React from "react";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";

const tmp_long_text =
  "ここにボディの内容が入ります。ここにボディの内容が入ります。<br />ここにボディの内容が入ります。ここにボディの内容が入ります。<br />ここにボディの内容が入ります。";

const ContentBody = () => {
  return (
    <CardContent>
      <Link href={"/contents/1"}>
        <div dangerouslySetInnerHTML={{ __html: tmp_long_text }} />
      </Link>
    </CardContent>
  );
};

export default ContentBody;
