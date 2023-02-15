import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { Link } from "@mui/material";

import DeletableTag from "../DeletableTag";

import palette from "../../style/palette";

export default ({ options = [], onTagChange }) => {
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    setAnchorEl,
  } = useAutocomplete({
    multiple: true,
    options: options,
    getOptionLabel: (option) => option.title,
  });

  var inputProps = getInputProps();

  return (
    <div
      style={{ position: "relative", width: "100%" }}
      onMouseLeave={() => onTagChange([...value])}
    >
      <div {...getRootProps()}>
        {/* input container */}
        <div
          ref={setAnchorEl}
          style={{
            borderRadius: "8px",
            paddingTop: "2px",
            paddingBottom: value.length === 0 ? "4px" : "8px",
          }}
          className={`my-2 px-3 rounded-[8px] border border-[#666] hover:border-white cursor-text`}
        >
          {/* selected tags list */}
          {value.map((option, index) => (
            <DeletableTag label={option.title} {...getTagProps({ index })} />
          ))}
          {/* text field to input tag */}
          <input
            style={{
              background: "transparent",
              fontSize: "12px",
              color: palette["content-1"],
            }}
            className="mx-0 mb-0 p-0 font-[500] focus:outline-none border-0 placeholder:text-[#888]"
            {...getInputProps()}
            onBlur={() => onTagChange([...value])}
            placeholder={value.length === 0 ? "Find tags" : null}
          />
        </div>
      </div>
      {/* tags list container */}
      <ul
        {...getListboxProps()}
        className={`bg-[${palette["base-2"]}] opacity-100 shadow-sm cursor-pointer`}
        style={{
          backgroundColor: palette["base-2"],
          boxShadow: "rgb(20, 20, 20, .8) 0px 48px 100px 0px",
          borderRadius: "8px",
          fontSize: "16px",
          color: palette["content-1"],
          maxHeight: 160,
          overflow: "auto",
          position: "absolute",
          width: "100%",
          zIndex: 2000,
        }}
      >
        {groupedOptions.length === 0 && inputProps.value.trim() ? (
          // show create tag when tags doesn't match
          <div
            style={{
              backgroundColor: palette["base-2"],
              boxShadow: "rgb(20, 20, 20, .8) 0px 48px 100px 0px",
              borderRadius: "8px",
              width: "100%",
              height: 160,
              color: palette["content-1"],
            }}
            className="flex flex-col justify-center items-center"
          >
            <span style={{ fontSize: "12px" }}>No match tag found</span>
            <Link
              color="secondary"
              underline="hover"
              sx={{
                fontSize: "12px",
              }}
              onClick={() => {
                if (
                  value.find((val) => val.title === inputProps.value.trim()) ===
                  undefined
                ) {
                  value.push({
                    title: inputProps.value
                      .trim()
                      .replaceAll(" ", "-")
                      .toLowerCase(),
                  });
                  onTagChange([...value]);
                }
              }}
            >
              Create new
            </Link>
          </div>
        ) : (
          // tags list
          groupedOptions.map((option, index) => (
            <li
              {...getOptionProps({ option, index })}
              onClick={(e) => {
                if (
                  value.find((val) => val.title === option.title) === undefined
                ) {
                  getOptionProps({ option, index }).onClick(e);
                }
              }}
              className="px-3 py-1"
              style={{
                backgroundColor: `${palette["base-2"]} !important`,
                opacity:
                  value.find((val) => val.title === option.title) === undefined
                    ? 1
                    : 0.5,
                cursor:
                  value.find((val) => val.title === option.title) === undefined
                    ? "pointer"
                    : "not-allowed",
              }}
            >
              <span>{option.title}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
