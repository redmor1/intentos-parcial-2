import { readDB, writeDB } from "../utils/database.js";

export const tracksRepository = {
  create: async function create(data) {
    const fileJson = await readDB();
    fileJson.tracks.push(data);

    await writeDB(fileJson);
    return data;
  },
  createTrackAttempt: async function createTrackAttempt(data) {
    const fileJson = await readDB();
    fileJson.trainings.push(data);

    await writeDB(fileJson);
    return data;
  },
  getById: async function getById(id) {
    const fileJson = await readDB();
    const tracks = fileJson.tracks;
    const track = tracks.find((t) => t.id === id);
    if (!track) {
      throw new Error(`No se encontro el track con el id ${id}`);
    }

    return track;
  },
};
