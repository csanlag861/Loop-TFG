import { Test, TestingModule } from '@nestjs/testing';
import { TecnologiaController } from './tecnologia.controller';
import { TecnologiaService } from './tecnologia.service';

const mockTecnologiaService = {
  getTecnologias: jest.fn(),
};

describe('TecnologiaController', () => {
  let controller: TecnologiaController;
  let service: typeof mockTecnologiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TecnologiaController],
      providers: [
        {
          provide: TecnologiaService,
          useValue: mockTecnologiaService,
        },
      ],
    }).compile();

    controller = module.get<TecnologiaController>(TecnologiaController);
    service = module.get(TecnologiaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTecnologias', () => {
    it('debería devolver el resultado que devuelve el service', async () => {
      const tecnologiasMock = [
        {
          id: 1,
          nombre: 'TypeScript',
          background: '#3178c6',
          border: '#235a9e',
          text: '#ffffff',
        },
        {
          id: 2,
          nombre: 'Python',
          background: '#3572A5',
          border: '#2a5a84',
          text: '#ffffff',
        },
      ];
      service.getTecnologias.mockResolvedValue(tecnologiasMock);

      const result = await controller.getTecnologias();

      expect(result).toEqual(tecnologiasMock);
    });

    it('debería delegar la llamada al service', async () => {
      service.getTecnologias.mockResolvedValue([]);

      await controller.getTecnologias();

      expect(service.getTecnologias).toHaveBeenCalledTimes(1);
    });
  });
});
