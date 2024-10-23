import { useContext, useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BasicContext } from "../../ContextAPIs/BasicProvider";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const { reload, setReload } = useContext(BasicContext);
  const { setOrderDetails } = useContext(OrderContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    formNo: "",
    father_name: "",
    father_phone_no: "",
    school_collage_name: "",
    job_title: "",
    email: "",
    gender: "",
    present_address: "",
    permanent_address: "",
    nid_no: "",
    phone_no: "",
    local_guardian_name: "",
    local_guardian_phone_no: "",
    date_of_birth: "",
    blood_group: "",
  });
  console.log(cart);
  const navgivate = useNavigate();
  // const courseFee = cart[0].regular_price;
  // const courseQty = cart[0].unitQuantities;
  // const totalCourseFee = 100000;
  // const discountCourseFee = 0;
  // const subTotalCourseFee = 100000;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("CourseDraft")) || [];

    setCart(storedCart);
  }, [reload]);

  // Function to generate a 6-digit form ID
  const generateFormId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Generate a URL for previewing the image
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
  };

  const handlePhotoUpload = () => {
    // Create FormData and append the file
    const formData = new FormData();
    formData.append("photo", file);
  };

  // Update form state
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      courseData: cart,
      formNo: generateFormId(),
      course_id: 1,
      admission_date: new Date().toISOString(),
      course_fee: 0,
      course_qty: 1,
      total_course_fee: 100000,
      discount_course_fee: 0,
      sub_total_course_fee: 100000,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handlePhotoUpload();
    console.log(formData);
    // setOrderDetails(formData);
    // localStorage.setItem("CourseDraft", JSON.stringify([]));
    // setReload(!reload);
    // navgivate("/order-details");
  };

  // Handle delete course from cart
  const handleDelete = (id) => {
    const storedCart = JSON.parse(localStorage.getItem("CourseDraft")) || [];
    const newCart = storedCart.filter((item) => item.id !== id);
    localStorage.setItem("CourseDraft", JSON.stringify(newCart));
    setReload(!reload);
  };

  // Handle increase quantity
  const handleIncrease = (id) => {
    const storedCart = JSON.parse(localStorage.getItem("CourseDraft")) || [];
    const updatedCart = storedCart.map((item) => {
      if (item.id === id) {
        return { ...item, unitQuantities: item.unitQuantities + 1 };
      }
      return item;
    });

    localStorage.setItem("CourseDraft", JSON.stringify(updatedCart));
    setReload(!reload);
  };

  // Handle decrease quantity
  const handleDecrease = (id) => {
    const storedCart = JSON.parse(localStorage.getItem("CourseDraft")) || [];
    const updatedCart = storedCart.map((item) => {
      if (item.id === id && item.unitQuantities > 1) {
        return { ...item, unitQuantities: item.unitQuantities - 1 };
      }
      return item;
    });

    localStorage.setItem("CourseDraft", JSON.stringify(updatedCart));
    setReload(!reload);
  };

  // Calculate subtotal for each course
  const calculateSubtotal = (courseId, discountPrice) => {
    const storedCart = JSON.parse(localStorage.getItem("CourseDraft")) || [];
    const course = storedCart.find((item) => item.id === courseId);

    return course ? course.unitQuantities * discountPrice : 0;
  };

  // Calculate total price for all courses
  const calculateTotal = () => {
    const storedCart = JSON.parse(localStorage.getItem("CourseDraft")) || [];

    return storedCart.reduce((total, item) => {
      return total + item.unitQuantities * item.discount_price;
    }, 0);
  };

  return (
    <div className="  mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6">
        {/* Trainee Information Section */}
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block font-semibold text-base mb-2">
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="phone_no"
                className="block font-semibold text-base mb-2">
                Mobile No:
              </label>
              <input
                type="text"
                id="phone_no"
                value={formData.phone_no}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="father_name"
                className="block font-semibold text-base mb-2">
                Father/Mother Name:
              </label>
              <input
                type="text"
                id="father_name"
                value={formData.father_name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="father_phone_no"
                className="block font-semibold text-base mb-2">
                Parent Mobile No:
              </label>
              <input
                type="text"
                id="father_phone_no"
                value={formData.father_phone_no}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="school_collage_name"
                className="block font-semibold text-base mb-2">
                School/College:
              </label>
              <input
                type="text"
                id="school_collage_name"
                value={formData.school_collage_name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="job_title"
                className="block font-semibold text-base mb-2">
                Job Information:
              </label>
              <input
                type="text"
                id="job_title"
                value={formData.job_title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2">
                Gender:
              </label>
              <select
                id="gender"
                defaultValue="default"
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2">
                <option value="default">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="present_address"
                className="block font-semibold text-base mb-2">
                Present Address:
              </label>
              <textarea
                id="present_address"
                value={formData.present_address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="permanent_address"
                className="block font-semibold text-base mb-2">
                Permanent Address:
              </label>
              <textarea
                id="permanent_address"
                value={formData.permanent_address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid_no"
                className="block font-semibold text-base mb-2">
                NID Number:
              </label>
              <input
                type="text"
                id="nid_no"
                value={formData.nid_no}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="blood_group"
                className="block font-semibold text-base mb-2">
                Blood Group:
              </label>
              <select
                id="blood_group"
                onChange={handleInputChange}
                defaultValue="default"
                className="w-full border border-gray-300 rounded-md p-2">
                <option value="default">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="local_guardian_name"
                className="block font-semibold text-base mb-2">
                Local Guardian’s Name:
              </label>
              <input
                type="text"
                id="local_guardian_name"
                value={formData.local_guardian_name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="local_guardian_phone_no"
                className="block font-semibold text-base mb-2">
                Local Guardian’s Phone:
              </label>
              <input
                type="text"
                id="local_guardian_phone_no"
                value={formData.local_guardian_phone_no}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="date_of_birth"
                className="block font-semibold text-base mb-2">
                Date of Birth:
              </label>
              <input
                type="date"
                id="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block font-semibold text-base mb-2">
                Student Photo
              </label>
              <input
                type="file"
                accept="image/*"
                id="photo"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />

              {preview && (
                <div>
                  <h3>Image Preview:</h3>
                  <img src={preview} alt="Preview" width="200px" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="m-mt_16px">
          <div className="pt-p_16px">
            <div className="lg:flex items-start gap-3">
              <div className="w-full lg:w-[58%] bg-white border-2">
                <table className=" overflow-x-auto  w-full">
                  <thead>
                    <tr className="border-b-4 border-gray-300">
                      <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                        Course
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Price
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Quantity
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Sub Total
                      </th>
                    </tr>
                  </thead>

                  <tbody className="overflow-x-auto ">
                    {cart?.map((item) => (
                      <tr
                        key={item.created_at}
                        className="border-b border-gray-300 overflow-x-auto">
                        <td>
                          <div className="flex items-center justify-center ">
                            <div className="w-[20%] text-center flex items-center justify-center ">
                              <RiDeleteBin5Line
                                onClick={() => handleDelete(item.id)}
                                className="text-xl hover:text-footer_color cursor-pointer"
                              />
                            </div>
                            <div className="flex flex-col text-center justify-center items-center py-2  w-[80%]">
                              <div className="mask">
                                <img
                                  className="h-[40px] w-[70px]"
                                  src={item?.photo}
                                  alt="Course"
                                />
                              </div>
                              <p className="text-[14.4px] px-[7px] text-center flex ">
                                {item?.course_name}
                                <span className="hidden lg:flex ">
                                  - TK {item?.regular_price}
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                            TK {item?.discount_price}
                          </p>
                        </td>
                        <td>
                          <div className="flex justify-center">
                            <div className="border">
                              <button
                                onClick={() => handleDecrease(item.id)}
                                className="px-4 w-[30px] font-bold font_standard my-1.5">
                                -
                              </button>
                            </div>
                            <div className="border-y">
                              <input
                                value={item?.unitQuantities}
                                readOnly
                                type="number"
                                className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
                              />
                            </div>
                            <div className="border">
                              <button
                                onClick={() => handleIncrease(item.id)}
                                className="px-4 w-[30px] font-bold font_standard my-1.5">
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                            TK {calculateSubtotal(item.id, item.discount_price)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="lg:w-[41%] bg-white border-2 ">
                <div className="px-[30px]">
                  <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                    Cart Summary
                  </h2>
                  <div className="py-3 flex justify-between border-b border-gray-300">
                    <p className="text-black font-bold">Total Price</p>
                    <p className="text-black font-bold">
                      TK {calculateTotal()}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
