/* eslint-disable no-param-reassign */
const fs = require("fs");
const path = require("path");

const rawData = require("../data/rawData.json");

const numberOfDatapoints = rawData.length;

const categories = {
  back_end: {
    name: "back_end",
    color: "pink"
  },
  build_tools: {
    name: "build_tools",
    color: "purple"
  },
  data_layer: {
    name: "data_layer",
    color: "green"
  },
  front_end: {
    name: "front_end",
    color: "turquoise"
  },
  java_script_flavors: {
    name: "java_script_flavors",
    color: "yellow"
  },
  mobile_desktop: {
    name: "mobile_desktop",
    color: "blue"
  },
  testing: {
    name: "testing",
    color: "orange"
  },
  utility_libraries: {
    name: "utility_libraries",
    color: "red"
  }
};

const elements = [
  {
    id: "es_6",
    sort: { category: { counts: 1, percents: 1 } },
    category: categories.java_script_flavors,
    shortName: "Es",
    name: "ES6",
    row: 2,
    column: 1
  },
  {
    id: "type_script",
    sort: { category: { counts: 2, percents: 2 } },
    category: categories.java_script_flavors,
    shortName: "Ts",
    name: "TypeScript",
    row: 1,
    column: 1,
    repo: "https://github.com/Microsoft/TypeScript"
  },
  {
    id: "flow",
    sort: { category: { counts: 3, percents: 3 } },
    category: categories.java_script_flavors,
    shortName: "Fw",
    name: "Flow",
    row: 1,
    column: 2,
    repo: "https://github.com/facebook/flow"
  },
  {
    id: "reason",
    sort: { category: { counts: 4, percents: 4 } },
    category: categories.java_script_flavors,
    shortName: "Re",
    name: "Reason",
    row: 4,
    column: 1,
    repo: "https://github.com/facebook/reason"
  },
  {
    id: "elm",
    sort: { category: { counts: 5, percents: 5 } },
    category: categories.java_script_flavors,
    shortName: "El",
    name: "Elm",
    row: 5,
    column: 1
  },
  {
    id: "clojure_script",
    sort: { category: { counts: 6, percents: 6 } },
    category: categories.java_script_flavors,
    shortName: "Cs",
    name: "ClojureScript",
    row: 3,
    column: 1,
    repo: "https://github.com/clojure/clojurescript"
  },
  {
    id: "react",
    sort: { category: { counts: 7, percents: 7 } },
    category: categories.front_end,
    shortName: "R",
    name: "React",
    row: 2,
    column: 2,
    repo: "https://github.com/facebook/react"
  },
  {
    id: "vue_js",
    sort: { category: { counts: 8, percents: 8 } },
    category: categories.front_end,
    shortName: "V",
    name: "Vue.js",
    row: 3,
    column: 2,
    repo: "https://github.com/vuejs/vue"
  },
  {
    id: "angular",
    sort: { category: { counts: 9, percents: 9 } },
    category: categories.front_end,
    shortName: "Ng",
    name: "Angular",
    row: 3,
    column: 3,
    repo: "https://github.com/angular/angular"
  },
  {
    id: "preact",
    sort: { category: { counts: 10, percents: 10 } },
    category: categories.front_end,
    shortName: "Pr",
    name: "Preact",
    row: 3,
    column: 6,
    repo: "https://github.com/developit/preact"
  },
  {
    id: "ember",
    sort: { category: { counts: 11, percents: 11 } },
    category: categories.front_end,
    shortName: "Em",
    name: "Ember",
    row: 3,
    column: 5,
    repo: "https://github.com/emberjs/ember.js"
  },
  {
    id: "polymer",
    sort: { category: { counts: 12, percents: 12 } },
    category: categories.front_end,
    shortName: "Po",
    name: "Polymer",
    row: 3,
    column: 4,
    repo: "https://github.com/Polymer/polymer"
  },
  {
    id: "redux",
    sort: { category: { counts: 13, percents: 13 } },
    category: categories.data_layer,
    shortName: "Rd",
    name: "Redux",
    row: 2,
    column: 6,
    repo: "https://github.com/reduxjs/redux"
  },
  {
    id: "graph_ql",
    sort: { category: { counts: 14, percents: 14 } },
    category: categories.data_layer,
    shortName: "G",
    name: "GraphQL",
    row: 3,
    column: 7,
    repo: "https://github.com/graphql/graphql-js"
  },
  {
    id: "apollo",
    sort: { category: { counts: 15, percents: 15 } },
    category: categories.data_layer,
    shortName: "Ap",
    name: "Apollo",
    row: 4,
    column: 9,
    repo: "https://github.com/apollographql/apollo-client"
  },
  {
    id: "mobx",
    sort: { category: { counts: 16, percents: 16 } },
    category: categories.data_layer,
    shortName: "Mx",
    name: "MobX",
    row: 5,
    column: 9,
    repo: "https://github.com/mobxjs/mobx"
  },
  {
    id: "relay",
    sort: { category: { counts: 17, percents: 17 } },
    category: categories.data_layer,
    shortName: "Ry",
    name: "Relay",
    row: 4,
    column: 8,
    repo: "https://github.com/facebook/relay"
  },
  {
    id: "express",
    sort: { category: { counts: 18, percents: 18 } },
    category: categories.back_end,
    shortName: "Ex",
    name: "Express",
    row: 4,
    column: 2,
    repo: "https://github.com/expressjs/express"
  },
  {
    id: "next_js",
    sort: { category: { counts: 19, percents: 19 } },
    category: categories.back_end,
    shortName: "Nx",
    name: "Next.js",
    row: 4,
    column: 4,
    repo: "https://github.com/zeit/next.js"
  },
  {
    id: "koa",
    sort: { category: { counts: 20, percents: 20 } },
    category: categories.back_end,
    shortName: "Ko",
    name: "Koa",
    row: 4,
    column: 6,
    repo: "https://github.com/koajs/koa"
  },
  {
    id: "meteor",
    sort: { category: { counts: 21, percents: 21 } },
    category: categories.back_end,
    shortName: "Me",
    name: "Meteor",
    row: 4,
    column: 3,
    repo: "https://github.com/meteor/meteor"
  },
  {
    id: "sails",
    sort: { category: { counts: 22, percents: 22 } },
    category: categories.back_end,
    shortName: "Sa",
    name: "Sails",
    row: 4,
    column: 7,
    repo: "https://github.com/balderdashy/sails"
  },
  {
    id: "feathers",
    sort: { category: { counts: 23, percents: 23 } },
    category: categories.back_end,
    shortName: "F",
    name: "Feathers",
    row: 4,
    column: 5,
    repo: "https://github.com/feathersjs/feathers"
  },
  {
    id: "jest",
    sort: { category: { counts: 24, percents: 24 } },
    category: categories.testing,
    shortName: "Je",
    name: "Jest",
    row: 5,
    column: 3,
    repo: "https://github.com/facebook/jest"
  },
  {
    id: "mocha",
    sort: { category: { counts: 25, percents: 25 } },
    category: categories.testing,
    shortName: "Mo",
    name: "Mocha",
    row: 5,
    column: 4,
    repo: "https://github.com/mochajs/mocha"
  },
  {
    id: "jasmine",
    sort: { category: { counts: 26, percents: 26 } },
    category: categories.testing,
    shortName: "Ja",
    name: "Jasmine",
    row: 5,
    column: 7,
    repo: "https://github.com/jasmine/jasmine"
  },
  {
    id: "enzyme",
    sort: { category: { counts: 27, percents: 27 } },
    category: categories.testing,
    shortName: "Ez",
    name: "Enzyme",
    row: 5,
    column: 6,
    repo: "https://github.com/airbnb/enzyme"
  },
  {
    id: "karma",
    sort: { category: { counts: 28, percents: 28 } },
    category: categories.testing,
    shortName: "Ka",
    name: "Karma",
    row: 5,
    column: 8,
    repo: "https://github.com/karma-runner/karma"
  },
  {
    id: "storybook",
    sort: { category: { counts: 29, percents: 29 } },
    category: categories.testing,
    shortName: "Sb",
    name: "Storybook",
    row: 5,
    column: 2,
    repo: "https://github.com/storybooks/storybook"
  },
  {
    id: "ava",
    sort: { category: { counts: 30, percents: 30 } },
    category: categories.testing,
    shortName: "Av",
    name: "Ava",
    row: 5,
    column: 5,
    repo: "https://github.com/avajs/ava"
  },
  {
    id: "electron",
    sort: { category: { counts: 31, percents: 31 } },
    category: categories.mobile_desktop,
    shortName: "E",
    name: "Electron",
    row: 2,
    column: 7,
    repo: "https://github.com/electron/electron"
  },
  {
    id: "react_native",
    sort: { category: { counts: 32, percents: 32 } },
    category: categories.mobile_desktop,
    shortName: "Rn",
    name: "React Native",
    row: 1,
    column: 9,
    repo: "https://github.com/facebook/react-native"
  },
  {
    id: "native_apps",
    sort: { category: { counts: 33, percents: 33 } },
    category: categories.mobile_desktop,
    shortName: "Na",
    name: "Native Apps",
    row: 2,
    column: 8
  },
  {
    id: "phone_gap_cordova",
    sort: { category: { counts: 34, percents: 34 } },
    category: categories.mobile_desktop,
    shortName: "Cv",
    name: "Cordova",
    row: 3,
    column: 9,
    repo: "https://github.com/apache/cordova-cli"
  },
  {
    id: "ionic",
    sort: { category: { counts: 35, percents: 35 } },
    category: categories.mobile_desktop,
    shortName: "Io",
    name: "Ionic",
    row: 3,
    column: 8,
    repo: "https://github.com/ionic-team/ionic"
  },
  {
    id: "native_script",
    sort: { category: { counts: 36, percents: 36 } },
    category: categories.mobile_desktop,
    shortName: "Ns",
    name: "NativeScript",
    row: 2,
    column: 9,
    repo: "https://github.com/NativeScript/NativeScript"
  }
];

