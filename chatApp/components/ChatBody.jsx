export default function ChatBody({ position, content }) {
  return position === "start" ? (
    <div className="flex justify-start my-4 items-center">
      <div
        style={{ background: "blue", marginBottom: "10px" }}
        className="ml-2 py-3 px-4 rounded-full text-white max-w-lg"
      >
        {content}
      </div>
    </div>
  ) : (
    <div className="flex justify-end my-2 mx-2 items-center">
      <div
        style={{ background: "blue", marginBottom: "10px" }}
        className="mr-2 py-3 px-4 rounded-full text-white max-w-lg"
      >
        {content}
      </div>
    </div>
  );
}
