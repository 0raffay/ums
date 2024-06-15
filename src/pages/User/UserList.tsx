import { DataTable } from "@/components/common/DataTable";
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
];
import { useFetchUsersQuery } from "@/api/User";


export default function UserList() {
  const { data: users, error, isLoading } = useFetchUsersQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users.users} />
      rfafa
    </div>
  );
}
