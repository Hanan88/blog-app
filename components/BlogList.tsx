import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import UpdateBlogModal from "./modals/UpdateBlogModal";
import CreateBlogModal from "./modals/CreateBlogModal";
import { FunctionComponent, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { Blog } from "@/types/types";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";

const BlogList: FunctionComponent = () => {
  const { isLoading, isError, data, error } = useFetchData<Blog[]>('/blogs');
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updateBlog, setUpdateBlog] = useState<Blog | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const deleteBlogMutation = useMutation(
    (id: number) => axiosInstance.delete(`/blogs/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs');
        setDeleteId(null);
      },
    }
  );

  const handleDelete = (id: number) => setDeleteId(id);
  const handleCloseDeleteModal = () => setDeleteId(null);

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      deleteBlogMutation.mutate(deleteId);
    }
  };

  const handleEdit = (blog: Blog) => setUpdateBlog(blog);
  const handleCloseUpdateModal = () => setUpdateBlog(null);

  const handleUpdate = async () => {
    if (updateBlog) {
      try {
        await axiosInstance.put(`/blogs/${updateBlog.id}`, updateBlog);
        queryClient.invalidateQueries('blogs');
        setUpdateBlog(null);
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    }
  };

  const handleCreateModalOpen = () => setIsCreateModalOpen(true);
  const handleCreateModalClose = () => setIsCreateModalOpen(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        className="px-4 py-2 mb-4 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleCreateModalOpen}
      >
        Create New Blog
      </button>
      <div className="flex flex-wrap justify-center gap-4">
        {data && data.map(blog => (
          <div key={blog.id} className="flex flex-col gap-1 p-4 bg-white rounded shadow-md lg:w-1/4 md:w-1/3 w-full">
            <div className='flex justify-between'>
              <h5 className='text-xs text-[#7b7b7b]'>{blog?.author}</h5>
              <h5 className='text-xs text-[#7b7b7b]'>{blog?.date}</h5>
            </div>
            <div>
              <Image src={blog?.image} width="200" height="200" alt="blog-image" className='w-full h-[200px] object-cover' />
            </div>
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className='text-sm'>{blog.description}</p>
            <div className="mt-2">
              <button
                type="button"
                className="px-4 py-2 mt-2 mr-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                onClick={() => handleEdit(blog)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="px-4 py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <DeleteConfirmationModal
        isOpen={deleteId !== null}
        onClose={handleCloseDeleteModal}
        onDelete={handleConfirmDelete}
      />
      <UpdateBlogModal
        isOpen={updateBlog !== null}
        onClose={handleCloseUpdateModal}
        blog={updateBlog}
        onUpdate={handleUpdate}
      />
      <CreateBlogModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
      />
    </div>
  );
};

export default BlogList;
