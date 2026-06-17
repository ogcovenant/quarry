import { Injectable } from '@nestjs/common';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { SuiGrpcClient, SuiGrpcClientOptions } from '@mysten/sui/grpc';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SuiService {
  private readonly keypair;
  private readonly client;

  constructor(private readonly configService: ConfigService) {
    this.keypair = Ed25519Keypair.fromSecretKey(
      configService.get<string>('SUI_KEY') as string,
    );

    const gprcOptions: SuiGrpcClientOptions = {
      network: configService.get<any>('SUI_NETWORK') ?? 'testnet',
      baseUrl:
        configService.get<string>('SUI_BASE_URL') ??
        'https://fullnode.testnet.sui.io:443',
    };

    this.client = new SuiGrpcClient(gprcOptions);
  }
}
