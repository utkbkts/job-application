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
import { useGetMyAdsQuery } from "@/redux/api/jobsApi";

import { Edit, MoreHorizontal } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUpdatePostMutation } from "@/redux/api/applicationApi";

const TableDashboard = () => {
  const { data: myAds } = useGetMyAdsQuery();
  const [updatePost, { isSuccess, isError, error }] = useUpdatePostMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      toast.success("başarıla güncellendi");
      navigate(0);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, isSuccess, error, navigate]);

  const handleStatus = (newStatus, id) => {
    updatePost({ body: { status: newStatus }, id });
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
                  disabled={
                    app.status === "reddedildi" || app.status === "onaylandı"
                  }
                  defaultValue={app.status}
                  value={app.status}
                  onValueChange={(newStatus) =>
                    handleStatus(newStatus, app?._id)
                  }
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
