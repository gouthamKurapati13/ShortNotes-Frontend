import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Notecard from '../../components/Cards/Notecard'
import {MdAdd} from "react-icons/md"
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'

const HomePage = () => {

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([{}]);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
      setOpenAddEditModal({isShow: true, type: "edit", data: noteDetails});
  }


  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch(error) {
      if (error.response.status===401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const [toastMssg, setToastMssg] = useState({
    isShow: false,
    message: "",
    type: "add"
  });

  const handleShowToast = (mssg, type) => { 
    setToastMssg({
      isShow: true,
      message: mssg,
      type: type
    });
  }
  
  const handleCloseToast = () => { 
    setToastMssg({
      isShow: false,
      message: "",
    });
  }

  //Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/getAllNotes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch(error) {
      console.log(error)
      console.log("An unexpected error has occured");
    }
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {}
  }, []);

  useEffect(() => {
    return () => {} 
  }, [toastMssg.isShow]);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null
});

//Delete Note
const deleteNote = async (data) => {
  const noteId = data._id;
  try {
    const response = await axiosInstance.delete("/deleteNote/" + noteId);
    if (response.data && response.data.message) {
      handleShowToast("Note deleted successfully", "delete");
      getAllNotes();
    }
  } catch(error) { 
    if (error.response && error.response.data && error.response.data.message)
      console.log(error)
      // console.log("An unexpected error has occured");
  }
}

function getUnique(arr, index) {

  const unique = arr
       .map(e => e[index])

       // store the keys of the unique objects
       .map((e, i, final) => final.indexOf(e) === i && i)
  
       // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);      

   return unique;
}

  //Search Notes
  const onSearchNote = async (query) => {
    if (query === "") {
      setIsSearch(false);
      getAllNotes();
      return;
    }
    try {
      const response = await axiosInstance.get("/searchNotes", {
        params: { query: query }
      });
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
        setIsSearch(true);
      }
    } catch(error) {
      console.log("An unexpected error has occured");
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  //Handle Pin Note
  const handlePinNote = async (noteData) => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put("/updateIsPinned/" + noteId, {
          isPinned: !noteData.isPinned
      });

      if (response.data && response.data.note) {
          handleShowToast("Note pinned successfully");
          getAllNotes();
      }
  } catch(error) {
      if (error.response && error.response.data && error.response.data.message)
          console.log(error.response.data.message);
      else
          console.log(error)
          // console.log("An unexpected error has occured");
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
    <div>
      
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          {
            allNotes.map((item, index) => (
              <Notecard 
                key={item._id}
                title={item.title} 
                date={item.createdAt} 
                content={item.description} 
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={()=>handleEdit(item)}
                onDelete={()=>deleteNote(item)}
                onPinNote={()=>handlePinNote(item)}  
              />
            ))
          }
        </div>
      </div>
      <button 
       className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
       onClick={() => {
        setOpenAddEditModal({
          isShow: true,
          type: "add",
          data: null
        })
       }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      
      <Modal 
        isOpen={openAddEditModal.isShow}
        onRequestClose = {() => {}}
        style={{
            overlay: {backgroundColor: "rgba(0, 0, 0, 0.2)"},
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
          <AddEditNotes 
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            getAllNotes={getAllNotes}
            onClose={() => {
              setOpenAddEditModal({
                isShow: false,
                type: "add",
                data: null
              })
            }}
            showToast={handleShowToast}
          />
      </Modal>

      <Toast isShow={toastMssg.isShow} message={toastMssg.message} type={toastMssg.type} onClose={handleCloseToast} />

    </div>
  )
}

export default HomePage
