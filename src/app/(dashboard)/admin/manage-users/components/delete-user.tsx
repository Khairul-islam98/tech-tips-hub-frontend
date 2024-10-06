import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteUser } from "@/hooks/user-hook";
import { Trash } from "lucide-react";


interface DeleteUserProps {
    id: string
    user: any
}


export const DeleteUser = ({id, user}: DeleteUserProps) => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        `Delete This User ${user.name}?`
      );
      const {mutate: deleteUser} = useDeleteUser()

    const handleDelete = async() => {
        console.log(id);
        const ok = await confirm();
        if (!ok) return
        deleteUser(id)
      
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

