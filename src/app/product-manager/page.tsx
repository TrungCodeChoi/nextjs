"use client";
import React, { useState, useEffect } from "react";
import { Table, TableProps } from "antd";
import axios from "axios";
import Link from "next/link";

function Page({}) {
  const [data, setData] = useState();
  // console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get all data
        const data = await axios.get(`http://20.2.70.141:5000/api/v1/products`);
        setData(data?.data?.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const deleteProduct = async (productId: any) => {
    try {
      const response = await axios.delete(
        `http://20.2.70.141:5000/api/v1/products/delete/${productId}`
      );
      setData((updateData: any) => updateData.filter((item: any) => item._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    
  };
  type DataType = any;
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Ảnh sản phẩm",
      width: 100,
      dataIndex: "image",
      key: "image",
      fixed: "left",
      render: (image) => (
        <img src={image[0]} style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      title: "Tên sản phẩm",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Danh mục",
      width: 150,
      dataIndex: "category",
      key: "category",
      fixed: "left",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Giá giảm",
      dataIndex: "sale_price",
      key: "sale_price",
      width: 150,
    },
    {
      title: "Số lượng",
      dataIndex: "stock",
      key: "stock",
      width: 150,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (item) => (
        <div className="text-neutral-600">
          <button className="mx-[10px]">
            <Link href="/product-edit">Sửa</Link>
          </button>
          <button onClick={() => deleteProduct(item._id)}>Xóa</button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="border border-2 m-4 ">
        <Link href="/product-add">Them san pham</Link>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: 1500,
            y: 600,
          }}
        />
      </div>
    </div>
  );
}

export default Page;
