"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import Link from "next/link";
import { Button, Modal } from "antd";
import TrailerModal from "@/components/TrailerModal";

export default function Page() {
  // Tạo state chứa data
  const [data, setData] = useState([]);
  // Tạo state lưu page
  const [current, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=21b460812f19e8a02cd5c1ffba3d113d&language=vi-VN&page=${current}`
    ) // ${page}
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, [current]); // đem page bỏ dependency

  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrentPage(page);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="bg-red-500 h-[5vh]">
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-5">
          {/* Render cục này */}
          {data?.results?.map((movie, index) => (
            <div key={index} className="border border-red-100 p-2 rounded-lg">
              <Link href={`/movie/${movie?.id}`}>
                <img
                  className="rounded"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt=""
                />
                <h1 className="font-bold mt-2">{movie.title}</h1>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        current={current}
        onChange={onChange}
        total={data?.total_pages}
      />
    </div>
  );
}
