import React from "react";

interface SidebarItemProps {
  type: string;
  label: string;
  icon?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ type, label, icon }) => {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("application/node-type", type);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="flex items-center gap-3 p-2 border rounded bg-white cursor-grab hover:shadow-sm"
    >
      <div className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 text-xs">
        {icon ?? "•"}
      </div>
      <div className="text-sm">{label}</div>
    </div>
  );
};

export default SidebarItem;
