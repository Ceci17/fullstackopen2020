import React from "react";
import Contact from "./Contact";

const Contacts = ({ contacts }) => {
  return (
    <ul>
      {contacts?.map(contact => (
        <Contact key={contact.number} contact={contact} />
      ))}
    </ul>
  );
};

export default Contacts;
