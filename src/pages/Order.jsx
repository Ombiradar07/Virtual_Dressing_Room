import React, { useContext } from "react";
import myContext from "../context/myContext";
import Layout from "../components/Layout";
import Loader from "../components/Loader";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;

  const cardStyle = {
    backgroundColor: mode === "dark" ? "#282c34" : "",
    color: mode === "dark" ? "white" : "",
  };

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="h-full pt-10 mb-[30%]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {order
              .filter((obj) => obj.userid == userid)
              .map((order) =>
                order.cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg shadow-md p-6"
                    style={cardStyle}
                  >
                    <img
                      src={item.imageUrl}
                      alt="product"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="mt-4">
                      <h2 className="text-lg font-bold" style={cardStyle}>
                        {item.title}
                      </h2>
                      <p className="mt-1 text-sm" style={cardStyle}>
                        {item.description}
                      </p>
                      <p className="mt-1 text-sm" style={cardStyle}>
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      ) : (
        <h2 className="text-center text-2xl" style={{ color: mode === "dark" ? "white" : "black" }}>
          No Order
        </h2>
      )}
    </Layout>
  );
}

export default Order;
