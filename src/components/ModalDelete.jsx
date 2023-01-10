import Modal from "react-modal";
import { useContext } from "react";
import userContext from "../contexts/userContexts.jsx";
import { deletePost, getPosts } from "../services/linkrAPI.jsx";
import styled from "styled-components";

export default function ModalDelete() {
  const { modalIsOpen, setIsOpen, postIdtoDelete } = useContext(userContext);

  const customStyles = {
    overlay: {
      background: "",
    },
    content: {
      width: "100%",
      height: "100%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  };

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
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalContainer>
          <h2>Are you sure you want to delete this post?</h2>
          <div>
            <button onClick={closeModal}>No, go back</button>
            <button onClick={deleteOnePost}>Yes, delete it</button>
          </div>
        </ModalContainer>
      </Modal>
    </>
  );
}

const ModalContainer = styled.div`
  top: 50%;
  left: 50%;
  background-color: #333333;
  border-radius: 50px;
  width: 597px;
  height: 262px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  div {
    width: 295px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  button {
    background-color: #1877f2;
    border-radius: 5px;
    color: #ffffff;
    width: 134px;
    height: 37px;
    font-family: "Lato", sans-serif;
    font-weight: 700px;
    font-size: 18px;
    margin-top: 30px;
  }

  button:nth-child(2) {
    background-color: #ffffff;
    color: #1877f2;
  }

  h2 {
    width: 338px;
    height: 82px;
    font-family: "Lato", sans-serif;
    font-weight: 700px;
    font-size: 34px;
    color: #ffffff;
  }
`;
