import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteUser } from "@/hooks/user-hook";
import { Trash } from "lucide-react";
import { toast } from "sonner";


interface DeleteUserProps {
    id: string
    admin: any
}


export const DeleteAdmin = ({id, admin}: DeleteUserProps) => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        `Delete This Admin ${admin.name}?`
      );
      const {mutate: deleteUser} = useDeleteUser()

    const handleDelete = async() => {
        console.log(id);
        const ok = await confirm();
        if (!ok) return
        deleteUser(id, {
            onSuccess: () => {
                toast.success("Admin deleted successfully");
            }
        })
      
    }
    return (
        <>
             <ConfirmDialog />
            <Button className="" variant="destructive" onClick={handleDelete}>
                <Trash  size={16} />
            </Button>
        </>
    );
};

