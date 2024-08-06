import { test, expect, afterEach } from "bun:test";
import { join } from "path";
import Store from "../index.ts";

const root = import.meta.dir;

const testPath = join(root, "testdata");
const store = new Store(testPath);

test("main", async () => {
  expect(async () => await store.read("asdkjflkasdjf")).toThrowError();
});

test("read write", async () => {
  for (let i = 0; i < 10; i++) {
    await store.write("hello", i.toString());
    const res = await store.read("hello");
    expect(res).toBe(i.toString());
  }

  const content = await store.read("hello");
  expect(content).toBe("9");
});

test("read write 2", async () => {
  for (let j = 0; j < 10; j++) {
    const storekey = "hello_2_" + j;
    console.log(storekey);
    for (let i = 0; i < 10; i++) {
      await store.write(storekey, i.toString());
    }
    const res = await store.read(storekey);
    expect(res).toBe("9");
  }
});

afterEach(async () => {
  await store.clearStore();
});
