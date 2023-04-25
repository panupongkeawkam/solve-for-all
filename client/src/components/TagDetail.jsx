import palette from "../style/palette"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default ({ name, totalQuestions, onView = () => { } }) => {
  return (
    <div className="rounded-[12px] px-5 pt-3 pb-5 cursor-pointer hover:bg-[#1F2125] transition duration-300 active:brightness-95 active:scale-[0.99]" style={{ border: `1px solid ${palette["content-2"]}` }} onClick={onView}>
      <h2 className="mb-2" style={{ color: palette["content-1"] }}>{name}</h2>
      <div className="flex flex-flex">
        <ChatBubbleOutlineIcon color={"content-2"} fontSize="small" />
        <p className="ml-2" style={{ color: palette["content-2"] }}>{totalQuestions}</p>
      </div>
    </div>)
}