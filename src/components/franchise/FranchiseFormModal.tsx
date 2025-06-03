
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DynamicFranchiseForm from "./DynamicFranchiseForm";

interface FranchiseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  sourceCta: string;
}

const FranchiseFormModal: React.FC<FranchiseFormModalProps> = ({
  isOpen,
  onClose,
  title,
  sourceCta,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{title}</DialogTitle>
        </DialogHeader>
        <DynamicFranchiseForm
          title={title}
          sourceCta={sourceCta}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FranchiseFormModal;
