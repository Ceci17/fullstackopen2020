import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import Contacts from "./Contacts";
import Heading from "./Heading";

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [values, setValues] = useState({ name: "", number: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data));
  }, []);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const addContact = event => {
    event.preventDefault();
    const newPerson = {
      name: values.name,
      number: values.number
    };

    if (persons?.filter(person => person.name === values.name).length !== 0) {
      alert(`${values.name} is already added to phonebook`);
      return;
    }

    setPersons([...persons, newPerson]);
    setValues({ name: "", number: "" });
  };

  const showContacts = persons?.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Heading title="Phonebook" />
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <ContactForm
        values={values}
        addContact={addContact}
        handleChange={handleChange}
      />
      <Heading title="Numbers" />
      <Contacts contacts={showContacts} />
    </div>
  );
};

export default App;
