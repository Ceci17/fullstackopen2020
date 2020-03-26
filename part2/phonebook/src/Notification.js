import React from "react";

const Notification = ({ message: { error, success } }) => {
  return (
    <div className="toast">
      {(error || success) && (
        <h3 className={error ? "error" : "success"}>
          {error ? error : success}
        </h3>
      )}
    </div>
  );
};

export default Notification;
