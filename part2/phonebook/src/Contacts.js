import React from "react";
import Contact from "./Contact";

const Contacts = ({ contacts, handleRemove }) => {
  return (
    <ul>
      {contacts?.map(contact => (
        <Contact
          key={contact.number}
          contact={contact}
          handleRemove={handleRemove}
        />
      ))}
    </ul>
  );
};

export default Contacts;
