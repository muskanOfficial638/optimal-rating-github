import React from "react";
import { useSelector } from "react-redux";
import { Collapse } from "antd";
import { get } from "../../helpers";
import List from "./List";
import { useTranslation } from "react-i18next";

const TopList = () => {
  const { t } = useTranslation();
  const subjects = useSelector((state) => state.global.subjects);
  const newest = useSelector((state) => state.global.newest);
  const topVoted = useSelector((state) => state.global.topVoted);

  return (
    <Collapse ghost expandIconPosition="right">
      <Collapse.Panel header={t("lbl.top_voted")} key="topVoted">
        <List
          t={t}
          data={get(topVoted, "data.result.set", []).filter(
            // (x) => x.type !== "special"
            (x) => x.type !== "normal"
          )}
          // url="survey"
          url="special"
          value="slug"
          text="lbl.no_top_voted"
        />
      </Collapse.Panel>
      <Collapse.Panel header={t("lbl.newest")} key="newest">
        <List
          t={t}
          data={get(newest, "data.result.set", []).filter(
            (x) => x.type !== "normal"
          )}
          url="special"
          value="slug"
          text="lbl.no_newest"
        />
      </Collapse.Panel>
      <Collapse.Panel header={t("lbl.subjects")} key="subjects">
        <List
          t={t}
          data={get(subjects, "data.result.set", [])}
          url="subject"
          value="slug"
          translate
          text="lbl.no_subject"
        />
      </Collapse.Panel>
    </Collapse>
  );
};
export default TopList;
