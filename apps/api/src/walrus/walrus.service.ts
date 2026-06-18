import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SuiService } from 'src/sui/sui.service';
import { walrus, WalrusClient, WalrusFile } from '@mysten/walrus';
import { StoredWalrusFile, WalrusWriteResult } from './walrus.interface';

@Injectable()
export class WalrusService {
  private readonly client;
  private readonly keyPair;

  private readonly logger = new Logger(WalrusService.name);

  constructor(private readonly suiService: SuiService) {
    this.client = this.suiService.client.$extend(walrus());
    this.keyPair = this.suiService.keypair;
  }

  async writeFile(blob: Blob): Promise<StoredWalrusFile> {
    try {
      const storageEpochs = 1;

      const systemState = await this.client.getLatestSuiSystemState();

      const startEpoch = Number(systemState.epoch);
      const expiryEpoch = startEpoch + storageEpochs;

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + storageEpochs);

      const result = (await this.client.walrus.writeBlob({
        blob,
        deletable: true,
        epochs: storageEpochs,
        signer: this.keyPair,
      })) as WalrusWriteResult;

      return {
        blobId: result.blobId,
        blobObjectId: result.blobObject.id,
        startEpoch,
        expiryEpoch,
        expiryDate,
        storageEpochs,
      };
    } catch (err) {
      this.logger.error('An error occurred while writing file to Walrus', err);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async readFile(blobId: string): Promise<Uint8Array> {
    try {
      const blob = await this.client.walrus.readBlob({
        blobId,
      });

      return blob;
    } catch (err) {
      this.logger.error(
        'An error occurred while reading file from Walrus',
        err,
      );
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async updateFile(
    oldBlobObjectId: string,
    newBlob: Blob,
  ): Promise<StoredWalrusFile> {
    try {
      await this.deleteFile(oldBlobObjectId);

      return await this.writeFile(newBlob);
    } catch (err) {
      this.logger.error('An error occurred while updating file on Walrus', err);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async deleteFile(blobObjectId: string): Promise<boolean> {
    try {
      const owner = this.keyPair.toSuiAddress();

      const tx = this.client.walrus.deleteBlobTransaction({
        blobObjectId,
        owner,
      });

      await this.client.signAndExecuteTransaction({
        transaction: tx,
        signer: this.keyPair,
      });

      return true;
    } catch (err) {
      this.logger.error(
        'An error occurred while deleting file from Walrus',
        err,
      );
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
