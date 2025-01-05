import { Card } from "@/components/ui/card";
import React from "react";
import ContentBody from "./ContentBody";
import ContentFooter from "./ContentFooter";
import ContentHeader from "./ContentHeader";

const ContentCard = () => {
  return (
    <Card>
      <ContentHeader />
      <ContentBody />
      <ContentFooter />
    </Card>
  );
};

export default ContentCard;
