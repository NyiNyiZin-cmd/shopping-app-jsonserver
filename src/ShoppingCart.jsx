import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import CartSidebar from "./CartSidebar";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { getProducts } from "./api/products";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, y: -20 },
};

// Category button component
const CategoryButton = ({ category, isActive, onClick }) => (
  <motion.button
    onClick={() => onClick(category)}
    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {category.charAt(0).toUpperCase() + category.slice(1)}
  </motion.button>
);

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCategories, setShowCategories] = useState(true);

  // Get unique categories from products
  const categories = useMemo(() => {
    const allCategories = [
      "all",
      ...new Set(products.map((p) => p.category || "uncategorized")),
    ];
    return allCategories.filter(Boolean);
  }, [products]);

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Update header spacer height when categories are toggled
  useEffect(() => {
    const updateSpacerHeight = () => {
      const header = document.getElementById('header');
      const spacer = document.getElementById('header-spacer');
      if (header && spacer) {
        spacer.style.height = `${header.offsetHeight}px`;
      }
    };

    // Initial update
    updateSpacerHeight();

    // Update on window resize
    window.addEventListener('resize', updateSpacerHeight);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateSpacerHeight);
  }, [showCategories]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Smooth scroll to products with offset for sticky header
    setTimeout(() => {
      const header = document.getElementById('header');
      const productsGrid = document.getElementById('products-grid');
      if (header && productsGrid) {
        const headerHeight = header.offsetHeight;
        const topOffset = productsGrid.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to allow state update and DOM reflow
  };

  // Fetch products from the JSON server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Cart တွင် item ထည့်ခြင်း
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Cart မှ item ဖယ်ရှားခြင်း
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Quantity အပ်ဒိတ်လုပ်ခြင်း
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Get total number of items in cart
  const getTotalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Cart ရဲ့ စုစုပေါင်း စျေးနှုန်း
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Fixed header with search and categories */}
      <div className="sticky top-0 z-25 bg-white shadow" id="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Cart Section */}
          <div className="py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">🛍️ My Shop</h1>

              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 text-gray-600 hover:text-gray-900 relative"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {getTotalItems}
                    </motion.span>
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="bg-white border-t border-gray-100">
            <div className="py-2">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 mb-1"
              >
                {showCategories ? (
                  <>
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    Hide Categories
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    Show Categories
                  </>
                )}
              </button>

              {showCategories && (
                <div className="pt-1">
                  <div className="flex space-x-2 pb-2 overflow-x-auto">
                    <AnimatePresence initial={false}>
                      {categories.map((category) => (
                        <CategoryButton
                          key={category}
                          category={category}
                          isActive={selectedCategory === category}
                          onClick={handleCategorySelect}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Scroll spacer to account for sticky header */}
          <div id="header-spacer" className="h-0 transition-all duration-200" />
          <motion.div
            className="bg-white rounded-lg shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">
                Total Products
              </h3>
              <p className="mt-1 text-3xl font-semibold text-blue-600">
                {products.length}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">
                Items in Cart
              </h3>
              <p className="mt-1 text-3xl font-semibold text-green-600">
                {getTotalItems}
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Total Price</h3>
              <p className="mt-1 text-3xl font-semibold text-purple-600">
                ${getTotalPrice().toFixed(2)}
              </p>
            </div>
          </motion.div>

          <div id="products-grid" className="min-h-[50vh]">
            {loading ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 text-lg">
                  Loading products...
                </p>
              </motion.div>
            ) : error ? (
              <motion.div
                className="text-center py-12 text-red-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      variants={item}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      whileHover={{
                        y: -8,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        transition: {
                          y: { type: "spring", stiffness: 400, damping: 15 },
                          boxShadow: { duration: 0.2 },
                        },
                      }}
                      className="h-full"
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={addToCart}
                        isInCart={cartItems.some(
                          (item) => item.id === product.id
                        )}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16 bg-white rounded-lg shadow"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <p className="text-lg text-gray-600">No products found</p>
                {selectedCategory !== "all" && (
                  <motion.button
                    onClick={() => setSelectedCategory("all")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Filters
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                "{searchTerm}" နဲ့ ကိုက်ညီတဲ့ ပစ္စည်း မတွေ့ရှိပါ
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
};

export default ShoppingCart;
