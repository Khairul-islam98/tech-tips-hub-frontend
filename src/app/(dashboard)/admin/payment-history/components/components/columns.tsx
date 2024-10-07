import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<any>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "profilePhoto",
    header: "Images",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.userId.profilePhoto} />
          <AvatarFallback className="bg-sky-500 text-white rounded-md">
            {row.original.userId.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.userId.name}</p>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <Badge
          style={
            row.original.status === "paid"
              ? { backgroundColor: "#86efac", color: "#fff" }
              : { backgroundColor: "#fb7185", color: "#fff" }
          }
          variant={"outline"}
        >
          {row.original.status}
        </Badge>
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
];
