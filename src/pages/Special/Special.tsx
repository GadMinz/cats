import React, { useEffect, useRef, useState } from "react";
import Select from "../../components/Select/Select.tsx";
import Input from "../../components/UI/Input.tsx";
import { ICat, ISelectItem } from "../../types.ts";
import Button from "../../components/UI/Button.tsx";
import { getCatTagSays, getTags } from "../../api/cats.ts";
import { getRandomNumber } from "../../functions/getRandomNumber.ts";
import Cats from "../../components/Cats/Cats.tsx";
const Special: React.FC = () => {
  const [text, setText] = useState("");
  const [tags, setTags] = useState<ISelectItem[]>([]);
  const [selectTag, setSelectTag] = useState("");
  const [cats, setCats] = useState<ICat[]>([]);
  const isShow = useRef(false);
  const show = async () => {
    if (!selectTag) return;
    isShow.current = true;
    const img: string = getCatTagSays(selectTag, text);
    setCats([
      {
        id: Date.now().toString(),
        tags: [],
        img: img,
        price: getRandomNumber(1, 10000),
      },
    ]);
  };
  useEffect(() => {
    async function fetchTags() {
      const tags = await getTags();
      setTags(tags.map((tag) => ({ id: tag, title: tag })));
      setSelectTag(tags[0]);
    }
    fetchTags();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "20px",
        }}
      >
        <Input
          type="text"
          value={text}
          placeholder="Enter a caption"
          onChange={setText}
        />
        <Select items={tags} onSelect={setSelectTag} />
        <Button text="Show" handleClick={show} />
      </div>
      {isShow.current && <Cats cats={cats} isLoading={false} />}
    </div>
  );
};
export default Special;
