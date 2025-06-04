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
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {/* Header title optional */}
          {/* <DialogTitle>Franchise Inquiry</DialogTitle> */}
        </DialogHeader>

        {/* Directly render form without Suspense */}
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
