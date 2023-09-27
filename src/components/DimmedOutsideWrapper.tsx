import React from 'react';
interface DimmedOutsideWrapperPropsInterface {
  children: React.ReactNode;
}

const DimmedOutsideWrapper = (props: DimmedOutsideWrapperPropsInterface) => {
  const { children } = props;

  return (
    <div className="dimmed-outside-wrapper">
      {children}
    </div>
  );
};

export default DimmedOutsideWrapper;
