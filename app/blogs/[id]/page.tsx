"use client";

import { FunctionComponent, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Blog } from "@/types/types";

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

const BlogDetailPage: FunctionComponent<BlogDetailPageProps> = ({ params }) => {
  const { id } = params;

  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-white rounded shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-600">{blog.author}</p>
          <p className="text-sm text-gray-600">{blog.date}</p>
        </div>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <img
            src={blog.image}
            alt="Blog Image"
            className="rounded-lg object-cover w-auto h-56"
          />
        </div>
        <p className="text-base">{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogDetailPage;
