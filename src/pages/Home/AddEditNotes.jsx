import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from "react-icons/md";
import axiosInstance from '../../utils/axiosInstance';


const AddEditNotes = ({noteData, type, onClose, getAllNotes, showToast}) => {

    const [title, setTitle] = useState(noteData ? noteData.title : "");
    const [description, setDescription] = useState(noteData ? noteData.description : "");
    const [tags, setTags] = useState(noteData ? noteData.tags : []);
    const [error, setError] = useState(null);


    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/addNote", {
                title: title,
                description: description,
                tags: tags
            });

            if (response.data && response.data.note) {
                showToast("Note added successfully");
                getAllNotes();
                onClose();
            }
        } catch(error) {
            if (error.response && error.response.data && error.response.data.message)
                setError(error.response.data.message);
            else
                setError("An unexpected error has occured");
        }
    }

    const editNote = async () => {
        const noteId = noteData._id;

        try {
          const response = await axiosInstance.put("/editNote/" + noteId, {
              title: title,
              description: description,
              tags: tags
          });

          if (response.data && response.data.note) {
              showToast("Note updated successfully");
              getAllNotes();
              onClose();
          }
      } catch(error) {
          if (error.response && error.response.data && error.response.data.message)
              setError(error.response.data.message);
          else
              setError("An unexpected error has occured");
      }
    }

    const handleAddNote = () => {
        if (!title) {
            setError("Enter the title");
            return;
        } else if (!description) {
            setError("Enter the description");
            return;
        }

        setError("");

        if (type==="edit")
            editNote();
        else if (type=="add")
            addNewNote();
    }

  return (
    <div className='relative'>
        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
            <MdClose className="text-xl text-slate-400" /> 
        </button>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input 
            type="text"
            className='text-2xl text-slate-950 outline-none'
            placeholder='Add the title for your note here'
            onChange={(e)=>{setTitle(e.target.value);}}
            value={title}
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>DESCRIPTION</label>
        <textarea 
            type="text"
            className='text-sm text-slate-950 outline-none p-2 rounded'
            placeholder='Add the description for your note here'
            rows={10}
            onChange={(e)=>{setDescription(e.target.value);}}
            value={description}
        />
      </div>
      <div className='mt-3'>
        <label className='input-label'>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className='text-red-500 text-xs pt-5'>{error}</p>}

      <button className='btn-primary font-medium mt-3 p-3' onClick={handleAddNote}>
        {type==="edit" ? "Update" : "Add"}
      </button>
    </div>
  )
}

export default AddEditNotes;
