import React, { useEffect, useState } from "react";
import {
  ArrowUp,
  LucideImage,
  LucideList,
  LucideSparkles,
  LucideVideo,
} from "lucide-react";
import axios from "axios";

const tabs = [
  {
    label: "Answer",
    icon: LucideSparkles,
  },
  {
    label: "Images",
    icon: LucideImage,
  },
  {
    label: "Videos",
    icon: LucideVideo,
  },
  {
    label: "Sources",
    icon: LucideList,
    badge: 10,
  },
];

const DisplayResult = ({ searchInputRecord }) => {
  const [activeTab, setActiveTab] = useState("Answer");
  
  useEffect(() => {
    searchInputRecord && GetSearchApiResult();
  }, [searchInputRecord]);

  const GetSearchApiResult = async () => {
    const res = await axios.post("/api/brave-search-api", {
      searchInput: searchInputRecord?.searchinput,
      searchType: searchInputRecord?.searchtype,
    });
    console.log(res.data);
    console.log(JSON.stringify(res.data));
    return res.data;
  };

  return (
    <div className="mt-7">
      <h2 className="font-medium text-3xl line-clamp-2">
        {searchInputRecord?.searchinput}
      </h2>
      <div className="flex gap-4 mt-4">
        {tabs.map(({ label, icon: Icon, badge }) => (
          <button
            key={label}
            className={`flex items-center gap-2 px-3 py-1 rounded-md ${
              activeTab === label
                ? "bg-gray-200 text-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab(label)}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
            {badge && (
              <span className="bg-gray-300 text-gray-800 rounded-full px-2 text-xs font-medium">
                {badge}
              </span>
            )}
          </button>
        ))}
        <div className="ml-auto text-sm text-gray-500 flex">
          1 Task{" "}
          <span className="ml-1">
            <ArrowUp />
          </span>
        </div>
      </div>

      <div>
        {activeTab === "Answer" && (
          <div className="mt-4">
            <p className="text-gray-700">answer</p>
          </div>
        )}
        {activeTab === "Images" && (
          <div className="mt-4">
            <p className="text-gray-700">Images content goes here.</p>
          </div>
        )}
        {activeTab === "Videos" && (
          <div className="mt-4">
            <p className="text-gray-700">Videos content goes here.</p>
          </div>
        )}
        {activeTab === "Sources" && (
          <div className="mt-4">
            <p className="text-gray-700">Sources content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayResult;
