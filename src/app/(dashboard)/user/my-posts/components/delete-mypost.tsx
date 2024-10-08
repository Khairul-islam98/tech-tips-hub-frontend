import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-provider";
import { useDeletePost, useGetAllPosts, useGetMyPost } from "@/hooks/post-hook";
import { useConfirm } from "@/hooks/use-confirm";
import { Trash } from "lucide-react";
import { toast } from "sonner";


interface DeletePostProps {
    id: string
    postData: any
   
}


export const DeleteMyPost = ({id, postData}: DeletePostProps) => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        `Delete This Admin ${postData.title}?`
      );
     const {mutate: deletePost} = useDeletePost()
     const {user} = useUser()
     const {refetch} = useGetMyPost(user?.email)

    const handleDelete = async() => {
        console.log(id);
        const ok = await confirm();
        if (!ok) return
        deletePost(id, {
            onSuccess: () => {
                refetch()
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

