import React from 'react';

export const Opening: React.FC = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center">
      <h1 className="content__title text-left text-3xl font-bold my-6">
        Happenstance
      </h1>
      <div className="p-6">
        <p className="text-lg">Please login or sign up!</p>
        <p className="text-md mt-4">
          This app enables friends to connect and communicate based on
          their browsing activity.
        </p>
      </div>
    </div>
  );
};