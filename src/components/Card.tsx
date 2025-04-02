import Image from "next/image";
import { useState } from "react";

export default function Card({ item }: { item: Item }) {
  const [activeImage, setActiveImage] = useState(
    item.images?.[0] || "/image1.png"
  );

  return (
    <div className="rounded-xl overflow-hidden shadow border bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="relative w-10 h-10">
          <Image
            src={item.author.avatar || "/avatar.png"}
            alt="avatar"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{item.author.name}</span>
          <span className="text-xs text-gray-500">@{item.author.username}</span>
        </div>
        <div className="ml-auto">
          <span className="text-gray-400 text-xl">😊</span>
        </div>
      </div>

      {/* Title */}
      <div className="px-4">
        <h2 className="font-semibold text-base">{item.title}</h2>
        <p className="text-xs text-gray-400 mt-1">21 JAN · INDUSTRIAL</p>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-[350px] mt-3">
        <Image
          src={activeImage}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 px-4 mt-4">
        {(
          item.images || [
            "/image1.png",
            "/image2.png",
            "/image3.png",
            "/image4.png",
          ]
        ).map((img, i) => (
          <div
            key={i}
            className={`relative w-14 h-14 rounded-md overflow-hidden border-2 cursor-pointer ${
              activeImage === img ? "border-gray-700" : "border-transparent"
            }`}
            onClick={() => setActiveImage(img)}
          >
            <Image src={img} alt="thumb" fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Pagination (Mock Example) */}
      <div className="flex justify-end px-4 mt-5 mb-4 gap-2">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            className={`w-7 h-7 text-sm rounded-full border ${
              num === 2 ? "bg-yellow-300" : "bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
