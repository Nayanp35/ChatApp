/* eslint-disable operator-linebreak */
export default function ChatUserDrawer({
  username,
  onClick,
  lastMessage,
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-row py-4 px-2 items-center border-b-2"
    >
      <div className="w-full">
        <div className="text-lg font-semibold">@{username}</div>
        <span className="text-gray-500">{lastMessage}</span>
      </div>
    </div>
  );
}
