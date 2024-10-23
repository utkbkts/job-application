import { Badge } from "@/components/ui/badge";
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
import { useGetUserJobsQuery } from "@/redux/api/applicationApi";

const TablePart = () => {
  const { data } = useGetUserJobsQuery();
  console.log("🚀 ~ TablePart ~ data:", data);
  return (
    <div>
      <Table>
        <TableCaption>Başvurduğunuz işler</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tarih</TableHead>
            <TableHead>İş pozisyonu</TableHead>
            <TableHead>Şirket</TableHead>
            <TableHead>Durumu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.application?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{FormatDate(item?.updatedAt)}</TableCell>
              <TableCell>{item?.job?.title}</TableCell>
              <TableCell>{item?.job?.companyName}</TableCell>
              <TableCell>
                <Badge>{item?.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablePart;
