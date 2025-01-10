import summeryApi from "../common";
import { toast } from "react-toastify";

const RentAddToCart = async (e, id, selectedsize, deliverydate) => {
  e?.stopPropagation();
  e?.preventDefault();

  const response = await fetch(summeryApi.updatecart.url, {
    method: summeryApi.updatecart.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
      size: selectedsize,
      deliverydate: deliverydate,
    }),
  });

  const responseData = await response.json();
  if (responseData.success) {
    toast.success(responseData.message);
  }
  if (responseData.error) {
    toast.error(responseData.message);
  }
  return responseData;
};

export default RentAddToCart;
