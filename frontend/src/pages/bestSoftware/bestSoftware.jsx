import { Badge, Calendar } from "lucide-react";

const developers = [
  {
    name: "Jane Doe",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    projectTitle: "Task Manager App",
    projectDescription:
      "A simple task management application that helps teams organize their work efficiently. Built using React and Node.js.",
    projectImage: "https://via.placeholder.com/400x200.png?text=Task+Manager",
    projectDate: "October 15, 2024",
    category: "Web Development",
  },
  {
    name: "John Smith",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    projectTitle: "E-Commerce Platform",
    projectDescription:
      "A scalable e-commerce platform built with microservices architecture, supporting payments, shipping, and order management.",
    projectImage:
      "https://via.placeholder.com/400x200.png?text=E-Commerce+Platform",
    projectDate: "September 10, 2024",
    category: "Software Engineering",
  },
  {
    name: "Alice Johnson",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    projectTitle: "Weather Forecast App",
    projectDescription:
      "A weather forecasting application that displays real-time weather data using APIs. Built with Flutter.",
    projectImage: "https://via.placeholder.com/400x200.png?text=Weather+App",
    projectDate: "August 22, 2024",
    category: "Mobile Development",
  },
  {
    name: "Mark Wilson",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    projectTitle: "Stock Market Analysis Tool",
    projectDescription:
      "An analytics tool that provides insights into stock market trends and performance metrics. Developed using Python and Pandas.",
    projectImage: "https://via.placeholder.com/400x200.png?text=Stock+Analysis",
    projectDate: "July 30, 2024",
    category: "Data Science",
  },
  {
    name: "Emily Davis",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    projectTitle: "Social Media Dashboard",
    projectDescription:
      "A comprehensive dashboard for managing multiple social media accounts and tracking performance metrics. Built with Django.",
    projectImage:
      "https://via.placeholder.com/400x200.png?text=Social+Media+Dashboard",
    projectDate: "June 18, 2024",
    category: "Full Stack Development",
  },
];

const BestSoftware = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 p-4">
      {developers.map((developer, index) => (
        <div
          key={index}
          className="w-full h-full rounded-lg border border-gray-200 shadow-md bg-white p-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Üst kısım: Kullanıcı Bilgileri */}
          <div className="flex items-center mb-4">
            <img
              src={developer.profilePic}
              alt={`${developer.name}'s Profile`}
              className="w-12 h-12 rounded-full object-cover border border-gray-300"
            />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {developer.name}
              </h2>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar size={16} className="mr-1" />
                {developer.projectDate}
              </div>
            </div>
          </div>

          {/* Proje Görseli */}
          <img
            src={developer.projectImage}
            alt={`${developer.projectTitle}`}
            className="w-full h-40 object-cover rounded-md mb-4"
          />

          {/* Proje Başlık ve Açıklama */}
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {developer.projectTitle}
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              {developer.projectDescription}
            </p>
          </div>

          {/* Kategori ve Etiket */}
          <div className="flex items-center justify-between mt-4">
            <Badge className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg">
              {developer.category}
            </Badge>
            <button className="text-purple-600 font-semibold hover:underline">
              Detayları Gör
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestSoftware;
