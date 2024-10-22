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
import { Edit2, MoreHorizontal } from "lucide-react";
const TableDashboard = () => {
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
      <TableBody>
        <TableCell>
          <Avatar>
            <AvatarImage src="" />
          </Avatar>
        </TableCell>
        <TableCell>Şirket ismi</TableCell>
        <TableCell>18-07-2024</TableCell>
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
    </Table>
  );
};

export default TableDashboard;
