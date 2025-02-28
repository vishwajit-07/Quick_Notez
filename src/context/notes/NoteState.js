import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // MARK: Get all Notes
  const getNotes = async () => {
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem('token'),
        },
      }
    );

    const json = await response.json();
    setNotes(json);
  };

  // const getNotes = async () => {
  //   const token = localStorage.getItem("token");
  
  //   if (!token) {
  //     console.error("Authentication token not found.");
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": token,
  //       },
  //     });
  
  //     if (!response.ok) {
  //       console.error("Failed to fetch notes: Unauthorized.");
  //       return;
  //     }
  
  //     const json = await response.json();
  //     setNotes(json);
  //   } catch (error) {
  //     console.error("Error fetching notes:", error);
  //   }
  // };
  

  // MARK: ADD a Note
  const addNote = async (title, description, tag) => {
    // TODO: API call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    setNotes(notes.concat(json));
    console.log(json);
  };

  // MARK: DELETE a Note
  const deleteNote = async (id) => {
    // TODO: API call
    try {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    // Check if the response was successful
    if (!response.ok) {
      console.error('Failed to delete note');
      return;
    }

    const json = response.json();
    console.log(json);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  } catch (error) {
    console.error('Error while deleting note:', error);
  }
  };

  // MARK: UPDATE a Note
  const updateNote = async (id, title, description, tag) => {
    // API Call
    // try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      
    //   if (response.ok) {
    //     // Update the note in the state
    //     const updatedNotes = notes.map((note) =>
    //       note._id === id ? json.note : note
    //     );
    //     setNotes(updatedNotes);
    //     console.log("Note updated successfully on both frontend and backend.");
    //   } else {
    //     console.error("Failed to update note on the backend:", json);
    //   }
    // } catch (error) {
    //   console.error("Error updating note:", error);
    // }
  };

  return (
    <>
      <NoteContext.Provider
        value={{ notes, addNote, deleteNote, updateNote, getNotes }}
      >
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
