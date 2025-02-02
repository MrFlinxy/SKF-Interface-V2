// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useCallback, useEffect } from "react";
import $ from "jquery";
import * as $3Dmol from "3dmol/build/3Dmol.js";

interface PropTypes {
  fileName: string;
  fileUrl: string;
  key?: string;
  widthSize: number;
}

const MolViewer = (props: PropTypes) => {
  const { fileName, fileUrl } = props;

  const handleLoad = useCallback(async () => {
    const resp = await fetch(fileUrl);
    const data = await resp.text();

    const regex = new RegExp("[^.]+$");
    const extension = fileName.match(regex);

    const element = $("#container-01");
    const config = { backgroundColor: "white" };
    const viewer = $3Dmol.createViewer(element, config);
    viewer.addModel(data, extension[0]);
    viewer.zoomTo();
    viewer.setStyle({
      stick: { radius: 0.1, doubleBondScaling: 0.45, tripleBondScaling: 0.25 },
      sphere: { radius: 0.25 },
    });
    viewer.render();
  }, [fileName, fileUrl]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <div>
      <div className="flex items-center justify-center bg-white">
        <div
          id="container-01"
          className={`relative flex h-[500px] w-[350px] sm:w-[600px] md:w-[750px]`}
        ></div>
      </div>
    </div>
  );
};
export default MolViewer;
