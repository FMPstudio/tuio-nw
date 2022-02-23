import multiInput from "rollup-plugin-multi-input";
import path from "path";

export default [
  {
    input: ["lib/*.js"],
    output: {
      dir: "dist",
      format: "esm",
    },
    plugins: [
      multiInput({
        relative: "./",
        transformOutputPath: (output, input) => `${path.basename(output)}`,
      }),
    ],
  },
];
