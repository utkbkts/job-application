import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormatDate } from "@/helpers/formatDate";
import { useGetCompanyQuery } from "@/redux/api/companyApi";
import { Edit2, MoreHorizontal } from "lucide-react";
const TableDashboard = () => {
  const { data } = useGetCompanyQuery();
  console.log("🚀 ~ TableDashboard ~ data:", data);
  return (
    <Table>
      <TableCaption>Son kayıtlı şirketlerinizin listesi</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>İsim</TableHead>
          <TableHead>Tarih</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      {data?.company.map((com) => (
        <TableBody key={com._id}>
          <TableCell>
            <Avatar>
              <AvatarImage src={com?.logo?.url} />
            </Avatar>
          </TableCell>
          <TableCell>{com.companyName}</TableCell>
          <TableCell>{FormatDate(com?.createdAt)}</TableCell>
          <TableCell>
            <Popover>
              <PopoverTrigger>
                <MoreHorizontal />
              </PopoverTrigger>
              <PopoverContent className="w-32">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Edit2 size={15} />
                  <span>Düzenle</span>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableBody>
      ))}
    </Table>
  );
};

export default TableDashboard;
