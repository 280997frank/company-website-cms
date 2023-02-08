import React from "react";
import { suite } from "uvu";
import {
  render,
  screen,
  cleanup,
  cleanupSuite,
  registerSuite,
} from "@/__tests__/renderer";

import Sidebar from "@/components/Molecules/Sidebar";

const testComponent = suite("<Sidebar />");

testComponent.before((ctx) => {
  registerSuite(ctx);
});

testComponent.after((ctx) => {
  cleanup();
  cleanupSuite(ctx);
});

testComponent("Render links", () => {
  render(<Sidebar />);
  screen.getByRole("link", {
    name: /our story/i,
  });
  screen.getByRole("link", {
    name: /design & animation/i,
  });
  screen.getByRole("link", {
    name: /interactive & multimedia/i,
  });
  screen.getByRole("link", {
    name: /digital & event/i,
  });
  screen.getByRole("link", {
    name: /research & development/i,
  });
  screen.getByRole("link", {
    name: /clients/i,
  });
  screen.getByRole("link", {
    name: /join us/i,
  });
  screen.getByRole("link", {
    name: /contact us/i,
  });
});

testComponent.run();
