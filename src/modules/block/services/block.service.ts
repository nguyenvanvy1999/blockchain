import { Injectable } from '@nestjs/common';
import { Block } from '../dtos/block';
import crypto from 'crypto-js';

@Injectable()
export class BlockService {
  private blockchain: Block[] = [this.getGenesisBlock()];

  private getLatestBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }
  private calculateHash(
    index: number,
    previousHash: string,
    timestamp: number,
    data: any,
  ): string {
    return crypto.SHA256(index + previousHash + timestamp + data).toString();
  }

  private calculateHashForBlock(block: Block): string {
    return this.calculateHash(
      block.index,
      block.previousHash,
      block.timestamp,
      block.data,
    );
  }

  private isValidNewBlock(newBlock: Block, previousBlock: Block): boolean {
    if (previousBlock.index + 1 !== newBlock.index) {
      return false;
    } else if (newBlock.previousHash !== previousBlock.hash) {
      return false;
    } else if (this.calculateHashForBlock(newBlock) !== newBlock.hash) {
      return false;
    }
    return true;
  }

  private getGenesisBlock(): Block {
    return new Block(
      0,
      '0',
      1465154705,
      'my genesis block!!',
      '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
    );
  }

  public addBlock(block: Block) {
    if (this.isValidNewBlock(block, this.getLatestBlock())) {
      this.blockchain.push(block);
    }
  }

  public generateNextBlock(blockData: any): Block {
    const previousBlock = this.getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000;
    const nextHash = this.calculateHash(
      nextIndex,
      previousBlock.hash,
      nextTimestamp,
      blockData,
    );
    return new Block(
      nextIndex,
      previousBlock.hash,
      nextTimestamp,
      blockData,
      nextHash,
    );
  }

  public queryAllBlock(): Block[] {
    return this.blockchain;
  }
}
