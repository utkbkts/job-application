import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const UploadImages = ({ onUpload }) => {
  const FileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState([]);
  const maxSize = 2 * 1024 * 1024;

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      return alert("En fazla 3 resim yükleyebilirsin.");
    }

    files.forEach((file) => {
      if (file.size > maxSize) {
        return toast.error("2MB'dan büyük resimler yükleyemezsiniz.");
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview((oldArray) => [...oldArray, reader.result]);
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImagePreviewDelete = (image) => {
    const filteredImagePreview = imagePreview.filter((img) => img !== image);
    setImagePreview(filteredImagePreview);
    onUpload(null);
  };

  return (
    <div className="mt-4">
      <div className="bg-gray-400">
        <Input
          type="file"
          name="product_images"
          multiple
          ref={FileInputRef}
          onChange={onChange}
        />
      </div>
      <div className="flex gap-2 mt-6">
        {imagePreview.length > 0 &&
          imagePreview.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                className="border object-cover border-gray-400 w-32 h-32 rounded-md"
                alt="Preview"
              />
              <button
                onClick={() => handleImagePreviewDelete(img)}
                type="button"
              >
                <Trash />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadImages;
