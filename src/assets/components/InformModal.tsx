import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

interface Props {
  message: string;
  shown: boolean;
}

const InformModal = ({ message, shown }: Props) => {
  return (
    <Modal show={shown}>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
    </Modal>
  );
};

export default InformModal;
