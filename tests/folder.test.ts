import request from "supertest";
import app from "../app";

describe("Folder APIs", () => {
  let folderId: string;

  it("should create a folder", async () => {
    const res = await request(app).post("/api/folders").send({
      name: "Test Folder",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Folder");
    folderId = res.body.id;
  });

  it("should get a folder with files", async () => {
    const res = await request(app).get(`/api/folders/${folderId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("files");
  });

  it("should get child folders", async () => {
    const res = await request(app).get(`/api/folders/${folderId}/children`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
