import type { Channel } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface ChannelDetailsProps {
  channel: Channel;
}

// WIP: ひとまずの箱
const ChannelDetail: React.FC<ChannelDetailsProps> = ({ channel }) => {
  return (
    <div>
      ChannelDetails
      <Card>
        <CardHeader>
          <CardTitle>{channel.name}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ChannelDetail;
