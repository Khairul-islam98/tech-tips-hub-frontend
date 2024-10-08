"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { DeleteMyPost } from "./delete-mypost"
import { UpdateMyPost } from "./update-mypost"
import CustomDialog from "@/app/(dashboard)/admin/manage-posts/components/custom-dialog"
import dynamic from "next/dynamic"
import { formatDistanceToNow } from "date-fns"
const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

   
   
  export const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <p className="text-14-medium w-full md:w-28 lg:w-32">{row.original.title}</p>
        ),
      },
      
      {
        accessorKey: "createdAt",
        header: "Time",
        cell: ({ row }) => (
          <div className="min-w-[115px]">
            <p className="text-14-medium">
              {" "}
              {formatDistanceToNow(new Date(row.original.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "upvotes",
        header: "Upvotes",
        cell: ({ row }) => (
          <div className="min-w-[115px]">
            <p className="text-14-medium truncate">{row.original.upvotes.length}</p>
          </div>
        ),
      },
      {
        accessorKey: "downvotes",
        header: "Downvotes",
        cell: ({ row }) => (
          <div className="min-w-[115px]">
            <p className="text-14-medium truncate">{row.original.downvotes.length}</p>
          </div>
        ),
      },
      {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row }) => (
          <div className="flex gap-2">
            <UpdateMyPost postData={row.original}  />
            <DeleteMyPost id={row.original._id} postData={row.original} />
          </div>
        ),
    }
    

  ]

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
