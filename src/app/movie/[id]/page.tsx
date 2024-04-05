"use client";
import TrailerModal from "@/components/TrailerModal";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>();

  const [cast, setCast] = useState<any>();

  const [review, setReview] = useState<any>();
  const [trailer, setTrailer] = useState<any>();

  const [active, setActive] = useState("overview");
  const onHandleOverview = () => {
    setActive("overview");
  };
  const onHandleCast = () => {
    setActive("cast");
  };

  const onHandleReview = () => {
    setActive("review");
  };

  // Tạo state lưu page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, cast, review, trailer] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${params.id}?api_key=21b460812f19e8a02cd5c1ffba3d113d&language=vi-VN`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=21b460812f19e8a02cd5c1ffba3d113d`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${params.id}/reviews?api_key=21b460812f19e8a02cd5c1ffba3d113d`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=21b460812f19e8a02cd5c1ffba3d113d`
          ),
        ]);
        setData(data.data);
        setCast(cast.data);
        setReview(review.data);
        setTrailer(trailer.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div>
      <div className="flex space-x-3">
        <button onClick={onHandleOverview}>Tổng quan</button>
        <button onClick={onHandleCast}>Diễn viên</button>
        <button onClick={onHandleReview}>Đánh giá</button>
      </div>
      <div className="flex justify-between">
        {/* Bentrai */}
        <div className="mt-6 w-[70%]">
          {/* Overview */}
          {active === "overview" && (
            <div>
              <div className="">My Post: {data?.title}</div>
              <div>
                <button>Tổng quan</button>
                <p>Các chiến binh muôn năm.</p>
                <p>TÓM TẮT NỘI DUNG</p>
                <p>{data?.overview}</p>
              </div>
            </div>
          )}

          {/* cast */}
          {active === "cast" && (
            <div>
              {cast?.cast &&
                cast?.cast
                  ?.slice(0, 8)
                  .map((item: any, index: any) => (
                    <h1 key={index}>Dien vien : {item.name}</h1>
                  ))}
            </div>
          )}

          {/* Review */}
          {active === "review" && (
            <div>
              {review?.results &&
                review?.results?.map((item: any, index: any) => (
                  <div key={index}>
                    <p>{item.author}</p>
                    <p>{item.content}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
        {/* Trailer */}
        <div className="gril w-[30%] py-[20px]">
          {trailer?.results &&
            trailer?.results
              .slice(0, 2)
              .map((item: any, index: any) => (
                <TrailerModal key={index} videoId={item.key} />
              ))}
        </div>
      </div>
    </div>
  );
}
