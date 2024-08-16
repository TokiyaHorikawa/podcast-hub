import React from "react";
import { CardContent } from "@/components/ui/card";

const tmp_long_text =
  "ここにボディの内容が入ります。ここにボディの内容が入ります。<br />ここにボディの内容が入ります。ここにボディの内容が入ります。<br />ここにボディの内容が入ります。";

const ContentBody = () => {
  return <CardContent dangerouslySetInnerHTML={{ __html: tmp_long_text }} />;
};

export default ContentBody;
