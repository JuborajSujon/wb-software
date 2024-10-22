import { useContext, useState } from "react";
import useProduct from "../../Hooks/useProduct";
import { BasicContext } from "../../ContextAPIs/BasicProvider";

const Courses = () => {
  const [product, isLoading] = useProduct();
  const { courseData = [] } = product || {};

  const { reload, setReload } = useContext(BasicContext);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const count = courseData?.length;
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const pages = [...Array(numberOfPages + 1).keys()].slice(1);

  // Handle Previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  // Handle Next page
  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // display product base on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = courseData?.slice(startIndex, endIndex);

  // Add to cart
  const addToCart = (course) => {
    const cart = JSON.parse(localStorage.getItem("CourseDraft")) || [];
    let existingCourse = cart.find((item) => item.id === course.id);
    if (existingCourse) {
      existingCourse.unitQuantities += 1;
    } else {
      cart.push({ ...course, unitQuantities: 1 });
    }

    localStorage.setItem("CourseDraft", JSON.stringify(cart));
    setReload(!reload);
  };

  return (
    <div className="m-mt_16px  flex flex-col items-center justify-between">
      {isLoading && (
        <div className="text-center text-3xl text-violet-600">Loading...</div>
      )}
      <div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-center justify-items-center">
        {displayedItems?.map((course) => (
          <div
            key={course.id}
            className=" bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
              <img src={course?.photo} alt="" />
              <div className="absolute top-0 left-0 p-2">
                <h3 className="text-white text-xl font-bold">
                  {course?.course_name}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-gray-800 text-lg font-semibold mb-2">
                {course?.course_name}
              </h2>
              <div className="flex items-center justify-between mb-4">
                <span className="flex text-blue-500 text-md">★★★★★</span>
                <span className="ml-2 text-gray-600 text-md font-bold">
                  {course?.trainer_data?.name}
                </span>
              </div>
              {/* <div className="flex gap-2 mb-4 flex-wrap">
                                {['Photography', 'Light set up', 'Camera angle', 'Self Development'].map((tag) => (
                                    <span key={tag} className="bg-yellow-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div> */}
              <p className="text-gray-600 text-md mb-4">
                Course Details{" "}
                <span className="text-blue-500">Show Details</span>
              </p>
              <hr />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="line-through text-gray-400 text-sm">
                    Tk {course?.regular_price}
                  </span>
                  <span className="text-green-600 text-md font-bold ml-2">
                    -70% ({course?.regular_price - course?.discount_price})
                  </span>
                  <span className="text-black text-lg font-bold ml-2">
                    Tk {course?.discount_price}
                  </span>
                </div>
                {/* <span className="text-green-600 text-sm">Earn Tk 48</span> */}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => addToCart(course)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 justify-center mt-8">
        <button
          onClick={handlePreviousPage}
          className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-300">
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-300 ${
              currentPage === page ? "!bg-violet-400 text-white" : ""
            }`}>
            {page}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default Courses;