const outputFile = path.join(__dirname, "..", "data", "processedData.json");

try {
  fs.unlinkSync(outputFile);
  console.log("Old file with processed data deleted...");
} catch (err) {
  console.log("No old file with processed data found, proceeding anyways...");
}

const questions = [
  {
    key: "mostUsed",
    name: "What are the most used technologies?",
    filterFunction: questionUsage => d =>
      d[questionUsage] &&
      ["👍 Used it > Would use again", "👎 Used it > Would avoid"].includes(
        d[questionUsage]
      )
  },
  {
    key: "mostInteresting",
    name: "What are the technologies with the highest interest?",
    filterFunction: questionUsage => d =>
      d[questionUsage] &&
      [
        "👍 Used it > Would use again",
        "✅ Heard of it > Would like to learn"
      ].includes(d[questionUsage])
  },
  {
    key: "mostUnknown",
    name: "What are the most unknown technologies?",
    filterFunction: questionUsage => d =>
      d[questionUsage] &&
      ["🤷 Never heard of it/Not sure what it is"].includes(d[questionUsage])
  }
];

const pros = [
  {
    key: "bestDocumentation",
    name: "📖 Good documentation",
    question: "What are the best documented technologies?"
  },
  {
    key: "mostEasyToLearn",
    name: "👶 Easy learning curve",
    question: "What are the easiest technologies to learn?"
  },
  {
    key: "bestPerformance",
    name: "⚡ Fast performance",
    question: "What are the most preformant technologies?"
  },
  {
    key: "mostFullyFeatured",
    name: "🕹️ Full-featured & powerful",
    question: "What are the most fully featured technologies?"
  },
  {
    key: "lightest",
    name: "🎈 Simple & lightweight",
    question: "What are the lightest technologies?"
  },
  {
    key: "highestMomentum",
    name: "📈 Growing momentum/popularity",
    question: "What are the technologies with the most momentum?"
  },
  {
    key: "biggestPackageEcosystem",
    name: "🎁 Rich package ecosystem",
    question: "What are the technologies with the biggest package ecosystem?"
  },
  {
    key: "mostElegantStyle",
    name: "⚙️ Elegant programming style & patterns",
    question:
      "What are the technologies with the most elegant programming style?"
  },
  {
    key: "mostRobust",
    name: "🐞 Robust, less error-prone code",
    question: "What are the technologies producing the most robust code?"
  },
  {
    key: "mostStable",
    name: "⚖️ Stable & backwards-compatible",
    question: "What are the most stable technologies?"
  },
  {
    key: "bestCompany",
    name: "👫 Backed by a great team/company",
    question: "What are the technologies powered by the best team?"
  },
  {
    key: "bestTooling",
    name: "🔧 Powerful developer tooling",
    question: "What are the technologies with the best tooling?"
  },
  {
    key: "bestEstablished",
    name: "🏛️ Well-established option",
    question: "What are the most established technologies?"
  }
];

