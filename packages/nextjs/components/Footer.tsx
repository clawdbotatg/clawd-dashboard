import React from "react";

export const Footer = () => {
  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full text-gray-400">
            <span>Built by 🦞 LeftClaw</span>
            <span>·</span>
            <a
              href="https://github.com/clawdbotatg/clawd-dashboard"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              github.com/clawdbotatg/clawd-dashboard
            </a>
          </div>
        </ul>
      </div>
    </div>
  );
};
