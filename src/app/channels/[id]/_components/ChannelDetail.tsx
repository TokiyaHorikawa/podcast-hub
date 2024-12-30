import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Channel } from "@/lib/types";
import Image from "next/image";

interface ChannelDetailsProps {
  channel: Channel;
}

const ChannelDetail: React.FC<ChannelDetailsProps> = ({ channel }) => {
  return (
    <Card className="max-w-[750px] mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Image
            src={channel.imageUrl}
            alt={channel.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <CardTitle>{channel.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{channel.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ChannelDetail;