const cons = [
  {
    key: "worstDocumentation",
    name: "📖 Bad documentation",
    question: "What are the technologies with the worst documentation?"
  },
  {
    key: "mostConcern",
    name: "👫 Concerns about the team/company",
    question:
      "What are the technologies with the most concerns about the company behind them?"
  },
  {
    key: "mostComplex",
    name: "🎈 Bloated & complex",
    question: "What are the most bloated and complex technologies?"
  },
  {
    key: "mostBuggy",
    name: "🐞 Buggy, error-prone code",
    question: "What are the most buggy technologies?"
  },
  {
    key: "mostClumsy",
    name: "⚙️ Clumsy programming style",
    question: "What are the most clumsy technologies?"
  },
  {
    key: "fastestChanging",
    name: "⚖️ Fast-changing & breaks often",
    question: "What are the fastest changing technologies?"
  },
  {
    key: "fewestPackages",
    name: "🎁 Small package ecosystem",
    question: "What are the technologies with the fewest packages?"
  },
  {
    key: "hardestToLearn",
    name: "👶 Hard learning curve",
    question: "What are the technologies that are hardest to learn?"
  },
  {
    key: "leastTooling",
    name: "🔧 Lacking developer tooling",
    question: "What are the technologies with the least tooling?"
  },
  {
    key: "mostLimited",
    name: "🕹️ Limited & lacking in features",
    question: "What are the most limited technologies?"
  },
  {
    key: "lowestMomentum",
    name: "📉 Diminishing momentum/popularity",
    question: "What are the technologies with the lowest momentum?"
  },
  {
    key: "mostNewAndUntested",
    name: "🏛️ New untested option",
    question: "What are the most new and untested technologies?"
  },
  {
    key: "leastPerformance",
    name: "⚡ Poor performance",
    question: "What are the least performant technologies?"
  }
];

