// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useRef } from "react";
import $ from "jquery";
import * as $3Dmol from "3dmol/build/3Dmol.js";

interface PropTypes {
  fileName: string;
  fileUrl: string;
  key?: string;
}

const MolViewer = (props: PropTypes) => {
  const { fileName, fileUrl, key } = props;

  const handleLoad = async () => {
    const resp = await fetch(fileUrl);
    const data = await resp.text();

    let regex = new RegExp("[^.]+$");
    let extension = fileName.match(regex);

    let element = $("#container-01");
    let config = { backgroundColor: "white" };
    let viewer = $3Dmol.createViewer(element, config);
    viewer.addModel(data, extension[0]);
    viewer.zoomTo();
    viewer.setStyle({
      stick: { radius: 0.1, doubleBondScaling: 0.45, tripleBondScaling: 0.25 },
      sphere: { radius: 0.25 },
    });
    viewer.addPropertyLabels(
      "elem",
      { not: { elem: "H" } },
      {
        fontColor: "black",
        font: "sans-serif",
        fontSize: 24,
        showBackground: false,
        alignment: "center",
        inFront: true,
      },
    );
    viewer.addPropertyLabels(
      "elem",
      { not: { elem: "H" } },
      {
        fontColor: "white",
        font: "sans-serif",
        fontSize: 24,
        showBackground: false,
        alignment: "center",
        inFront: true,
      },
    );
    viewer.render();
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      <div>
        <div
          id="container-01"
          className="relative flex h-[500px] w-[768px]"
        ></div>
      </div>
    </div>
  );
};
export default MolViewer;
