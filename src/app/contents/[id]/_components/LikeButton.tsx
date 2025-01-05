"use client";

import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLike}>
      <ThumbsUp className="mr-2 h-4 w-4" />
      良いね ({likes})
    </Button>
  );
};

export default LikeButton;
