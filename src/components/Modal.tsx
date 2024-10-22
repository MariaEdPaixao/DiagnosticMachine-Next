import { CloseButton, ModalContent, ModalOverlay } from "@/styles/styled";
import { ModalProps } from "@/types";

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    <ModalOverlay open={open} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} open={open}>
        <CloseButton onClick={onClose}>X</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}
