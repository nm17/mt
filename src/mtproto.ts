/**
 * Class for unpacking MTProto payloads.
 */
export class MTProtoPayload {
  authKeyId: bigint;
  messageId: bigint;
  messageData: Buffer;

  /**
   * MTProtoPayload constructor.
   *
   * @param {Object} values
   * Constructor values.
   *
   * @param {bigint} values.authKeyId
   * Authorization key ID.
   *
   * @param {bigint} values.messageId
   * Message ID. (Unix timestamp)
   *
   * @param {Buffer} values.messageData
   * Message data.
   */
  constructor({
    authKeyId,
    messageId,
    messageData,
  }: {
        authKeyId: bigint,
        messageId: bigint,
        messageData: Buffer
    }) {
    this.authKeyId = authKeyId;
    this.messageId = messageId;
    this.messageData = messageData;
  }

  /**
   * MTProtoPayload creator.
   *
   * @param {Buffer} data
   * Message data.
   *
   * @return {MTProtoPayload}
   */
  static create(data: Buffer): MTProtoPayload {
    return new MTProtoPayload({
      authKeyId: data.readBigInt64LE(0),
      messageId: data.readBigInt64LE(8),
      messageData: data.slice(20, 20 + data.readInt32LE(16)),
    });
  }

  /**
   * MTProtoPayload serializer.
   *
   * @return {Buffer}
   */
  serialize(): Buffer {
    const p1 = Buffer.alloc(8);
    const p2 = Buffer.alloc(8);
    const p3 = Buffer.alloc(4);

    p1.writeBigInt64BE(this.authKeyId);
    p2.writeBigInt64BE(this.messageId);
    p3.writeInt32BE(this.messageData.length);

    return Buffer.concat([
      p1,
      p2,
      p3,
      this.messageData,
    ]);
  }
}
