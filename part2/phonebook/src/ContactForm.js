import React from "react";

const ContactForm = ({ values, addContact, handleChange }) => {
  return (
    <form onSubmit={addContact}>
      <div>
        <label htmlFor="name">name: </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="number">number: </label>
        <input
          type="tel"
          name="number"
          value={values.number}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default ContactForm;
