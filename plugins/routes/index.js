// export default [
//   {
//     path: "/",
//     component: require("../../views/Home").default,
//     exact: true,
//   },
//   {
//     path: "/:country/approve",
//     component: require("../../views/Approve").default,
//     exact: true,
//     freeze: true,
//   },
//   {
//     path: "/:country/reset-password/:id",
//     component: require("../../views/ResetPassword").default,
//     exact: true,
//   },
//   {
//     path: "/:country/approve-delete-profile/:id",
//     component: require("../../views/DeleteProfile").default,
//     exact: true,
//     private: true,
//   },
//   {
//     path: "/:country/email-change/:id",
//     component: require("../../views/EmailChange").default,
//     exact: true,
//     private: true,
//   },
//   {
//     path: "/:country/survey",
//     component: require("../../views/Survey/Create").default,
//     exact: true,
//     private: true,
//   },
//   {
//     path: "/:country/survey/:id",
//     component: require("../../views/Survey").default,
//     routes: [
//       {
//         path: "/:country/survey/:id",
//         component: require("../../views/Survey/Summary").default,
//       },
//       {
//         path: "/:country/survey/:id/details",
//         component: require("../../views/Survey/Detail").default,
//       },
//       {
//         path: "/:country/survey/special/:id/details",
//         component: require("../../components/SpecialSurvey/Details").default,
//       },
//     ],
//   },
//   {
//     path: "/:country/category/:id",
//     component: require("../../views/Category").default,
//     exact: true,
//   },
//   {
//     path: "/:country/subject/:id",
//     component: require("../../views/Subject").default,
//     exact: true,
//   },
//   {
//     path: "/:country/pages/:slug",
//     component: require("../../views/Pages").default,
//     exact: true,
//   },
//   {
//     path: "/:country/user/:id",
//     component: require("../../views/User").default,
//     exact: true,
//   },
//   {
//     path: "/:country/profile",
//     component: require("../../views/Profile").default,
//     exact: true,
//     private: true,
//   },
// ];
