import request from "supertest";
import app from "../app";
import path from "path";

describe("File APIs", () => {
  let folderId: string;
  let fileId: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/folders").send({
      name: "File Folder",
    });
    folderId = res.body.id;
  });

  it("should upload a file", async () => {
    const res = await request(app)
      .post("/api/files/upload")
      .field("folderId", folderId)
      .attach("file", path.join(__dirname, "sample.txt")); // create this dummy file
    expect(res.statusCode).toBe(200);
    fileId = res.body.id;
  });

  it("should stream upload progress", async () => {
    const res = await request(app).get("/api/files/stream");
    expect(res.statusCode).toBe(200);
  });

  it("should search for uploaded file", async () => {
    const res = await request(app).get(
      `/api/files/search?query=sample&folderId=${folderId}`
    );
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should paginate files", async () => {
    const res = await request(app).get(
      `/api/files/page?folderId=${folderId}&page=1&limit=10`
    );
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
