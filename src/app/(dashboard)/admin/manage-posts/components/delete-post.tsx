import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/hooks/post-hook";
import { useConfirm } from "@/hooks/use-confirm";
import { Trash } from "lucide-react";
import { toast } from "sonner";


interface DeletePostProps {
    id: string
    postData: any
}


export const DeletePost = ({id, postData}: DeletePostProps) => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        `Delete This Admin ${postData.title}?`
      );
     const {mutate: deletePost} = useDeletePost()

    const handleDelete = async() => {
        console.log(id);
        const ok = await confirm();
        if (!ok) return
        deletePost(id, {
            onSuccess: () => {
                toast.success("Post deleted successfully");
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

