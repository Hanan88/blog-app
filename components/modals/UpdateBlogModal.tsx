import { Blog } from '@/types/types';
import axiosInstance from '@/utils/axiosInstance';
import { FunctionComponent, useState } from 'react';

interface UpdateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null;
  onUpdate: () => void;
}

const UpdateBlogModal: FunctionComponent<UpdateBlogModalProps> = ({
  isOpen,
  onClose,
  blog,
  onUpdate,
}) => {
  const [updatedBlog, setUpdatedBlog] = useState<Partial<Blog> | null>(null);

  const handleUpdate = async () => {
    if (updatedBlog && blog) {
      try {
        await axiosInstance.put(`/blogs/${blog.id}`, updatedBlog);
        onUpdate();
        onClose();
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Update Blog</h2>
        {blog && (
          <form>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                value={updatedBlog?.title || blog.title}
                onChange={e => setUpdatedBlog({ ...updatedBlog, title: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={updatedBlog?.description || blog.description}
                onChange={e => setUpdatedBlog({ ...updatedBlog, description: e.target.value })}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded mr-2 hover:bg-gray-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateBlogModal;
