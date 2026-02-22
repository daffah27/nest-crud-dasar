import { Test, TestingModule } from '@nestjs/testing';
import { MakananController } from './makanan.controller';
import { MakananService } from './makanan.service';

describe('MakananController', () => {
  let controller: MakananController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MakananController],
      providers: [MakananService],
    }).compile();

    controller = module.get<MakananController>(MakananController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
