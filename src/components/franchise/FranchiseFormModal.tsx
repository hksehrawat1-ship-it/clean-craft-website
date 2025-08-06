import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import DynamicFranchiseForm from "./DynamicFranchiseForm"; // direct import without lazy

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
      <DialogContent className="max-w-xl w-full max-h-[95vh] p-6 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Business Inquiry Form</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[85vh]">
          <DynamicFranchiseForm
            title={title}
            sourceCta={sourceCta}
            onClose={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FranchiseFormModal;
