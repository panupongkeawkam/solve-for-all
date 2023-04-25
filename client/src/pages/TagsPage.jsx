import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";

import palette from "../style/palette";
import store from "../store/index";
import { sortOptions } from "../utils/dummy";
import { fetchTags } from "../store/tagSlice";

import EmptyData from "../components/EmptyData";
import TagDetail from "../components/TagDetail";

export default (props) => {
  const tags = useSelector((state) => state.tag.tags);
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    store.dispatch(fetchTags());
  }, []);

  const sortChangeHandler = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="flex flex-col">
      {/* sort section */}
      <div className="w-full flex flex-row justify-end items-center py-2 mb-3"></div>
      {/* content section */}
      <div className="flex flex-row flex-wrap w-full mb-10">
        {tags?.length > 0 ? (
          tags.map((tag, index) => (
            <div className="2xl:basis-1/4 lg:basis-1/3 p-2" key={index}>
              <TagDetail
                name={tag.name}
                totalQuestions={tag.questions.length}
                onView={() => navigate(`/tags/${tag._id}`)}
              />
            </div>
          ))
        ) : (
          <div className="w-full 2xl:h-[720px] h-[480px]">
            <EmptyData
              title={"No tags"}
              description={"There is no any tags created"}
            />
          </div>
        )}
      </div>
    </div>
  );
};
