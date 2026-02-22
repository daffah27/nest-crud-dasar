import { Test, TestingModule } from '@nestjs/testing';
import { MakananService } from './makanan.service';

describe('MakananService', () => {
  let service: MakananService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakananService],
    }).compile();

    service = module.get<MakananService>(MakananService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
