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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormatDate } from "@/helpers/formatDate";
import confirmed from "/confirmed.png";
import rejected from "/rejected.png";
import { useGetMyAdsQuery } from "@/redux/api/jobsApi";

import { Edit, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useUpdatePostMutation } from "@/redux/api/applicationApi";
import { motion } from "framer-motion";
function statusChange(status) {
  switch (status) {
    case "reddedildi":
      return <img src={rejected} />;
    case "onaylandı":
      return <img src={confirmed} className="h-20 w-20 rotate-45" />;
    default:
      return "bekliyor";
  }
}
const TableDashboard = () => {
  const { data: myAds } = useGetMyAdsQuery();
  const [status, setStatus] = useState("");
  const [updatePost, { isSuccess, isError, error }] = useUpdatePostMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("başarıla güncellendi");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, isSuccess, error]);

  const handleClick = async (id) => {
    await updatePost({ body: { status }, id });
  };

  const handleChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <Table>
      <TableCaption>Son gelen iş başvuruları</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Resim</TableHead>
          <TableHead>İsim</TableHead>
          <TableHead>Tarih</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Durum</TableHead>
        </TableRow>
      </TableHeader>
      {myAds?.job?.map((item) =>
        item?.applications?.map((app) => (
          <>
            <motion.div
              transition={{ duration: 1 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute right-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2"
            >
              {statusChange(app?.status)}
            </motion.div>
            <TableBody key={app._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={app?.applicant?.avatar?.url} />
                </Avatar>
              </TableCell>
              <TableCell>{app?.applicant?.fullname}</TableCell>
              <TableCell>{FormatDate(app?.createdAt)}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-44 flex flex-col gap-2">
                    <Link
                      to={app?.applicant?.profile?.resume}
                      target="_blank"
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-2 px-2"
                    >
                      <Edit size={15} />
                      <span>cv incele</span>
                    </Link>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <Select
                  value={app?.status || "bekliyor"}
                  onValueChange={(newStatus) => {
                    handleChange(newStatus);
                    handleClick(app?._id);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="bekliyor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="bekliyor">bekliyor</SelectItem>
                      <SelectItem value="onaylandı">onaylandı</SelectItem>
                      <SelectItem value="reddedildi">reddedildi</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableBody>
          </>
        ))
      )}
    </Table>
  );
};

export default TableDashboard;
