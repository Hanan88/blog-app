"use client";

import { FunctionComponent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import useFetchData from '../hooks/useFetchData';
import { Blog } from '../types/types';
import axiosInstance from '../utils/axiosInstance';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal';

const BlogList: FunctionComponent = () => {
  const { isLoading, isError, data, error } = useFetchData<Blog[]>('/blogs');
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<number | null>(null);

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
  const handleCloseModal = () => setDeleteId(null);

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      deleteBlogMutation.mutate(deleteId);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4">
        {data && data.map(blog => (
          <div key={blog.id} className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>{blog.description}</p>
            <div className="mt-2">
              <button
                className="px-4 py-2 mt-2 mr-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                onClick={() => console.log('Edit functionality')}
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
        onClose={handleCloseModal}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default BlogList;

