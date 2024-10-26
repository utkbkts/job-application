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
import { useMyProjectsQuery } from "@/redux/api/projectApi";
import { Edit2, MoreHorizontal } from "lucide-react";
const TableProjects = ({ searchQuery, onEdit }) => {
  const { data } = useMyProjectsQuery();
  const filteredProjects = data?.project?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Table>
      <TableCaption>Son Projeleriniz</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>resim</TableHead>
          <TableHead>Proje ismi</TableHead>
          <TableHead>Proje açıklaması</TableHead>
          <TableHead>Proje Linki</TableHead>
          <TableHead>Proje tarihi</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      {filteredProjects?.map((item) => (
        <TableBody key={item._id}>
          <TableCell>
            <Avatar>
              <AvatarImage src={item?.image?.map((item) => item.url)} />
            </Avatar>
          </TableCell>
          <TableCell>{item?.title}</TableCell>
          <TableCell>{item?.description.slice(0, 20)}...</TableCell>
          <TableCell>{item?.githubLink}</TableCell>
          <TableCell>{FormatDate(item?.createdAt)}</TableCell>
          <TableCell>
            <Popover>
              <PopoverTrigger>
                <MoreHorizontal />
              </PopoverTrigger>
              <PopoverContent className="w-32">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => onEdit(item._id)}
                >
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

export default TableProjects;
