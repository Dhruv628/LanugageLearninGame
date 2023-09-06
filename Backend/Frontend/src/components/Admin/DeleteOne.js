import React from "react";

const DeleteOne = (props) => {
  const { DeleteDisplay, Heading, ConfirmDelete, setDeleteDisplay } = props;
  return (
    <div
      className={`${
        DeleteDisplay
          ? "z-20 top-0 left-0 w-full flex justify-center items-center bg-black bg-opacity-[0.03] h-full fixed"
          : "hidden"
      }`}
    >
      <div className=" lg:space-y-2 xl:space-y-2 space-y-6 rounded-md z-30 bg-white lg:px-8 w-[90vw] px-4 py-6 lg:py-5 sm:w-[50vw] lg:w-[40vw] xl:w-[30vw]">
        <div className="text-center text-3xl font-semibold">{Heading}</div>
        <div className=" text-lg font-semibold">
          Do you really want to delete this?
        </div>
        <div className="flex justify-evenly">
          <button
            onClick={ConfirmDelete}
            className="px-5 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            YES
          </button>
          <button
            onClick={() => setDeleteDisplay(false)}
            className="px-5 py-2 rounded-sm bg-red-600 hover:bg-red-700 text-white"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOne;
