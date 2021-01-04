import { Test, TestingModule } from '@nestjs/testing';
import { EcommercesService } from './ecommerces.service';

describe('EcommercesService', () => {
  let service: EcommercesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcommercesService]
    }).compile();

    service = module.get<EcommercesService>(EcommercesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
