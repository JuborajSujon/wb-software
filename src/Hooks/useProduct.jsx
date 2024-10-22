import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProduct = () => {
  const {
    data: product = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axios.get(
        "https://itderbd.nextwebservice.com/api/get-course-list"
      );
      return res.data;
    },
  });
  return [product, isLoading, refetch];
};

export default useProduct;