const metrics = [
  {
    key: "java_script_is_moving_in_the_right_direction",
    name: "Is JavaScript moving in the right direction?"
  },
  {
    key: "building_java_script_apps_is_overly_complex_right_now",
    name: "Is building JavaScript apps overly complex right now?"
  },
  {
    key: "java_script_is_over_used_online",
    name: "Is JavaScript over used online?"
  },
  {
    key: "i_enjoy_building_java_script_apps",
    name: "Do you enjoy building JavaScript apps?"
  },
  {
    key: "i_would_like_java_script_to_be_my_main_programming_language",
    name: "Would you like JavaScript to be your main programming language?"
  },
  {
    key: "the_java_script_ecosystem_is_changing_too_fast",
    name: "Is the JavaScript ecosystem changing too fast?"
  },
  {
    key: "this_survey_is_too_damn_long",
    name: "Is this survey too damn long?"
  }
];

elements.forEach(element => {
  const questionUsage = `${element.category.name}_${element.id}`;
  const questionPros = `${element.category.name}_what_do_you_like_👍_about_${
    element.id
  }`;
  const questionCons = `${element.category.name}_what_do_you_dislike_👎_about_${
    element.id
  }`;
  const relevantProDatapoints = rawData.filter(
    d => d[questionUsage] === "👍 Used it > Would use again"
  );
  const relevantConDatapoints = rawData.filter(
    d => d[questionUsage] === "👎 Used it > Would avoid"
  );

  element.values = {};
  element.metrics = {};

  questions.forEach(question => {
    const counts = rawData.filter(question.filterFunction(questionUsage))
      .length;
    element.values[question.key] = {
      counts,
      percents: counts / numberOfDatapoints
    };
  });

  pros.forEach(pro => {
    const counts = relevantProDatapoints.filter(
      d => d[questionPros] && d[questionPros].includes(pro.name)
    ).length;
    element.values[pro.key] = {
      counts,
      percents: counts / relevantProDatapoints.length
    };
  });

  cons.forEach(con => {
    const counts = relevantConDatapoints.filter(
      d => d[questionCons] && d[questionCons].includes(con.name)
    ).length;
    element.values[con.key] = {
      counts,
      percents: counts / relevantConDatapoints.length
    };
  });

  metrics.forEach(metric => {
    const question = `opinion_questions_${metric.key}`;
    const relevantDatapoints = rawData.filter(
      d =>
        d[question] &&
        ["👍 Used it > Would use again", "👎 Used it > Would avoid"].includes(
          d[questionUsage]
        )
    );
    element.metrics[metric.key] =
      relevantDatapoints.reduce((sum, current) => sum + current[question], 0) /
      relevantDatapoints.length;
  });

  element.story = {
    flavorUsers: [],
    flavorAvoiders: [],
    utilityLibraries: []
  };

  elements
    .filter(e => e.category === categories.java_script_flavors)
    .forEach(flavor => {
      const flavorQuestion = `${categories.java_script_flavors.name}_${
        flavor.id
      }`;
      const flavorUsers = relevantProDatapoints.filter(
        d => d[flavorQuestion] === "👍 Used it > Would use again"
      );
      const flavorAvoiders = relevantProDatapoints.filter(
        d => d[flavorQuestion] === "👎 Used it > Would avoid"
      );

      if (flavorUsers.length / relevantProDatapoints.length >= 0.5) {
        element.story.flavorUsers.push(flavor.name);
      }
      if (flavorAvoiders.length / relevantProDatapoints.length >= 0.5) {
        element.story.flavorAvoiders.push(flavor.name);
      }
    });

  element.story.front_end = elements
    .filter(e => e.category === categories.front_end)
    .reduce(
      (acc, frontend) => {
        const frontendQuestion = `${categories.front_end.name}_${frontend.id}`;
        const score = relevantProDatapoints.filter(
          d => d[frontendQuestion] === "👍 Used it > Would use again"
        ).length;
        if (!acc.frontend || acc.score < score)
          return { frontend: frontend.name, score };
        return acc;
      },
      { score: 0, frontend: null }
    ).frontend;

  element.story.data_layer = elements
    .filter(e => e.category === categories.data_layer)
    .reduce(
      (acc, dataLayer) => {
        const dataLayerQuestion = `${categories.data_layer.name}_${
          dataLayer.id
        }`;
        const score = relevantProDatapoints.filter(
          d => d[dataLayerQuestion] === "👍 Used it > Would use again"
        ).length;
        if (!acc.dataLayer || acc.score < score)
          return { dataLayer: dataLayer.name, score };
        return acc;
      },
      { score: 0, dataLayer: null }
    ).dataLayer;

  element.story.back_end = elements
    .filter(e => e.category === categories.back_end)
    .reduce(
      (acc, backend) => {
        const backendQuestion = `${categories.back_end.name}_${backend.id}`;
        const score = relevantProDatapoints.filter(
          d => d[backendQuestion] === "👍 Used it > Would use again"
        ).length;
        if (!acc.backend || acc.score < score)
          return { backend: backend.name, score };
        return acc;
      },
      { score: 0, backend: null }
    ).backend;

  element.story.testing = elements
    .filter(e => e.category === categories.testing)
    .reduce(
      (acc, testing) => {
        const testingQuestion = `${categories.testing.name}_${testing.id}`;
        const score = relevantProDatapoints.filter(
          d => d[testingQuestion] === "👍 Used it > Would use again"
        ).length;
        if (!acc.testing || acc.score < score)
          return { testing: testing.name, score };
        return acc;
      },
      { score: 0, testing: null }
    ).testing;

  element.story.mobile_desktop = elements
    .filter(e => e.category === categories.mobile_desktop)
    .reduce(
      (acc, mobileDesktop) => {
        const mobileDesktopQuestion = `${categories.mobile_desktop.name}_${
          mobileDesktop.id
        }`;
        const score = relevantProDatapoints.filter(
          d => d[mobileDesktopQuestion] === "👍 Used it > Would use again"
        ).length;
        if (!acc.mobileDesktop || acc.score < score)
          return { mobileDesktop: mobileDesktop.name, score };
        return acc;
      },
      { score: 0, mobileDesktop: null }
    ).mobileDesktop;

  element.story.mobile_desktop = elements
    .filter(e => e.category === categories.mobile_desktop)
    .reduce(
      (acc, mobileDesktop) => {
        const mobileDesktopQuestion = `${categories.mobile_desktop.name}_${
          mobileDesktop.id
        }`;
        const score = relevantProDatapoints.filter(
          d => d[mobileDesktopQuestion] === "👍 Used it > Would use again"
        ).length;
        if (!acc.mobileDesktop || acc.score < score)
          return { mobileDesktop: mobileDesktop.name, score };
        return acc;
      },
      { score: 0, mobileDesktop: null }
    ).mobileDesktop;

  element.story.buildTool = [
    "Meteor",
    "Webpack",
    "Rollup",
    "Gulp",
    "Grunt",
    "Parcel",
    "Browserify"
  ].reduce(
    (acc, buildTool) => {
      const score = relevantProDatapoints
        .filter(d => d.other_tools_build_tools)
        .filter(d => d.other_tools_build_tools.includes(buildTool)).length;
      if (!acc.buildTool || acc.score < score) return { buildTool, score };
      return acc;
    },
    { score: 0, buildTool: null }
  ).buildTool;

  ["jQuery", "Moment", "Underscore", "Lodash", "Date-fns", "Ramda"].forEach(
    utilityLibrary => {
      const users = relevantProDatapoints
        .filter(d => d.other_tools_utility_libraries)
        .filter(d => d.other_tools_utility_libraries.includes(utilityLibrary));
      if (users.length / relevantProDatapoints.length >= 0.5)
        element.story.utilityLibraries.push(utilityLibrary);
    }
  );

  element.story.textEditor = [
    "VS Code",
    "Webstorm",
    "Vim",
    "Sublime Text",
    "Atom",
    "Emacs"
  ].reduce(
    (acc, textEditor) => {
      const score = relevantProDatapoints
        .filter(d => d.other_tools_text_editors)
        .filter(d => d.other_tools_text_editors.includes(textEditor)).length;
      if (!acc.textEditor || acc.score < score) return { textEditor, score };
      return acc;
    },
    { score: 0, textEditor: null }
  ).textEditor;
});

