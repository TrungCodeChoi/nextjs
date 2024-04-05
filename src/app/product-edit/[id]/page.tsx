"use client";
import React, { useState, useEffect } from "react";
import { Input, Select, Button, message, Upload } from "antd";
const { TextArea } = Input;
import { useFormik } from "formik";
import axios from "axios";
import Link from "next/link";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useParams } from "next/navigation";
function Page() {
const { productId } = useParams();
  const [data, setData] = useState<any>();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await axios.get(
          `https://www.warriorcode.online/api/v1/products`
        );
        setData(productData?.data?.data);
        // console.log(productData?.data?.data);

        const categoryData = await axios.get(
          `https://www.warriorcode.online/api/v1/categories`
        );
        setCategories(categoryData?.data?.data);
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  
  const getOneProduct = async (productId: any) => {
    try {
      const response = await axios.get(
        `https://www.warriorcode.online/api/v1/products/${productId}`
      );
      console.log(response?.data?.data);
      
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      image: [],
      price: "",
      sale_price: "",
      stock: "",
      category: "",
      description: "",
    },
    onSubmit: async (values, productId) => {
      try {
        const response = await axios.put(
          `https://www.warriorcode.online/api/v1/products/update/${productId}`
        );
        console.log(response);
        console.log("Dữ liệu đã gửi thành công:", response.data);
        message.success("Cập nhật sản phẩm thành công");
      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        message.error("Cập nhật sản phẩm thất bại. Vui lòng thử lại sau.");
      }
    },
  });

  const { setFieldValue } = formik;
  useEffect(() => {
    if (productId) {
      console.log(getOneProduct(productId)); 
    }
  }, [productId]);
  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     setFieldValue("name", getOneProduct?.data?.data?.name);
  //   }
  // }, [data]);

  // console.log(data?.data);

  const image = {
    name: "image",
    action: "https://www.warriorcode.online/api/v1/upload/file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info: any) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} tải lên thành công`);
        const imageUrl = info.file.response.url;
        formik.setFieldValue("image", [...formik.values.image, imageUrl]);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} tải lên thất bại.`);
      }
    },
  };

  return (
    <div className="mx-auto container h-[100vh] bg-[white]">
      <div className="px-[20px]">
        <h1 className="font-medium text-center text-base pt-5">Sửa sản phẩm</h1>
        <form onSubmit={formik.handleSubmit} className="mt-[30px] w-[700px]">
          <div>
            <div className="mt-[10px]">
              <label htmlFor="name">Tên sản phẩm</label>
              <Input
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                type="text"
                placeholder="Tên sản phẩm"
              />
            </div>
            <div className="mt-[10px] grid">
              <label htmlFor="image">Thêm ảnh</label>
              <Upload {...image}>
                <Button icon={<UploadOutlined />}>Tải ảnh</Button>
              </Upload>
            </div>
            <div className="mt-[10px]">
              <label htmlFor="price">Giá</label>
              <Input
                id="price"
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                type="text"
                placeholder="Giá"
              />
            </div>
            <div className="mt-[10px]">
              <label htmlFor="sale_price">Giá giảm</label>
              <Input
                id="sale_price"
                name="sale_price"
                onChange={formik.handleChange}
                value={formik.values.sale_price}
                type="text"
                placeholder="Giá giảm"
              />
            </div>
            <div className="mt-[10px]">
              <label htmlFor="stock">Số lượng</label>
              <Input
                id="stock"
                name="stock"
                onChange={formik.handleChange}
                value={formik.values.stock}
                type="text"
                placeholder="Số lượng"
              />
            </div>
            <div className="mt-[10px] grid">
              <label htmlFor="category">Danh mục</label>
              <Select
                placeholder="Chọn danh mục"
                onChange={(value) => formik.setFieldValue("category", value)}
              >
                {categories.map((category: any) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="mt-[10px]">
              <label htmlFor="description">Mô tả</label>
              <TextArea
                rows={4}
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder="Mô tả"
              />
            </div>
          </div>
          <div>
            <button
              onChange={formik.handleChange}
              type="submit"
              className="p-3 bg-[#28a745] w-48 rounded mt-3 text-white text-center mr-5"
            >
              Cập nhật sản phẩm
            </button>
            <Link
              href="/product-manager"
              className="p-[14px] bg-[#dc3545] w-48 rounded mt-3 text-white text-center"
            >
              Quay lại
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
