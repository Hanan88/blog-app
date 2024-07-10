// components/Home.tsx

import Link from "next/link";
import { FunctionComponent } from "react";

const Banner: FunctionComponent = () => {
  return (
    <div className="w-screen h-screen bg-[##d4d8df] flex items-center justify-center">
      <div className="text-center">
        <div className="w-2/3 mx-auto text-2xl font-medium">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque, illo
          distinctio quam id dolorem quas dolorum voluptatibus provident
          temporibus ex ipsum odit commodi assumenda nobis accusantium vitae
          nihil, repellendus eum deserunt maxime magnam ipsa necessitatibus?
          Alias fugiat beatae deserunt sunt nesciunt. Unde assumenda nam
          accusantium, porro tenetur adipisci et omnis.
        </div>
        <div className="mt-4">
          <ul className="flex justify-center">
            <li className="mx-4">
              <Link href="/" className="text-blue-500 hover:text-blue-700">
                Home
              </Link>
            </li>
            <li className="mx-4">
              <Link href="/blogs" className="text-blue-500 hover:text-blue-700">
                Blogs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
