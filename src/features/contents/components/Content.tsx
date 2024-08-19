import React from "react";
import { Card } from "@/components/ui/card";
import ContentHeader from "./ContentHeader";
import ContentBody from "./ContentBody";
import ContentFooter from "./ContentFooter";

const Content = () => {
  return (
    <Card>
      <ContentHeader />
      <ContentBody />
      <ContentFooter />
    </Card>
  );
};

export default Content;
