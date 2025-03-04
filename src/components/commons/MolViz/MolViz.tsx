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
  isNEBTS?: boolean;
}

const MolViewer = (props: PropTypes) => {
  const { fileName, fileUrl, isNEBTS } = props;
  const randomString = (Math.random() + 1).toString(36).substr(2, 12);

  const handleLoad = useCallback(async () => {
    const resp = await fetch(fileUrl);
    const data = await resp.text();

    const regex = new RegExp("[^.]+$");
    const extension = fileName.match(regex);

    const element = $(`#container-01-${randomString}`);
    const config = { backgroundColor: "white" };
    const viewer = $3Dmol.createViewer(element, config);
    if (viewer) {
      viewer.addModel(data, extension[0]);
      viewer.zoomTo();
      viewer.setStyle({
        stick: {
          radius: 0.1,
          doubleBondScaling: 0.45,
          tripleBondScaling: 0.25,
        },
        sphere: { radius: 0.25 },
      });
      if (isNEBTS) {
        viewer.addPropertyLabels(
          "index",
          {},
          {
            fontColor: "black",
            font: "sans-serif",
            fontSize: 20,
            showBackground: false,
            alignment: "center",
            inFront: true,
          },
        );
        viewer.addPropertyLabels(
          "index",
          {},
          {
            fontColor: "white",
            font: "sans-serif",
            fontSize: 20,
            showBackground: false,
            alignment: "center",
            inFront: true,
          },
        );
      }
      viewer.render();
    }
  }, [fileName, fileUrl]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad, isNEBTS, randomString]);

  return (
    <div>
      <div className="flex items-center justify-center bg-white">
        {isNEBTS ? (
          <div
            id={`container-01-${randomString}`}
            className={`relative flex h-[500px] w-[175px] sm:w-[300px] md:w-[346px]`}
          ></div>
        ) : (
          <div
            id={`container-01-${randomString}`}
            className={`relative flex h-[500px] w-[350px] sm:w-[600px] md:w-[750px]`}
          ></div>
        )}
      </div>
    </div>
  );
};
export default MolViewer;
