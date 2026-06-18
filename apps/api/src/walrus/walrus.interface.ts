export interface WalrusWriteResult {
  blobId: string;
  blobObject: {
    id: string;
  };
}

export interface StoredWalrusFile {
  blobId: string;
  blobObjectId: string;
  startEpoch: number;
  expiryEpoch: number;
  expiryDate: Date;
  storageEpochs: number;
}
