import React from "react";
import SidebarItem from "./SidebarItem";
import {
  PlayIcon,
  ClockIcon,
  UserPlusIcon,
  QuestionMarkCircleIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";

const Sidebar: React.FC = () => (
  <aside className="w-64 p-4 border-r bg-gray-50 h-full">
    <h2 className="font-semibold mb-4">Nodes</h2>

    <div className="space-y-2">
      <SidebarItem
        type="start"
        label="Start Trigger"
        icon={<PlayIcon className="w-5 h-5" />}
      />
      <SidebarItem
        type="condition"
        label="Condition"
        icon={<QuestionMarkCircleIcon className="w-5 h-5" />}
      />
      <SidebarItem
        type="sendMessage"
        label="Send Message"
        icon={<ChatBubbleBottomCenterIcon className="w-5 h-5" />}
      />
      <SidebarItem
        type="followUser"
        label="Follow User"
        icon={<UserPlusIcon className="w-5 h-5" />}
      />
      <SidebarItem
        type="wait"
        label="Wait Timer"
        icon={<ClockIcon className="w-5 h-5" />}
      />
    </div>
  </aside>
);

export default Sidebar;
