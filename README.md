# marinara 🍕

A simple file-based datastore for text files in Bun.

> The italian cuisine is renowned worldwide for its emphasis on fresh, high-quality ingredients and simple yet flavorful preparation methods.

Marinara sauce is the epitome of italian cuisine – it doesn't get more simple yet delicious than this!

## why

writing and saving text-files to a given folder isnt that hard.
marinara helps with versioning and some boilerplate-stuff.

data is saved behind keys – a name for the specific data-point (e.g. "recipe").

if data is written to a new key, marinara creates a folder and saves the first version as "0.txt".
if another datapoint with the same key is written, marinara saves the new version as "1.txt".

if you read the key "recipe", marinara will check if anything for this key exists and will return the contents of the latest file (in this case "1.txt").

that's it.

## how to use

```ts

const store = new Store("./my_location");

for (let j = 0; j < 10; j++) {
    const storekey = "key_" + j;
    console.log(storekey);
    for (let i = 0; i < 10; i++) {
      await store.write(storekey, i.toString());
    }
    const res = await store.read(storekey);
    expect(res).toBe("9");
  }
```
