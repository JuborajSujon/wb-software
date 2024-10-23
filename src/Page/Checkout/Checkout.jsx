import { useContext, useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BasicContext } from "../../ContextAPIs/BasicProvider";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const { reload, setReload } = useContext(BasicContext);
  const { setOrderDetails } = useContext(OrderContext);
  const [formData, setFormData] = useState({
    fullName: "",
    formNo: "",
    parentName: "",
    parentNumber: "",
    school: "",
    jobInfo: "",
    email: "",
    gender: "",
    presentAddress: "",
    permanentAddress: "",
    nid: "",
    mobile: "",
    guardianName: "",
    dob: "",
    bloodGroup: "",
  });

  const navgivate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("CourseDraft")) || [];

    setCart(storedCart);
  }, [reload]);

  // Function to generate a 6-digit form ID
  const generateFormId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Update form state
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      courseData: cart,
      formNo: generateFormId(),
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderDetails(formData);
    localStorage.removeItem("CourseDraft");
    navgivate("/order-details");
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
                htmlFor="fullName"
                className="block font-semibold text-base mb-2">
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block font-semibold text-base mb-2">
                Mobile No:
              </label>
              <input
                type="text"
                id="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="parentName"
                className="block font-semibold text-base mb-2">
                Father/Mother Name:
              </label>
              <input
                type="text"
                id="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="parentNumber"
                className="block font-semibold text-base mb-2">
                Parent Mobile No:
              </label>
              <input
                type="text"
                id="parentNumber"
                value={formData.parentNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="school"
                className="block font-semibold text-base mb-2">
                School/College:
              </label>
              <input
                type="text"
                id="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="jobInfo"
                className="block font-semibold text-base mb-2">
                Job Information:
              </label>
              <input
                type="text"
                id="jobInfo"
                value={formData.jobInfo}
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
                htmlFor="presentAddress"
                className="block font-semibold text-base mb-2">
                Present Address:
              </label>
              <textarea
                id="presentAddress"
                value={formData.presentAddress}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="permanentAddress"
                className="block font-semibold text-base mb-2">
                Permanent Address:
              </label>
              <textarea
                id="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid"
                className="block font-semibold text-base mb-2">
                NID Number:
              </label>
              <input
                type="text"
                id="nid"
                value={formData.nid}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="bloodGroup"
                className="block font-semibold text-base mb-2">
                Blood Group:
              </label>
              <select
                id="bloodGroup"
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
                htmlFor="guardianName"
                className="block font-semibold text-base mb-2">
                Local Guardian’s Name:
              </label>
              <input
                type="text"
                id="guardianName"
                value={formData.guardianName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-semibold text-base mb-2">
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
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
