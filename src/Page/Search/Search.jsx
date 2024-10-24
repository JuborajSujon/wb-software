import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderDetails, setOrderDetails] = useState();
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    setOrderDetails(orderDetails);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchObj = {
      form_no: searchTerm,
      phone_no: orderDetails?.phone_no,
    };
    try {
      const res = await axios.post(
        "https://itder.com/api/search-purchase-data",
        searchObj
      );
      if (res.data.status_code === 201) {
        setSearchResults(res.data.singleCoursePurchaseData);
        toast.success(res.data.message, { autoClose: 1500 });
      } else {
        toast.error(res.data.message, { autoClose: 1500 });
      }
    } catch (error) {
      setSearchResults(null);
      console.log(error);
      toast.error(error.response.data.message, { autoClose: 1500 });
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-text_40px font-bold items-center justify-center px-4">
      <h1 className="w-[600px] text-center text-2xl sm:text-4xl">
        Search here
      </h1>
      <div className="h-[52px] relative col-span-4 w-[288px] sm:w-[600px] mx-auto">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-black px-2 w-72 sm:w-full block h-10 outline-0 rounded-[4px] border"
          />
          <button
            className="text-2xl text-black absolute right-2 top-2"
            type="submit">
            <IoMdSearch />
          </button>
        </form>
      </div>
      <div>
        {searchResults ? (
          <div className=" m-mt_16px">
            <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2 ">
              <div className="bg-white lg:p-p_30px w-full  ">
                <div className="text-center  flex flex-col justify-center items-center ">
                  <p className="text-xl font-bold">Order Information</p>
                  <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[hsl(253,64%,84%)] font-bold text-lg">
                    Order Id :
                    <span className="font-semibold">
                      {" "}
                      {searchResults?.form_no}
                    </span>
                  </p>
                </div>
                <div className="w-full border flex flex-col md:flex-row md:items-start   md:mt-4 mt-3 bg-[hsl(253,64%,84%)] rounded-md p-4  ">
                  <div className="md:text-base text-sm flex-1  font-semibold   md:border-r-2 md:border-black md:pr-10">
                    <div className="space-y-1 w-full">
                      <div className="flex items-center justify-between">
                        <p>Full Name :</p>
                        <p className="text-start">{searchResults?.name}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Mobile :</p>
                        <p>{searchResults?.phone_no}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Email :</p>
                        <p className="text-start">{searchResults?.email}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Father/Mother Name :</p>
                        <p className="text-start">
                          {searchResults?.father_name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Parent Mobile :</p>
                        <p>{searchResults?.father_phone_no}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>School/Collage Name :</p>
                        <p className="text-start">
                          {searchResults?.school_collage_name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Job Info :</p>
                        <p>{searchResults?.job_title}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:text-base text-sm  flex-1 font-semibold  md:ml-10 mt-m_medium">
                    <div className="space-y-1 w-full">
                      <div className="flex items-center justify-between">
                        <p>Gender :</p>
                        <p>{searchResults?.gender}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Present Address :</p>
                        <p className="text-start">
                          {searchResults?.present_address}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Permanent Address :</p>
                        <p>{searchResults?.permanent_address}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>NID NO :</p>
                        <p className="text-start">{searchResults?.nid_no}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Guardian Name :</p>
                        <p>{searchResults?.local_guardian_name}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Date Of Birth :</p>
                        <p className="text-start">
                          {searchResults?.date_of_birth}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Blood Group :</p>
                        <p className="text-start">
                          {searchResults?.blood_group}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:my-8 md:my-6 my-8 px-p_4px">
                  <p className=" md:my-2 font-semibold">Courses:</p>
                  <table className="overflow-x-auto border w-full">
                    <thead className="b w-full">
                      <tr className="text-sm ">
                        <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                          Image
                        </th>
                        <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                          Course Name
                        </th>
                        <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                          Student Name
                        </th>
                        <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border">
                          Quantity
                        </th>
                        <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                          Price (BDT)
                        </th>
                        <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                          Total Price (BDT)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="md:text-base text-sm font-semibold">
                      <tr>
                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                          <img
                            className="w-[60px] h-[60px]"
                            src={searchResults?.photo}
                            alt=""
                          />
                        </td>
                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                          {orderDetails?.course_name}
                        </td>
                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                          {searchResults?.name}
                        </td>
                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                          {searchResults?.course_qty}
                        </td>
                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                          {searchResults?.discount_course_fee}
                        </td>
                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                          {searchResults?.sub_total_course_fee}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className="font-bold">
                      <tr>
                        <td
                          colSpan={5}
                          className="lg:py-6 md:py-4 py-2 text-center border">
                          Grand Total Price
                        </td>
                        <td
                          colSpan={1}
                          className="lg:py-6 md:py-4 py-2 text-center border">
                          {searchResults?.sub_total_course_fee}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center font-bold text-xl">
              Item not found, Search by form no
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
