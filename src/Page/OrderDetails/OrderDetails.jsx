import { useContext } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";

const OrderDetails = () => {
  const { orderDetails } = useContext(OrderContext);

  const grandTotalPrice =
    orderDetails?.courseData?.length > 0
      ? orderDetails.courseData.reduce(
          (total, item) => total + item.unitQuantities * item.discount_price,
          0
        )
      : 0;

  return (
    <div className=" m-mt_16px">
      <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2 ">
        <div className="bg-white lg:p-p_30px w-full  ">
          <div className="text-center  flex flex-col justify-center items-center ">
            <p className="text-xl font-bold">Order Information</p>
            <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
              Order Id :
              <span className="font-semibold"> {orderDetails?.formNo}</span>
            </p>
          </div>
          <div className="w-full border flex flex-col md:flex-row md:items-start   md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4  ">
            <div className="md:text-base text-sm flex-1  font-semibold   md:border-r-2 md:border-black md:pr-10">
              <p className="font-bold md:mb-4 w-full">
                Demo information,Checkout page information will be here{" "}
              </p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Full Name :</p>
                  <p className="text-start">{orderDetails?.fullName}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Mobile :</p>
                  <p>{orderDetails?.mobile}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Email :</p>
                  <p className="text-start">{orderDetails?.email}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Father/Mother Name :</p>
                  <p className="text-start">{orderDetails?.parentName}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Parent Mobile :</p>
                  <p>{orderDetails?.parentNumber}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>School/Collage Name :</p>
                  <p className="text-start">{orderDetails?.school}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Job Info :</p>
                  <p>{orderDetails?.jobInfo}</p>
                </div>
              </div>
            </div>

            <div className="md:text-base text-sm  flex-1 font-semibold  md:ml-10 mt-m_medium">
              <p className="font-bold  md:mb-4 w-full">
                Demo information,Checkout page information will be here{" "}
              </p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Gender :</p>
                  <p>{orderDetails?.gender}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Present Address :</p>
                  <p className="text-start">{orderDetails?.presentAddress}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Permanent Address :</p>
                  <p>{orderDetails?.permanentAddress}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>NID NO :</p>
                  <p className="text-start">{orderDetails?.nid}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Guardian Name :</p>
                  <p>{orderDetails?.guardianName}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Date Of Birth :</p>
                  <p className="text-start">{orderDetails?.dob}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Blood Group :</p>
                  <p className="text-start">{orderDetails?.bloodGroup}</p>
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
                {orderDetails?.courseData?.map((course, index) => (
                  <tr key={index}>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      <img className="w-full" src={course?.photo} alt="" />
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {course?.course_name}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {orderDetails?.fullName}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {course?.unitQuantities}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {course?.discount_price}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {course?.discount_price * course?.unitQuantities}
                    </td>
                  </tr>
                ))}
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
                    {grandTotalPrice}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
