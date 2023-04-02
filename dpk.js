const crypto = require("crypto");

const getCandidateHash = (item) => {
  return crypto.createHash("sha3-512").update(item).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  let candidate;

  if (event && event.partitionKey) {
    candidate = event.partitionKey;
  } else if (event) {
    candidate = getCandidateHash(JSON.stringify(event));
  }

  candidate =
    candidate && typeof candidate !== "string"
      ? JSON.stringify(candidate)
      : "0";

  if (candidate.length > 256) {
    candidate = getCandidateHash(candidate);
  }
  return candidate;
};
