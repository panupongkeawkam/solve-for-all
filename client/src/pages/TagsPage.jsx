import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import store from "../store/index";
import { fetchTags } from "../store/tagSlice";
import { searchTags } from "../utils/lamda";

import EmptyData from "../components/EmptyData";
import TagDetail from "../components/TagDetail";
import TagDetailSkeleton from "../components/skeletons/TagDetailSkeleton";

export default ({}) => {
  const tags = useSelector((state) => state.tag.tags);
  const fetchingTags = useSelector((state) => state.tag.fetchingTags);
  const tagsPageTagSearchQuery = useSelector(
    (state) => state.tag.tagsPageTagSearchQuery
  );
  const navigate = useNavigate();

  const [displayedTags, setDisplayedTags] = useState([]);

  useEffect(() => {
    store.dispatch(fetchTags());
  }, []);

  useEffect(() => {
    setDisplayedTags(
      tags.map((tag, index) => (
        <div className="2xl:basis-1/4 lg:basis-1/3 p-2" key={index}>
          <TagDetail
            name={tag.name}
            totalQuestions={tag.questions.length}
            onView={() => navigate(`/tags/${tag._id}`)}
          />
        </div>
      ))
    );
  }, [tags]);

  useEffect(() => {
    const searchedTags = searchTags([...tags], tagsPageTagSearchQuery);
    setDisplayedTags(
      searchedTags.map((tag, index) => (
        <div className="2xl:basis-1/4 lg:basis-1/3 p-2" key={index}>
          <TagDetail
            name={tag.name}
            totalQuestions={tag.questions.length}
            onView={() => navigate(`/tags/${tag._id}`)}
          />
        </div>
      ))
    );
  }, [tagsPageTagSearchQuery]);

  return (
    <div className="flex flex-col">
      {/* sort section */}
      <div className="w-full flex flex-row justify-end items-center py-2 mb-3"></div>
      {/* content section */}
      <div className="flex flex-row flex-wrap w-full mb-10">
        {fetchingTags ? (
          Array(12).map(() => <TagDetailSkeleton />)
        ) : displayedTags.length > 0 ? (
          displayedTags
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