questions.forEach(question => {
  elements
    .sort(
      (element1, element2) =>
        element1.values[question.key].counts -
        element2.values[question.key].counts
    )
    .forEach((element, index) => {
      element.sort[question.key] = {};
      element.sort[question.key].counts = index + 1;
    });
  elements
    .sort(
      (element1, element2) =>
        element1.values[question.key].percents -
        element2.values[question.key].percents
    )
    .forEach((element, index) => {
      element.sort[question.key].percents = index + 1;
    });
});

pros.forEach(pro => {
  elements
    .sort(
      (element1, element2) =>
        element1.values[pro.key].counts - element2.values[pro.key].counts
    )
    .forEach((element, index) => {
      element.sort[pro.key] = {};
      element.sort[pro.key].counts = index + 1;
    });
  elements
    .sort(
      (element1, element2) =>
        element1.values[pro.key].percents - element2.values[pro.key].percents
    )
    .forEach((element, index) => {
      element.sort[pro.key].percents = index + 1;
    });
});

cons.forEach(con => {
  elements
    .sort(
      (element1, element2) =>
        element1.values[con.key].counts - element2.values[con.key].counts
    )
    .forEach((element, index) => {
      element.sort[con.key] = {};
      element.sort[con.key].counts = index + 1;
    });
  elements
    .sort(
      (element1, element2) =>
        element1.values[con.key].percents - element2.values[con.key].percents
    )
    .forEach((element, index) => {
      element.sort[con.key].percents = index + 1;
    });
});

const maximumsForQuestions = {};

[...questions, ...pros, ...cons].forEach(question => {
  maximumsForQuestions[question.key] = {};
  maximumsForQuestions[question.key].counts = elements
    .map(e => e.values[question.key].counts)
    .reduce((max, current) => Math.max(max, current), 0);
  maximumsForQuestions[question.key].percents = elements
    .map(e => e.values[question.key].percents)
    .reduce((max, current) => Math.max(max, current), 0);
});

const minimumsForMetrics = {};
const maximumsForMetrics = {};

metrics.forEach(metric => {
  minimumsForMetrics[metric.key] = elements
    .map(e => e.metrics[metric.key])
    .reduce((min, current) => Math.min(min, current), 5);
  maximumsForMetrics[metric.key] = elements
    .map(e => e.metrics[metric.key])
    .reduce((max, current) => Math.max(max, current), 0);
});

fs.appendFileSync(
  outputFile,
  JSON.stringify(
    {
      elements,
      questions,
      pros,
      cons,
      metrics,
      numberOfDatapoints,
      maximumsForQuestions,
      minimumsForMetrics,
      maximumsForMetrics
    },
    null,
    2
  )
);
