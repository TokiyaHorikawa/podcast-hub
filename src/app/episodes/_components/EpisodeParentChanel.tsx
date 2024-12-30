import { CardTitle } from "@/components/ui/card";
import type { Channel } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const EpisodeParentChannel = ({ channel }: { channel: Channel }) => {
  return (
    <Link href={`/channels/${channel.id}`}>
      <div className="flex items-center space-x-4 mt-4">
        <Image
          src={channel.imageUrl}
          alt={channel.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <CardTitle className="text-lg font-normal">{channel.name}</CardTitle>
        </div>
      </div>
    </Link>
  );
};

export default EpisodeParentChannel;
