import React from "react";

// Define an interface for the component's props
interface PlayIconProps {
  fill?: string;
  width?: string;
  height?: string;
}

const PlayIcon: React.FC<PlayIconProps> = ({
  fill = "white", // Default fill color is white
  width = "12", // Default width
  height = "14", // Default height
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 14" // Adjust the viewBox based on your SVG's dimensions
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.29492 13.3809C0.652344 13.3809 0.132812 12.8887 0.132812 12.0684V2.07422C0.132812 1.25391 0.652344 0.768555 1.29492 0.768555C1.60938 0.768555 1.89648 0.864258 2.2793 1.08301L10.4824 5.84082C11.1113 6.20996 11.4258 6.54492 11.4258 7.07129C11.4258 7.60449 11.1113 7.93945 10.4824 8.30176L2.2793 13.0596C1.89648 13.2783 1.60938 13.3809 1.29492 13.3809Z"
        fill={fill} // Use the fill prop to dynamically set the fill color
      />
    </svg>
  );
};

export default PlayIcon;
