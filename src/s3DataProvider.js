import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});
console.log(import.meta.env.AWS_KEY);

const BUCKET = "napkin-ratings";

export default {
  getList: async (resource) => {
    const result = await client.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: `${resource}/`,
      })
    );

    const items =
      result.Contents?.map((obj) => ({
        id: obj.Key,
        key: obj.Key,
      })) ?? [];

    return {
      data: items,
      total: items.length,
    };
  },

  create: async (resource, { data }) => {
    const id = `${resource}/${Date.now()}.json`;

    await client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: id,
        Body: JSON.stringify(data),
        ContentType: "application/json",
      })
    );

    return {
      data: { id, ...data },
    };
  },

  // Stub out required methods so React Admin doesn't crash
  getOne: async () => Promise.reject("Not implemented"),
  getMany: async () => Promise.reject("Not implemented"),
  getManyReference: async () => Promise.reject("Not implemented"),
  update: async () => Promise.reject("Not implemented"),
  updateMany: async () => Promise.reject("Not implemented"),
  delete: async () => Promise.reject("Not implemented"),
  deleteMany: async () => Promise.reject("Not implemented"),
};
