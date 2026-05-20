import { useState, useEffect } from 'react'
import personService from './services/persons'


const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={type}>{message}</div>
  )
}

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
      <button type="submit">Add</button>
    </div>
  </form>
  )
}

const Person = ({ person, handleDelete }) => {
  return ( 
    <div> {person.name}: {person.number} <button onClick={() => handleDelete(person.id, person.name)}>Delete</button> </div>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return (
    <div> {persons.map(person => (<Person key={person.id} person={person} handleDelete={handleDelete} />))}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService.getAll().then(data => setPersons(data)).catch(() => {
      setError('Error loading phonebook data')
      setTimeout(() => { setError(null) }, 4000)
    }) 
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personExists = persons.find(person => person.name === newName)
      if (personExists) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const personUpdated = { ...personExists, number: newNumber }
          personService.update(personExists.id, personUpdated).then(personSaved => {
            setPersons(persons.map(person => person.id !== personExists.id ? person : personSaved))
            setNewName('')
            setNewNumber('')
            setNotification(`Updated ${personSaved.name}'s number`)
            setTimeout(() => { setNotification(null) }, 5000)
          })
          .catch(() => {
            setError(`Error updating ${personExists.name}`)
            setTimeout(() => { setError(null) }, 4000)
          })
        }
        return
      }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject).then(savedPerson => {
      setPersons(persons.concat(savedPerson))
      setNewName('')
      setNewNumber('')
      setNotification(`Added ${savedPerson.name}`)
      setTimeout(() => { setNotification(null) }, 5000)
    }).catch(() => {
      setError(`Error creating ${personObject.name}`)
      setTimeout(() => { setError(null) }, 4000)
    })
}

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification(`${name} deleted`)
        setTimeout(() => { setNotification(null) }, 5000)
      }).catch(() => {
        setError(`Error deleting ${name}`)
        setTimeout(() => { setError(null) }, 4000)
      })
    }
  }

  const personsShowed = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type="notification" />

      <Notification message={error} type="error" />
      
      <Filter searchName={searchName} setSearchName={setSearchName} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h3>Numbers</h3>

      <Persons persons={personsShowed} handleDelete={handleDelete} />

    </div>
  )
}

export default App