import { Editor } from "@tinymce/tinymce-react";
import React from "react";

export default function ContentEditor({ minHeight = 300, editorProps = {}, initialValue, onChange, otherProps }) {
  return (
    <Editor
      //   onInit={(evt, editor) => (editorRef.current = editor)}
      onChange={onChange}
      apiKey="3qf2h0z3hiyaso6otcl0apypd14dhc1y2un35vv2jbnnd1bi"
      initialValue={initialValue}
      {...otherProps}
      init={{
        ...editorProps,
        minHeight,
        menubar: false,
        plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount"],
        toolbar: "undo redo | formatselect | " + "bold italic backcolor | alignleft aligncenter " + "alignright alignjustify | bullist numlist outdent indent | " + "removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}
