import { cloneDeep, uniqBy } from "lodash";
import { colors } from "./constants";

/**
 * Removes empty strings, arrays, objects from an object.
 */
export const clear = (payload, isSub) => {
  if (!payload || (payload && typeof payload !== "object")) return {};
  let _payload = isSub ? payload : cloneDeep(payload);
  Object.keys(_payload).forEach((key) => {
    if (_payload[key] && typeof _payload[key] === "object") {
      clear(_payload[key], true);
      if (Object.keys(_payload[key]).length < 1) {
        delete _payload[key];
      }
    } else if (_payload[key] === null || _payload[key] === "")
      delete _payload[key];
  });
  return _payload;
};

/**
 * Gets data from an object using key values with nested support.
 */
export const get = (data, key = "", initial) => {
  if (!data || typeof data !== "object") {
    return initial ? initial : null;
  }

  key = key.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "");
  let keys = key.split(".");

  for (var i = 0, n = keys.length; i < n; ++i) {
    var _key = keys[i];
    if (_key in data && data[_key]) {
      data = data[_key];
    } else {
      return initial ? initial : null;
    }
  }
  return data;
};

/**
 * Gets data from an object using key values with nested support.
 */
export const exists = (data, key) => {
  if (!data || !key || typeof data !== "object") return false;
  key = key.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "");
  let keys = key.split(".");

  for (var i = 0, n = keys.length; i < n; ++i) {
    var _key = keys[i];
    if (_key in data && data[_key]) {
      data = data[_key];
    } else {
      return false;
    }
  }
  return !!data;
};
export const calculateSurvey = (data) => {
  let result = data.map((x, i) => {
    const uniqueVotes = uniqBy(x.votes || x.votes_special || [], "user_id");

    const score = uniqueVotes.length;

    return { ...x, score, color: colors[i] };
  });

  const totalVotes = result.reduce((sum, x) => sum + x.score, 0);

  result = result.map((x) => ({
    ...x,
    percent: totalVotes > 0
      ? ((x.score / totalVotes) * 100).toFixed(2)
      : "0.00",
  }));

  return result.sort((a, b) => b.percent - a.percent);
};
//commented by muskan it was working earlier
// export const calculateSurvey = (data, isSpecial) => {

//   let result = data
//     .filter((x) => (isSpecial ? true : x.status === "1"))
//     .map((x, i) => {
//       x.votes = uniqBy(x.votes, "user_id");
//       x.votes_special = uniqBy(x.votes_special, "user_id");
//       const N = x.votes.length;
//       const N_Special = x.votes_special.length;
//       const A = x.votes.reduce((a, b) => a + parseInt(b.mark || 0), 0) / N || 0;
//       const score = N_Special
//         ? N_Special
//         : A * Math.sqrt(N / (N + Math.sqrt(N)));
//       return { ...x, score: score, color: colors[i] };
//     });

//    const total = result.reduce((a, b) => a + b.score, 0);

//   result = result.map((x) => ({
//     ...x,
//     percent: x.score
//       ? isSpecial
//         ? ((x.score / total) * 100).toFixed(2)
//         : ((x.score / 5) * 100).toFixed(2)
//       : 0,
//   }));

//   return isSpecial ? result : result.sort((a, b) => b.percent - a.percent);
// };


//edited by Muskan
export const calculateSurveyForCategory = (data, isSpecial) => {
  const result = data
    .filter((x) => (isSpecial ? true : x.status === "1"))
    .map((x, i) => {
      // Removing duplicate votes based on user_id
      x.votes = uniqBy(x.votes, "user_id");
      x.votes_special = uniqBy(x.votes_special, "user_id");

      // Calculating the number of votes
      const N = x.votes.length;
      const N_Special = x.votes_special.length;
      // Calculating the average score (A)
      const A = N > 0 ? x.votes.reduce((a, b) => a + parseInt(b.mark || 0), 0) / N : 0;

      // Calculating the net score using the provided formula
      const score = N_Special ? N_Special : A * Math.sqrt(N / (N + Math.sqrt(N))) || 0;

      return { ...x, score: score, color: colors[i] };
    });

  // Calculating percentages based on the individual candidate's maximum score of 5
  const resultWithPercentages = result.map((x) => ({
    ...x,
    percent: ((x.score / 5) * 100).toFixed(2)
  }));
  // console.log("resultWithPercentages",resultWithPercentages)
  // Sorting the result based on the percent in descending order if not special
  return isSpecial ? resultWithPercentages : resultWithPercentages.sort((a, b) => b.percent - a.percent);
};

/**
 * Return country id.
 */
export const countryCode = (lan) => {
  let cCode =
    typeof window !== "undefined" ? localStorage.getItem("country") : "";
  cCode === "" && lan && typeof window !== "undefined"
    ? localStorage.setItem("country", lan)
    : "";
  return cCode || lan;
};
