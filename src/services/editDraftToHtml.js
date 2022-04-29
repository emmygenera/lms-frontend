import { ContentState, convertFromHTML, convertFromRaw, convertToRaw, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

export default function editDraftToHtml(html = "") {
  //   return EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML("<p>My initial content.</p>")));

  return EditorState.createWithContent(ContentState.createFromText(html));

  //   const contentBlock = htmlToDraft(html);
  //   const contentState = ContentState.createFromBlockArray(contentBlock);
  //   const rawHtml = convertToRaw(contentState);

  //   return convertFromRaw(rawHtml);

  // if (contentBlock) {
  //   const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //   const editorState = EditorState.createWithContent(contentState);
  //   return editorState;
  // }
}
