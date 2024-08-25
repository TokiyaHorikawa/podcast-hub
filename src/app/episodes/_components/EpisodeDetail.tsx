import React from "react";
import type { PodcastEpisode } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import EpisodeParentChannel from "./EpisodeParentChanel";

interface EpisodeDetailProps {
  episode: PodcastEpisode;
}

const EpisodeDetail: React.FC<EpisodeDetailProps> = ({ episode }) => {
  return (
    <Card className="max-w-[750px] mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div>
            <CardTitle className="text-3xl font-bold">
              {episode.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              エピソードID: {episode.id}
            </p>
          </div>
        </div>
        <EpisodeParentChannel channel={episode.channel} />
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <div className="prose max-w-none">{episode.description}</div>
      </CardContent>
    </Card>
  );
};

export default EpisodeDetail;
