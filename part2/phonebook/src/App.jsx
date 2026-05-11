import { useState } from 'react'

const Filter = ({ searchName, setSearchName }) => {
  return (
    <div>
      filter shown with <input value={searchName} onChange={(event) => setSearchName(event.target.value)}/>
    </div>
  )
}

const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {
  return ( <form onSubmit={addPerson}>
    <div>
      name: {' '} <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
    </div>
    <div>
      number: {' '} <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Person = ({ person }) => {
  return ( 
    <div> {person.name}: {person.number} </div>
  )
}

const Persons = ({ persons }) => {
  return (
    <div> {persons.map(person => (<Person key={person.id} person={person} />))}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const nameExits = persons.some(person => person.name === newName)
    if (nameExits) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
}

  const personsShowed = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setSearchName={setSearchName} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h3>Numbers</h3>

      <Persons persons={personsShowed} />

    </div>
  )
}

export default App