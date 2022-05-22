import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import './App.css';
import Main from './Components/Main';
import Sidebar from './Components/Sidebar';

function App() {

  // NOTES ARRAY WITH DEFAULT NOTE

  const [notes, setNotes] = useState(
    localStorage.notes
      ? JSON.parse(localStorage.notes)
      : [
          {
            id: '0',
            title: 'Заметка',
            body: '### Создайте свою *первую* **заметку**!\n\nВы можете использовать синтаксис Markdown для своего удобства.\n\n![](https://i.imgur.com/zaM39bJ.png)',
            lastModified: Date.now(),
          },
        ]
  );

  // LOCALSTORAGE

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  });

  const [activeNote, setActiveNote] = useState(false);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: 'Заметка без названия',
      body: '',
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
