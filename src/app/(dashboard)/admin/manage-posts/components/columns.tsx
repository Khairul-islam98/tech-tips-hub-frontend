'use client'

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { UpdatePost } from "./update-post";
import { DeletePost } from "./delete-post";
import Image from "next/image";

import CustomDialog from "@/app/(dashboard)/admin/manage-posts/components/custom-dialog";
import dynamic from "next/dynamic";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

export const columns: ColumnDef<any>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <p className="text-14-medium w-full md:w-28 lg:w-32">{row.original.title}</p>
    ),
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => (
      <div className="flex gap-1 flex-wrap">
        {row.original.images.map((img: string, index: number) => (
          <Image key={index} width={50} height={50} src={img} alt={`img-${index}`} className="rounded" />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => <ContentCell content={row.original.content} />,
  },
  {
    accessorKey: "isPremium",
    header: "Premium",
    cell: ({ row }) => (
      <div>
        <Badge
          style={
            row.original.isPremium
              ? { backgroundColor: "#fb7185", color: "#fff" } 
              : { backgroundColor: "#86efac", color: "#fff" } 
          }
          variant="outline"
        >
          {row.original.isPremium ? "Premium" : "Free"}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <Badge variant='default' className="text-14-medium truncate text-white">{row.original.category}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "authorId",
    header: "Author Email",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <p className="text-14-medium truncate">{row.original.authorId.email}</p>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <UpdatePost postData={row.original} />
        <DeletePost id={row.original._id} postData={row.original} />
      </div>
    ),
  },
];

interface ContentCellProps {
  content: string;
}

const ContentCell = ({ content }: ContentCellProps) => {
  return (
    <div>
      <div className="cursor-pointer text-14-medium text-blue-600 overflow-hidden overflow-ellipsis whitespace-nowrap">
        <Renderer value={content} maxLength={50} />
        <CustomDialog title="Full Content" triggerText="Read more" onClose={() => {}}>
          <Renderer value={content} />
        </CustomDialog>
      </div>
    </div>
  );
};
