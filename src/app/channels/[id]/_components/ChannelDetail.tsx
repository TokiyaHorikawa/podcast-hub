import type { Podcast } from "@/lib/types";

type PodcastDetailProps = {
  podcast: Podcast;
};

export default function PodcastDetail({ podcast }: PodcastDetailProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{podcast.title}</h1>
        <p className="text-gray-600">{podcast.description}</p>
      </div>
      <div>
        <span className="text-sm text-gray-600">
          {new Date(podcast.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
