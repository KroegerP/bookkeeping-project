import { useState } from "react";



const PlaygroundPage = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="relative h-screen">
      <div className={expanded ? "hidden" : ""}>Element 1</div>
      <div className={expanded ? "hidden" : ""}>Element 2</div>

      <div
        onClick={toggleExpand}
        className={`absolute ${expanded ? "inset-0" : "top-0 left-0"} bg-blue-500 w-16 h-16 transition-all duration-500 ease-in-out`}
      >
      </div>
    </div>
  );
};

export default PlaygroundPage;