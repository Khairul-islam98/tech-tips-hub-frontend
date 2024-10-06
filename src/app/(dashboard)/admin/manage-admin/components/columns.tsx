
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import { Ellipsis } from "lucide-react";
import { EditAdmin } from "./edit-admin";
import { DeleteAdmin } from "./delete-admin";





export const columns: ColumnDef< any>[] = [
    
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.name}</p>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
         <p className="text-14-medium">{row.original.role}</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <Badge  style={
                  row.original.status === "active"
                    ? { backgroundColor: "#86efac", color: "#fff"}
                    : { backgroundColor: "#fb7185", color: "#fff"}
                }
                variant={"outline"}>{row.original.status}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
         <p className="text-14-medium">{row.original.email}</p>
      </div>
    ),
  },
 
 

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
     

      return (
        <div className="flex gap-2">
          
      
               <EditAdmin
                admin={row.original}
              />
              
           
              <DeleteAdmin
              
                id={row.original._id}
                admin={row.original}
              /> 
     
        
            
  
      </div>
      );
    },
  },
];
