import StartNode from "./StartNode";
import ConditionNode from "./ConditionNode";
import SendMessageNode from "./SendMessageNode";
import FollowUserNode from "./FollowUserNode";
import WaitNode from "./WaitNode";

export const nodeTypes = {
  start: StartNode,
  condition: ConditionNode,
  sendMessage: SendMessageNode,
  followUser: FollowUserNode,
  wait: WaitNode,
};
