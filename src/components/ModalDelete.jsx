import Modal from "react-modal";
import { useContext, useState } from "react";
import userContext from "../contexts/userContexts.jsx";
import { deletePost, getPosts } from "../services/linkrAPI.jsx";

export default function ModalDelete() {
  const { modalIsOpen, setIsOpen, postIdtoDelete, setPostIdtoDelete } =
    useContext(userContext);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  let subtitle;

  function closeModal() {
    return setIsOpen(false);
  }

  function deleteOnePost() {
    deletePost(postIdtoDelete)
      .then((res) => {
        getPosts();
        setIsOpen(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        //  onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>No, go back</button>
        <button onClick={deleteOnePost}>Yes, delete it</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </>
  );
}
