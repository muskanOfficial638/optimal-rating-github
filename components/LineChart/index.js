import React,{useEffect} from "react";
import { Radio, Divider } from "antd";
import Link from "next/link";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Empty } from "../../components";
import { useTranslation } from "react-i18next";
import { countryCode } from "../../helpers";
import domtoimage from 'dom-to-image';
import {ApiUrl} from '../../config';
import { postData } from '../../store/requests/global';

const LineChart = ({
  className = "",
  data,
  surveyId,
  onClick,
  isSpecial,
  selected,
  chartImageName,
  url
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    setTimeout(()=>{
      download()
    }, 8000)
  }, [download]);
    data.sort((a, b) => b.score - a.score); //added by Muskan
  // console.log("Line chartData",data)

   // eslint-disable-next-line react-hooks/exhaustive-deps
  //  const download = () => {
  //    if(chartImageName){
  //     domtoimage.toPng(document.getElementById("lineChartId"))
  //       .then(function (png) {
  //         if(window !== "undefined" && window.innerWidth > 600 && png){
  //           postData({ url:  `${ApiUrl}survey-image-upload`, data: { base64_image:png,name:chartImageName} });
  //         }
  //       }).catch(function (e){});
  //   }
  // }
   const download = () => { //updated due to height 20-06-2025
    if (chartImageName) {
      const chartEl = document.getElementById("lineChartId");
  
      if (chartEl) {
        // 🔧 Temporarily set min-height
        const originalMinHeight = chartEl.style.minHeight;
        chartEl.style.minHeight = "200px";
  
        domtoimage.toPng(chartEl)
          .then((png) => {
            // ✅ Restore original style
            chartEl.style.minHeight = originalMinHeight;
  
            if (typeof window !== "undefined" && window.innerWidth > 600 && png) {
              postData({
                url: `${ApiUrl}survey-image-upload`,
                data: { base64_image: png, name: chartImageName },
              });
            }
          })
          .catch((e) => {
            // Restore even on error
            chartEl.style.minHeight = originalMinHeight;
            console.error("Image generation failed:", e);
          });
      }
    }
  };

  return (
    <div style={{ width: '100%', height: 'auto' }} className={`LineChart ${className}`} id="lineChartId">
      <Empty isEmpty={!data.length} description={t("lbl.no_answer")}>
        {data && data.length>0 && data.map((x) => (
          <div key={x.id} className="Line" onClick={() => onClick(x)}>
            <div className="Label">
              {isSpecial && (
                <Radio
                  checked={JSON.stringify(selected) === JSON.stringify(x)}
                />
              )}
              {x.choice_title}
            </div>
            <div className="Bar">
              <div className="BarBg" style={{ width: `${x.percent}%` }} />
              <span>{x.percent} %</span>
            </div>
          </div>
        ))}
      </Empty>
      {!isSpecial && data.length > 3 && (
        <>
          <Divider style={{ marginTop: 12, marginBottom: 12 }} />
          <div className="text-center">
            <Link
              href={url}
              className="text-sm"
            >
              <a>
                <ArrowDownOutlined className="mr-5" />
                {t("lbl.show_more")}
              </a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
export default LineChart;
