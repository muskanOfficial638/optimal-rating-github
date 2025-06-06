import React, { useState, useEffect } from "react";
import { Row, Col, Select } from "antd";
import { useTranslation } from "react-i18next";
import { usePrevious } from "../../hooks";

const DateSelect = React.forwardRef(({ value, onChange, smsCode }, ref) => {
  const { t } = useTranslation();
  const [year, setYear] = useState(undefined);
  const [month, setMonth] = useState(undefined);
  const [day, setDay] = useState(undefined);
  const today = new Date().getFullYear();
  const prevValue = usePrevious(value);
  const monthKeys = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  useEffect(() => {
    if (value && value !== prevValue) {
      let [y, m, d] = value.split("-");
      setYear(y);
      setMonth(m[0] === "0" ? m[1] : m);
      setDay(d[0] === "0" ? d[1] : d);
    }
  }, [value, prevValue]);

  useEffect(() => {
    if (year && month && day) {
      onChange &&
        onChange(
          `${year}-${month < 10 ? `0${month}` : month}-${
            day < 10 ? `0${day}` : day
          }`
        );
    }
  }, [year, month, day, onChange]);

  useEffect(() => {}, [smsCode]);

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Select
          className={
            !year && smsCode ? "full-width required_field" : "full-width"
          }
          placeholder={t("lbl.year")}
          value={year}
          onChange={(e) => setYear(e)}
        >
          {[...Array(100)].map((x, i) => (
            <Select.Option key={today - i} style={{ pointerEvents: "all" }}>
              {today - i}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={8}>
        <Select
          className={
            !month && smsCode ? "full-width required_field" : "full-width"
          }
          placeholder={t("lbl.month")}
          value={month}
          onChange={(e) => setMonth(e)}
        >
          {monthKeys.map((x, i) => (
            <Select.Option key={i + 1} style={{ pointerEvents: "all" }}>
              {t(`lbl.${x}`)}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={8}>
        <Select
          className={
            !day && smsCode ? "full-width required_field" : "full-width"
          }
          placeholder={t("lbl.day")}
          value={day}
          onChange={(e) => setDay(e)}
        >
          {[...Array(31)].map((x, i) => (
            <Select.Option key={i + 1} style={{ pointerEvents: "all" }}>
              {i + 1}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
});
DateSelect.displayName = "DateSelect";
export default DateSelect;
