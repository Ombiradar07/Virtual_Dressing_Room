import React, { useContext, useEffect, useState } from "react";
import myContext from "../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/cartSlice";

function ProductCard() {
  const context = useContext(myContext);
  const { mode, product } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // State to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // State to manage the uploaded image
  const [imageURL, setImageURL] = useState(null);

  // Categories list
  const categories = ["All", "Men", "Women", "Kids"];

  // Add to cart
  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? product
      : product.filter((item) => item.category === selectedCategory);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image clear
  const handleImageClear = () => {
    setImageURL(null);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        {/* Frame for the uploaded image */}
        <div className="mb-6 flex justify-center flex-col items-center">
          {imageURL ? (
            <>
              <div className="flex justify-center items-center w-full max-w-xl h-96 overflow-hidden">
                <img
                  src={imageURL}
                  alt="Full Body"
                  className="w-full h-full object-contain border-4 border-pink-600 rounded-lg"
                />
              </div>
              <button
                onClick={handleImageClear}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Clear Image
              </button>
            </>
          ) : (
            <label className="flex flex-col items-center bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 3.549l-1.41-1.41-6.36 6.36-6.36-6.36-1.41 1.41 6.36 6.36-6.36 6.36 1.41 1.41 6.36-6.36 6.36 6.36 1.41-1.41-6.36-6.36 6.36-6.36z" />
              </svg>
              <span className="mt-2 text-sm text-gray-600">
                Upload Full Body Image
              </span>
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>

        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        {/* Categories Bar */}
        <div className="flex justify-center mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 m-2 ${
                selectedCategory === category
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-lg focus:outline-none`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap -m-4">
          {filteredProducts.map((item) => {
            const { title, price, imageUrl, id } = item;

            return (
              <div
                key={id}
                onClick={() => (window.location.href = `/productinfo/${id}`)}
                className="p-4 md:w-1/4 drop-shadow-lg"
              >
                <div
                  className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div className="flex justify-center cursor-pointer">
                    <img
                      className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out"
                      src={imageUrl}
                      alt={title}
                    />
                  </div>
                  <div className="p-5 border-t-2">
                    <h2
                      className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Virtual Dressing Room
                    </h2>
                    <h1
                      className="title-font text-lg font-medium text-gray-900 mb-3"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {title}
                    </h1>
                    <p
                      className="leading-relaxed mb-3"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      ₹ {price}
                    </p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => addCart(item)}
                        type="button"
                        className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
