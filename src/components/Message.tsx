import React from "react";

const Message: React.FC = () => {
  return (
    <div className="flex gap-1 text-slate-200">
      <span>
        <img
          src="https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv.jpg"
          alt="user image"
          className="m-auto h-8 w-8 rounded-full object-fill"
        />
        <p>Just now</p>
      </span>
      <span className="flex flex-col gap-1">
        <p className="flex flex-col justify-center rounded-b-lg rounded-r-lg bg-slate-600 p-1 text-left">
          Lorem ipsum
        </p>
        <img
          src="https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv.jpg"
          alt="photo which user sent"
          className="max-h-48 self-start rounded-sm"
        />
      </span>
    </div>
  );
};

export default Message;
