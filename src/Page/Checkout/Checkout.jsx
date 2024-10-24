import { useContext, useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BasicContext } from "../../ContextAPIs/BasicProvider";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const { reload, setReload } = useContext(BasicContext);
  const { setOrderDetails } = useContext(OrderContext);
  const [previewSrc, setPreviewSrc] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navgivate = useNavigate();
  const courseId = cart.length > 0 ? cart[0].id : 0;
  const admission_date = new Date().toISOString();
  const courseFee = cart.length > 0 ? cart[0].regular_price : 0;
  const courseQty = cart.length > 0 ? cart[0].unitQuantities : 0;
  const totalCourseFee = courseFee * courseQty;
  const discountCourseFee = cart.length > 0 ? cart[0].discount_price : 0;
  const subTotalCourseFee = discountCourseFee * courseQty;

  // console.log(cart);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("CourseDraft")) || [];

    setCart(storedCart);
  }, [reload]);

  // Function to generate a 6-digit form ID
  const generateFormId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle file input change and set preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewSrc(null);
    }
  };

  // Update form state
  const onSubmit = async (data) => {
    const photo = data.photo[0];
    const updatadData = {
      ...data,
      admission_date,
      photo,
      course_id: courseId,
      course_fee: courseFee,
      course_qty: courseQty,
      total_course_fee: totalCourseFee,
      discount_course_fee: discountCourseFee,
      sub_total_course_fee: subTotalCourseFee,
      form_id: generateFormId(),
    };

    try {
      const response = await axios.post(
        "https://itder.com/api/course-purchase",
        updatadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Purchase successful!", { autoClose: 1500 });
        // Handle successful submission, e.g., reset form or navigate
        let data = response?.data?.coursePurchaseData;
        const newData = {
          ...data,
          course_name: cart[0].course_name,
        };

        setOrderDetails(newData);
        localStorage.setItem("orderDetails", JSON.stringify(newData));
        localStorage.setItem("CourseDraft", JSON.stringify([]));
        setReload(!reload);
        navgivate("/order-details");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.errors[0]}`, {
          autoClose: 1500,
        });
      } else if (error.request) {
        toast.error("No response from the server!", { autoClose: 1500 });
      } else {
        toast.error("An error occurred!", { autoClose: 1500 });
      }
    }
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
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
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
                {...register("name", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("phone_no", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.phone_no && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("father_name", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.father_name && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("father_phone_no", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.father_phone_no && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("school_collage_name", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.school_collage_name && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("job_title", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.job_title && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("email", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("gender", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2.5">
                <option value="default">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Other</option>
              </select>
              {errors.gender && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("present_address", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.present_address && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="permanent_address"
                className="block font-semibold text-base mb-2">
                Permanent Address:
              </label>
              <textarea
                id="permanent_address"
                {...register("permanent_address", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.permanent_address && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("nid_no", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.nid_no && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="blood_group"
                className="block font-semibold text-base mb-2">
                Blood Group:
              </label>
              <select
                id="blood_group"
                defaultValue="default"
                {...register("blood_group", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2.5">
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
              {errors.blood_group && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("local_guardian_name", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.local_guardian_name && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("local_guardian_phone_no", {
                  required: true,
                })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.local_guardian_phone_no && (
                <span className="text-red-500">This field is required</span>
              )}
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
                {...register("date_of_birth", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.date_of_birth && (
                <span className="text-red-500">This field is required</span>
              )}
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
                // name="photo"
                onChange={handleFileChange}
                {...register("photo", { required: true })}
                className="w-full border border-gray-300 rounded-md p-1.5"
              />

              {errors.photo && (
                <span className="text-red-500">This field is required</span>
              )}

              {/* Image Preview */}
              {previewSrc && (
                <div>
                  <h4>Image Preview:</h4>
                  <img
                    src={previewSrc}
                    alt="Preview"
                    style={{ maxWidth: "150px", marginTop: "10px" }}
                  />
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
