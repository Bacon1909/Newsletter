import { Hono } from "hono";
import { Newsletter } from "../models/newsletter";

export const newsletter = new Hono();

newsletter.get("/", async (c) => {
  const newsletters = await Newsletter.findAll();

  return c.json(
    {
      data: newsletters,
    },
    200
  );
});

newsletter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const newsletter = await Newsletter.find(id);

  return c.json(
    {
      data: newsletter,
    },
    200
  );
});

newsletter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updatedNewsletter = await Newsletter.update(id, body);

    if (updatedNewsletter) {
      return c.json({ message: "Subscriber updated successfully", data: updatedNewsletter }, 200);
    } else {
      return c.text("Subscriber not found or update failed", 404);
    }
  } catch (error) {
    console.error("Error updating subscriber:", error);
    return c.text("Internel server error", 500);
  }
});

newsletter.post("/", async (c) => {
  const body = await c.req.json();

  try {
    const createdNewsletter = await Newsletter.create(body);

    return c.json({ message: "Newslettercreating successfully", data: createdNewsletter }, 201);
  } catch (error) {
    console.error("Error creating newsletter:", error);
    return c.text("Internel server error", 500);
  }
});
