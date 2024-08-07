import { exists, ensureDir, readdir, remove } from "fs-extra";
import { join } from "path";

const getNumOfFiles = async (dir: string) => {
  const files = await readdir(dir);
  return files.length;
};

class Store {
  location: string;
  constructor(location: string) {
    this.location = location;
  }

  read = async (key: string): Promise<string | null> => {
    const dir = join(this.location, key);
    if (await exists(dir)) {
      const fileCount = await getNumOfFiles(dir);
      if (fileCount === 0) throw new Error(`Entry for ${key} does not exist`);
      const filename = fileCount - 1 + ".txt";
      const filepath = join(dir, filename);
      return Bun.file(filepath).text();
    }
    throw new Error(`Entry for ${key} does not exist`);
  };

  write = async (key: string, content: string): Promise<void> => {
    const dir = join(this.location, key);
    await ensureDir(dir);
    const fileCount = await getNumOfFiles(dir);
    const filename = `${fileCount}.txt`;
    const filepath = join(dir, filename);
    await Bun.write(filepath, content);
  };

  clearKey = async (key: string): Promise<void> => {
    const dir = join(this.location, key);
    await remove(dir);
  };

  clearStore = async (): Promise<void> => {
    const dir = join(this.location);
    await remove(dir);
  };
}

export default Store;
