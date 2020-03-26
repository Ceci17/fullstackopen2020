import React from "react";

const Debug = ({ obj }) => {
  const show = JSON.stringify(obj, null, 2);
  return <div>Object: {show}</div>;
};

export default Debug;
