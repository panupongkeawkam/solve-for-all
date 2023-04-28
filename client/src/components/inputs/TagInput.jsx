import { useEffect, useState } from "react";
import { Link } from "@mui/material";
import * as Icon from "@mui/icons-material";

import palette from "../../style/palette";

import SmallSearchField from "./SmallSearchField";
import DeletableTag from "../DeletableTag";

export default ({
  selectedTags = [],
  tags,
  onTagChange,
  limitLength = -1,
  creatable = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownActive, setDropdownActive] = useState(false);
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTagsState, setSelectedTagsState] = useState(selectedTags);

  const searchQueryChangeHandler = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  // set to own state and send to parent
  const tagSelectHandler = (tag) => {
    let currentSelectedTagsState = [...selectedTagsState];
    currentSelectedTagsState.push(tag);

    setSearchQuery("");
    setSelectedTagsState(currentSelectedTagsState);
    onTagChange(currentSelectedTagsState);
  };

  // set to own state and send to parent
  const tagDeleteHandler = (tagName) => {
    let currentSelectedTagsState = [...selectedTagsState];
    currentSelectedTagsState = selectedTagsState.filter(
      (tag) => tagName !== tag.name
    );
    setSelectedTagsState(currentSelectedTagsState);
    onTagChange(currentSelectedTagsState);
  };

  // when tag not match can create new
  const tagCreateHandler = () => {
    // format to lower-case-tag-with-dash
    let newTagName = searchQuery
      .trim()
      .toLocaleLowerCase()
      .replaceAll(" ", "-");

    // if new tag is already added
    if (
      selectedTagsState.find((selectedTag) => selectedTag.name === newTagName)
    ) {
      setSearchQuery("");
      return;
    }

    let newTag = {
      _id: null,
      name: newTagName,
    };

    tagSelectHandler(newTag);
  };

  // watch when search query change
  useEffect(() => {
    setFilteredTags(
      tags.filter(
        (tag) =>
          searchQuery.trim() !== "" &&
          tag.name.includes(searchQuery.trim().toLocaleLowerCase())
      )
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col w-full">
      <div className={`basis-full relative`}>
        {/* search field */}
        <div className="w-full">
          <SmallSearchField
            onBlur={() => setDropdownActive(false)}
            onFocus={() => setDropdownActive(true)}
            searchQuery={searchQuery}
            placeholder="Find tags (e.g. graphic-design, math)"
            onSearchQueryChange={searchQueryChangeHandler}
            icon={<Icon.LocalOfferOutlined sx={{ fontSize: "16px" }} />}
            disabled={selectedTagsState.length === limitLength}
            inputProps={{
              maxLength: 30,
            }}
          />
        </div>
        {/* dropdown element */}
        <ul
          className="absolute w-full rounded-[8px] py-2 max-h-[200px] overflow-auto z-[6000]"
          style={{
            backgroundColor: palette["base-3"],
            display:
              dropdownActive && searchQuery.trim() !== "" ? "initial" : "none",
          }}
        >
          {filteredTags.length > 0 ? (
            filteredTags.map((tag, index) =>
              // find when tag has selected, then disable an element
              selectedTagsState.find(
                (selectedTag) => selectedTag.name === tag.name
              ) !== undefined ? (
                // disable click
                <li
                  key={index}
                  className={`px-3 py-1 cursor-not-allowed`}
                  style={{
                    color: palette["content-2"],
                  }}
                >
                  {tag.name}
                </li>
              ) : (
                // enable click
                <li
                  key={index}
                  className={`px-3 py-1 hover:bg-gray-700 cursor-pointer`}
                  style={{
                    color: palette["content-1"],
                  }}
                  onMouseDown={() => tagSelectHandler(tag)}
                >
                  {tag.name}
                </li>
              )
            )
          ) : (
            // when filtered tag result is empty
            <li
              className="h-[120px] flex flex-col justify-center items-center"
              style={{ color: palette["content-2"] }}
            >
              <div style={{ fontSize: "16px" }}>No tag match</div>
              {creatable ? (
                // create new button
                <Link
                  onMouseDown={() => tagCreateHandler()}
                  color="secondary"
                  sx={{ fontSize: "16px" }}
                >
                  Create new
                </Link>
              ) : null}
            </li>
          )}
        </ul>
      </div>
      <div
        className="w-full flex flex-row"
        style={{
          display: limitLength !== -1 ? "flex" : "none",
          fontSize: "12px",
          color: palette["content-2"],
        }}
      >
        {/* tag limit length */}
        {selectedTagsState.length} of {limitLength} tag
      </div>
      {/* display all selected tags */}
      <div className="w-full mt-1 flex flex-row flex-wrap">
        {selectedTagsState.map((tag, index) => (
          <DeletableTag
            key={index}
            label={tag.name}
            onDelete={() => tagDeleteHandler(tag.name)}
          />
        ))}
      </div>
    </div>
  );
};
