import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import Contacts from "./Contacts";
import Heading from "./Heading";
import contactServices from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [values, setValues] = useState({ name: "", number: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    contactServices.getAll().then(response => setPersons(response.data));
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

    const found = persons?.find(person => person.name === newPerson.name);

    if (found) {
      if (
        window.confirm(
          `${values.name} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        const changedContact = { ...found, number: newPerson.number };
        contactServices
          .update(found.id, changedContact)
          .then(response =>
            setPersons(
              persons.map(person =>
                person.id === found.id ? response.data : person
              )
            )
          );
        setValues({ name: "", number: "" });
      }
      return;
    }

    contactServices
      .create(newPerson)
      .then(response => setPersons([...persons, response.data]));

    setValues({ name: "", number: "" });
  };

  const handleRemove = id => {
    contactServices.remove(id).then(response => response.data);
    setPersons(persons.filter(person => person.id !== id));
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
      <Contacts contacts={showContacts} handleRemove={handleRemove} />
    </div>
  );
};

export default App;
