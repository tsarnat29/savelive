import { saveAs } from "file-saver";
import filePattern from "../pattern/pattern.pdf";
export const download = () => {
  saveAs(filePattern, "MyJpg.pdf");
};
