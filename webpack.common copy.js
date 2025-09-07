/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const glob = require("glob");

// Function to generate entries for all form and ribbon files
function getEntries() {
  const entries = {};
  
  // Find all Form files
  const formFiles = glob.sync("./src/Forms/*Form.ts");
  formFiles.forEach(file => {
    const fileName = path.basename(file, ".ts");
    const entryName = `mzh_${fileName.toLowerCase()}`;
    entries[entryName] = file;
  });
  
  // Find all Ribbon files
  const ribbonFiles = glob.sync("./src/Ribbon/*Ribbon.ts");
  ribbonFiles.forEach(file => {
    const fileName = path.basename(file, ".ts");
    const entryName = `mzh_${fileName.toLowerCase()}`;
    entries[entryName] = file;
  });
  
  return entries;
}

module.exports = {
  entry: getEntries(),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [/node_modules/, /src[\\\/]Mocks/],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: ["mzh", "[name]"],
    libraryTarget: "var",
    clean: true,
  },
};
