import type { Podcast } from "@/lib/types";
import Link from "next/link";

type Props = {
  podcast: Podcast;
};

export default function EpisodeParentChannel({ podcast }: Props) {
  return (
    <Link
      href={`/podcasts/${podcast.id}`}
      className="text-sm text-blue-600 hover:underline"
    >
      {podcast.title}
    </Link>
  );
}
