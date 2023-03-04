export class Block {
  public index: number;
  public previousHash: string;
  public timestamp: number;
  public data: any;
  public hash: string;
  constructor(
    index: number,
    previousHash: string,
    timestamp: number,
    data: any,
    hash: string,
  ) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash.toString();
  }
}
