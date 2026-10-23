import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-20 text-portal-dark">
      <LoaderCircle size={40} className="animate-spin" />
    </div>
  );
};

export default Loading;