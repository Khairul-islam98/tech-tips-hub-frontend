"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import Image from "next/image"

import { formatDistanceToNow } from "date-fns"

   
   
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
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <p className="text-14-medium w-full md:w-28 lg:w-32">{row.original.name}</p>
        ),
      },
  
      {
        accessorKey: "email",
        header: "email",
        cell: ({ row }) => (
          <p className="text-14-medium w-full md:w-28 lg:w-32">{row.original.email}</p>
        ),
      },
      
      {
        accessorKey: "createdAt",
        header: "Time",
        cell: ({ row }) => (
          <div className="min-w-[115px]">
            <p className="text-14-medium">
              {"Login "}
              {formatDistanceToNow(new Date(row.original.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        ),
      },
    
    

  ]


