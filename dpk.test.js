const { deterministicPartitionKey } = require("./dpk");
const { aArray: a, bObject: b } = require("./test-data");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when provided an event with a partitionKey which is string", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "1" });
    expect(trivialKey).toBe("0");
  });

  // testing for different data types now
  // testing for array
  it("Returns the literal sha3-512 hash when provided an event with a partitionKey which is an array greater than 256 length", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: a });
    expect(trivialKey).toBe(
      "bbb31b8ad4aa4a47bab5154b3e31d627551f9f10c1a792151099a5533b6827013d9aed648ef68aa0039950628004ca951f3c2ff80f551db5c1a098d9b91c6f64"
    );
    expect(trivialKey).not.toBe(
      "abb31b8ad4aa4a47bab5154b3e31d627551f9f10c1a792151099a5533b6827013d9aed648ef68aa0039950628004ca951f3c2ff80f551db5c1a098d9b91c6f64"
    );
  });

  // testing for number
  it("Returns the literal 'null' when provided an event with a partitionKey which is Infinity", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: Infinity });
    expect(trivialKey).toBe("null");
  });

  // testing for object
  it("Returns the literal 'null' when provided an event with a partitionKey which is an object greater than 256 length", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: b });

    expect(trivialKey).toBe(
      "3fa33fd3596e5f5f2fdef0edd6a4a754d10dbe9bc8fb649012bfc32234018bc4302e062ddcf833d4f86a2ea69e228a5d4c378e319eb44c04923aee21bab902c8"
    );
    expect(trivialKey).not.toBe(
      "3ga33fd3596e5f5f2fdef0edd6a4a754d10dbe9bc8fb649012bfc32234018bc4302e062ddcf833d4f86a2ea69e228a5d4c378e319eb44c04923aee21bab902c8"
    );
  });

  // testing for booleans
  it("Returns the literal 'null' when provided an event with a partitionKey which is a boolean false", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: false });

    expect(trivialKey).toBe("0");
  });

  it("Returns the literal 'null' when provided an event with a partitionKey which is a boolean true", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: true });

    expect(trivialKey).toBe("true");
  });

  it("Returns the literal 'null' when provided an event with a partitionKey which is Negative Infinity", () => {
    console.log("negative Infinity", -Infinity);
    const trivialKey = deterministicPartitionKey({ partitionKey: -Infinity });
    expect(trivialKey).toBe("null");
  });

  it("Returns the literal '0' when provided an event without a partitionKey", () => {
    const trivialKey = deterministicPartitionKey({
      somethingElse: 1,
      someoneElse: 2,
    });

    expect(trivialKey).toBe("0");
  });

  it("Returns stringified version of partition key when provided an event with a partitionKey", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 1 });

    expect(trivialKey).toBe("1");
  });
});
