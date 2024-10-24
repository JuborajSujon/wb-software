/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RiDeleteBin5Line } from "react-icons/ri";
import { BasicContext } from "../../ContextAPIs/BasicProvider";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { reload, setReload } = useContext(BasicContext);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("CourseDraft")) || [];

    setCart(storedCart);
  }, [reload]);

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
    <div className="m-mt_16px">
      <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">
        Cart
      </h1>
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
                    Discount Price
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
                <p className="text-black font-bold">TK {calculateTotal()}</p>
              </div>

              <Link
                to={`/checkout`}
                state={"bdt"}
                className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full">
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
