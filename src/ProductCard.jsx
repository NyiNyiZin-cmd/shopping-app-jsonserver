import React from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product, onAddToCart, isInCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{product.discount}%
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
            အသစ်
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-current"
                    : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through mr-2">
                {product.originalPrice.toLocaleString()} ကျပ်
              </span>
            )}
            <span className="text-xl font-bold text-gray-900">
              {product.price.toLocaleString()} ကျပ်
            </span>
          </div>
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          {product.stock > 0 ? (
            <span className="text-sm text-green-600 font-medium">
              ပစ္စည်း ရှိပါတယ် ({product.stock} ခု)
            </span>
          ) : (
            <span className="text-sm text-red-600 font-medium">
              ပစ္စည်း ကုန်နေပါတယ်
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0 || isInCart}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
            product.stock === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isInCart
              ? "bg-green-500 text-white cursor-default"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {product.stock === 0 ? (
            "ပစ္စည်း ကုန်နေပါတယ်"
          ) : isInCart ? (
            <>
              <CheckIcon className="w-5 h-5 mr-2" />
              Cart ထဲမှာ ပါပြီ
            </>
          ) : (
            <>
              <PlusIcon className="w-5 h-5 mr-2" />
              Cart ထဲ ထည့်မယ်
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
