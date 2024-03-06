import React from "react";

interface PauseIconProps {
  className?: string;
  fill?: string;
  width?: string;
  height?: string;
}

const PauseIcon: React.FC<PauseIconProps> = ({
  className,
  fill = "#ECEAE5",
  width = "10",
  height = "12",
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.39062 11.9365C0.645508 11.9365 0.276367 11.5674 0.290039 10.8428V1.29297C0.290039 0.568359 0.65918 0.192383 1.39062 0.192383H3.07227C3.79688 0.212891 4.16602 0.568359 4.16602 1.29297V10.8428C4.16602 11.5674 3.79688 11.9365 3.07227 11.9365H1.39062ZM6.9209 11.9365C6.18262 11.9365 5.82715 11.5674 5.82715 10.8428V1.29297C5.82715 0.568359 6.19629 0.192383 6.9209 0.192383H8.60938C9.33398 0.192383 9.70312 0.568359 9.70312 1.29297V10.8428C9.70312 11.5674 9.33398 11.9365 8.60938 11.9365H6.9209Z"
        fill={fill}
      />
    </svg>
  );
};

export default PauseIcon;
