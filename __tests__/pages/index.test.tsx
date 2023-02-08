// import React from "react";
import { test } from "uvu";
// import * as assert from "uvu/assert";
import {
  // render,
  // screen,
  cleanup,
  cleanupSuite,
  registerSuite,
} from "@/__tests__/renderer";

// import Homepage from "@/pages";

test.before((ctx) => {
  registerSuite(ctx);
});

test.after((ctx) => {
  cleanup();
  cleanupSuite(ctx);
});

// test("Homepage", () => {
//   render(<Homepage />);
//   screen.getByText(/welcome to zodiac contentmanagement system \(cms\)/i);
// });

test.run();
