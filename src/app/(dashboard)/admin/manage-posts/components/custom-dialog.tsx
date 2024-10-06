import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface CustomDialogProps {
  title: string;
  children: React.ReactNode;
  triggerText: string;
  onClose: () => void;
}

const CustomDialog = ({ title, children, triggerText, onClose }: CustomDialogProps) => {
  return (
    <Dialog onOpenChange={onClose}>
      <DialogTrigger asChild>
        <button className="text-blue-500 underline">{triggerText}</button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-hidden">
        <DialogTitle>{title}</DialogTitle>

        {/* Scrollable Description */}
        <div className="overflow-y-auto max-h-[60vh] mt-4">
          <DialogDescription>{children}</DialogDescription>
        </div>

        <DialogClose asChild>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
