import React, { useEffect, useState } from "react";
import { Input } from "antd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const TextArea = React.forwardRef((props, ref) => {
  const [state, setstate] = useState(0);
  const [value, setValue] = useState('');
const {form}=props
  const onChange = (content, delta, source, editor) => {
    setstate(editor.getLength() - 1);

    editor.getLength() - 1 === 0
      ? props.onChange(null)
      : props.onChange(content);
  };

  useEffect(() => {
    return () => {
      setstate(0);
     // props.onChange(null);
    };
  }, []);

  return (
    <div className="TextArea">
      <ReactQuill
       onChange={onChange}
        placeholder="Please enter candidate description."
        /*onChange={(content, delta, source, editor) => {
          form.setFieldsValue({
            choice_description_length: editor.getLength() - 1,
          });
          setValue(editor.getLength() - 1);
        }}*/
      />
      <div className="TextAreaLength">
        {state}/{props.maxLength}
      </div>
    </div>
  );
});
TextArea.displayName = "TextArea"
export default TextArea;
