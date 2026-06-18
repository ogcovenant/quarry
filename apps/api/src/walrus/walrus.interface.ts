export interface WalrusWriteResult {
  blobId: string;
  blobObject: {
    id: string;
  };
}

export interface StoredWalrusFile {
  blobId: string;
  blobObjectId: string;
}
