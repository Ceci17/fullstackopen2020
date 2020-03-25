import React from "react";

const Contact = ({ contact, handleRemove }) => {
  return (
    <li>
      <span>{contact.name}</span> <span>{contact.number}</span>
      <button onClick={() => handleRemove(contact.id)}>X</button>
    </li>
  );
};

export default Contact;
