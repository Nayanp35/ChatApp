import { Input, IconButton } from "@material-tailwind/react";

export default function ChatFooter({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-blue-gray-500/20 bg-blue-500/10 p-2">
        <Input
          resize="false"
          label="Your Message"
          className="!border-0 focus:border-transparent"
          id="message"
        />
        <div>
          <IconButton type="submit" variant="text" className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </IconButton>
        </div>
      </div>
    </form>
  );
}
