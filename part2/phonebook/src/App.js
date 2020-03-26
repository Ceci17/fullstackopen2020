import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import Contacts from "./Contacts";
import Heading from "./Heading";
import Notification from "./Notification";
import contactServices from "./services/contacts";
import Debug from "./Debug";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [values, setValues] = useState({ name: "", number: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({
    error: null,
    success: null
  });

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
      .then(response => {
        setPersons([...persons, response.data]);
        setToast({
          ...toast,
          success: `Succesfully added ${response.data.name} to the phonebook`
        });
        setTimeout(
          () =>
            setToast({
              error: null,
              success: null
            }),
          3000
        );
      })
      .catch(error =>
        setToast({
          ...toast,
          error: error.message
        })
      );

    setValues({ name: "", number: "" });
  };

  const handleRemove = id => {
    const found = persons.find(person => person.id === id);
    contactServices
      .remove(id, found)
      .then(response => {
        setToast({
          ...toast,
          success: `${found.name} is successfully removed from phonebook.`
        });
        setTimeout(() => setToast({ error: null, success: null }), 3000);
        return response.data;
      })
      .catch(error => {
        setToast({
          ...toast,
          error: `${found.name} is already removed from the phonebook`
        });
        setTimeout(() => setToast({ error: null, success: null }), 3000);
      });

    setPersons(persons.filter(person => person.id !== id));
  };

  const showContacts = persons?.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Heading title="Phonebook" />
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <Notification message={toast} />
      <ContactForm
        values={values}
        addContact={addContact}
        handleChange={handleChange}
      />
      <Heading title="Numbers" />
      <Contacts contacts={showContacts} handleRemove={handleRemove} />
      <Debug obj={toast} />
    </div>
  );
};

export default App;
