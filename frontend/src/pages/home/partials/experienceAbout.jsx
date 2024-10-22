import { useGetAllusersQuery } from "@/redux/api/userApi";
const ExperienceAbout = () => {
  const { data: getAllUsers } = useGetAllusersQuery();
  const employerCount = getAllUsers?.users?.filter(
    (item) => item.userType === "işveren"
  ).length;
  const lastUser = getAllUsers?.users
    ?.slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  return (
    <div className="grid grid-cols-3 gap-12 w-full ">
      <div className="flex flex-col items-center">
        <h1>Kayıtlı olan kullanıcı sayısı</h1>
        <span className="font-bold text-2xl">
          {getAllUsers?.users?.length}+
        </span>
      </div>
      <div className="flex flex-col items-center">
        <h1>Kayıtlı olan işveren sayısı</h1>
        <span className="font-bold text-2xl">{employerCount}+</span>
      </div>
      <div className="flex flex-col items-center">
        <h1>Kayıtlı olan iş sayısı</h1>
        <span className="font-bold text-2xl ">200+</span>
      </div>
      <div className="flex flex-col items-center">
        <h1>En çok proje paylaşan kişi</h1>
        <span className="font-semibold text-xl ">yapım aşamasında</span>
      </div>
      <div className="flex flex-col items-center">
        <h1>En çok yorum yapan kişi</h1>
        <div className="flex gap-1 items-center">
          <img
            src={""}
            className="h-12 w-12 border-blue-400 border rounded-full"
            alt=""
          />
          <div>
            <span>@"as</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1>En son üye olan kullanıcı</h1>
        <div className="flex gap-1 items-center">
          <div>
            <span>@{lastUser?.fullname}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceAbout;
